import React, {useContext, useEffect} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import '../Controls/Controls.css';
import midiMap from '../../Config/midiMap';

export default (props) => {
    let context = useContext(Context);
    const renderSelectOptions = () => {
        if(!context.midiInputs) return 
        else return context.midiInputs.map(input => {
            return <option key={input.id} id={input.id}>{input.name}</option>
        })
    }
    const renderMidiDeviceSelector = () => {
        return(
            <select className="ctl-select" style={{color: Colors.white}}>
                {renderSelectOptions()}
            </select>
        )
    }
    const getMidiDevices = () => {
        navigator.requestMIDIAccess()
        .then((access) => {
            let inputs = access.inputs.entries().next().value;
            // let outputs = access.outputs;
            access.onstatechange = (e) => {
                console.log(e.port.name, e.port.manufacturer, e.port.state);
            } 
            let filteredInputs = inputs.filter(input => typeof(input) === "object")
            context.setMidiInputs(filteredInputs);
        })
        .catch(err => {
            context.setMidiInputs(null);
        })
    }

    useEffect(() => {
        if(context.midiEnabled && !context.midiInputs) return getMidiDevices();
            context.midiInputs.forEach(input => {
                input.onmidimessage = (e) => {
                    console.log(e);
                    let cmd = e.data[0];
                    let note = e.data[1];
                    let velocity = e.data[2];
                    if(!midiMap[note]) return
                    // midiMap[note].hold = !midiMap[note].hold;
                    if(midiMap[note].type === "pad" && cmd - context.midiChannel === 144){
                        context.handlePadTrigger(midiMap[note].padId, velocity)
                    }
                }
            });
    });

    return (
        <div className="ctl-select-wrapper">
            {renderMidiDeviceSelector()}
        </div>
    )
}
import React, {useContext, useState} from 'react';
import './Hud.css';
import Colors from '../../Config/ColorScheme';
import {Context} from '../../contexts/SamplerContext';
import Controls from '../Controls/Controls';

export default (props) => {
    const context = useContext(Context);
    let selectedPad = context.gridPadsArr[context.selectedPad];
    const [state, setState] = useState({ sampleStart: selectedPad.sampleStart, sampleEnd: selectedPad.sampleEnd});
    let editToggleText = context.editMode ? 'Back' : 'Edit';
    let selectedSource = context.sources[context.selectedPad] ? context.sources[context.selectedPad] : 'Empty'
    return(
        <div className="hud-wrapper" style={{backgroundColor: Colors.lightblue, color: Colors.white}}>
            <div className="hud-top">
            <h2 className="pad-name">{context.selectedPad + 1}: {selectedSource.name}</h2>
            </div>
            <div className="hud-bottom">
                <div className="ctl-item-wrapper">
                    <Controls editToggleText={editToggleText}/>
                </div>
                <div className="ctl-item-wrapper">
                    <label htmlFor="samplestart">Start</label>
                    <input 
                    type="number" 
                    name="sampleStart" 
                    id="sampleStart" 
                    className="hud-input"
                    onChange={(e) => {setState({sampleStart: e.target.value})}}
                    value={state.sampleStart}/>
                </div>
                <div className="ctl-item-wrapper">
                    <label htmlFor="sampleEnd">End</label>
                    <input 
                    type="number" 
                    name="sampleEnd" 
                    id="sampleEnd" 
                    className="hud-input"
                    onChange={(e) => {setState({sampleEnd: e.target.value})}}
                    value={state.sampleEnd}/>
                </div>
            </div>
        </div>
    )
}
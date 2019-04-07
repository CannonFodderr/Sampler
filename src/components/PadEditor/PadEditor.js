import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import PadEditorItem from '../PadEditorItem/PadeditorItem';
import './PadEditor.css';

export default () => {
    const context = useContext(Context);
    let selectedPad = context.gridPadsArr[context.selectedPad];
    let max = 0;
    let source = context.gridPadsArr[context.selectedPad].source;
    if(source && source.buffer ){
        max = source.buffer.duration;
    }
    return(
        <div className="editor-wrapper">
            <PadEditorItem label="start" value={selectedPad.sampleStart} max={max} step={0.001}/>
            <PadEditorItem label="end" value={selectedPad.sampleEnd} max={max} step={0.001}/>
            <PadEditorItem label="gain" value={context.gridPadsArr[context.selectedPad].currentGain} max={1} step={0.001}/>
            <PadEditorItem label="detune" value={context.gridPadsArr[context.selectedPad].detune} step={25} min={0} max={1000}/>
            <PadEditorItem label="placeholder1" value={0}/>
            <PadEditorItem label="placeholder2" value={0}/>
            <PadEditorItem label="placeholder3" value={0}/>
            <PadEditorItem label="placeholder4" value={0}/>
        </div>
    )
}


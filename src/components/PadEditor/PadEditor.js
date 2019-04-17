import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import EditorItemRange from '../PadEditorItem/EditorItemRange';
import EditorItemButtons from '../PadEditorItem/EditorItemButtons';
import EditorItemButton from '../PadEditorItem/EditorItemButton';
import RecordButton from '../PadEditorItem/RecordButton';
import MonitorButton from '../PadEditorItem/MonitorButton';
import ColorSelector from '../ColorSelector/ColorSelector';
import {HANDLE_PAD_STOP, UPDATE_EDITOR_DATA} from '../../reducers/types';
import Colors from '../../Config/ColorScheme';

import './PadEditor.css';

export default () => {
    const context = useContext(Context);
    let selectedPad = context.gridPadsArr[context.selectedPad];
    let max = 0;
    let source = context.gridPadsArr[context.selectedPad].source;
    const handlePadStop = (padId, gridPadsArr) => {
        if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
            context.gridPadsArr[padId].source.stop();
            context.gridPadsArr[padId].isPlaying = false
            context.dispatch({type: HANDLE_PAD_STOP, payload: {gridPadsArr}});
        }
    }
    const updateEditorData = ({cmd, val}) => {
        let newPadsArr = context.gridPadsArr;
        let selectedPad = context.selectedPad;
        if(cmd === "start"){
            if(val >= newPadsArr[context.selectedPad].sampleEnd) return;
            newPadsArr[context.selectedPad].sampleStart = Number(val);
        }
        if(cmd === "end"){
            if(val <= newPadsArr[context.selectedPad].sampleStart) return;
            newPadsArr[context.selectedPad].sampleEnd = Number(val);
        }
        if(cmd === "gain"){
            newPadsArr[context.selectedPad].currentGain = val;
        }
        if(cmd === "detune" && val !== "Current"){
            newPadsArr[context.selectedPad].detune = val;
        }
        if(cmd === "prev"){
            selectedPad = context.selectedPad + val < 0 ? context.gridPadsArr.length - 1 : context.selectedPad + val;
        }
        if(cmd === "next"){
            selectedPad = context.selectedPad + val > context.gridPadsArr.length - 1 ?  0 : context.selectedPad + val;
        }
        if(cmd === "play"){
            context.handlePadTrigger(context.selectedPad);
        }
        if(cmd === "stop"){
            handlePadStop(context.selectedPad, newPadsArr);
        }
        if(cmd === "color"){
            newPadsArr[context.selectedPad].color = Colors[val];
        }
        let payload = {gridPadsArr: newPadsArr, selectedPad}
        context.dispatch({type: UPDATE_EDITOR_DATA, payload });
    }
    if(source && source.buffer ){
        max = source.buffer.duration;
    }
    if(context.recMode){
        return (
            <div className="editor-wrapper">
                <EditorItemButtons cmd1="prev" cmd2="next" content1="◄" content2="►" val1={-1} val2={1} updateEditorData={updateEditorData}/>
                <EditorItemButton cmd="play" content="►" updateEditorData={updateEditorData}/>
                <RecordButton updateEditorData={updateEditorData}/>
                <MonitorButton updateEditorData={updateEditorData}/>
                
            </div>
        )
    } else {
        return(
            <div className="editor-wrapper">
                <EditorItemButtons cmd1="prev" cmd2="next" content1="◄" content2="►" val1={-1} val2={1} updateEditorData={updateEditorData}/>
                <EditorItemButton cmd="play" content="►" updateEditorData={updateEditorData}/>
                <EditorItemRange label="start" value={selectedPad.sampleStart} max={max} step={0.001} updateEditorData={updateEditorData}/>
                <EditorItemRange label="end" value={selectedPad.sampleEnd} max={max} step={0.001} updateEditorData={updateEditorData}/>
                <EditorItemRange label="gain" value={context.gridPadsArr[context.selectedPad].currentGain} max={1} step={0.01} updateEditorData={updateEditorData}/>
                <EditorItemRange label="detune" value={context.gridPadsArr[context.selectedPad].detune} step={25} min={0} max={1000} updateEditorData={updateEditorData}/>
                <ColorSelector updateEditorData={updateEditorData}/>
                <EditorItemRange label="placeholder3" value={0} updateEditorData={updateEditorData}/>
            </div>
        )
    }
}


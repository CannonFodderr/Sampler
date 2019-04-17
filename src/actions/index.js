import {HANDLE_PAD_STOP, UPDATE_EDITOR_DATA} from '../reducers/types'
import Colors from '../Config/ColorScheme';

export const handlePadStop = (context, padId, gridPadsArr) => {
    if(context.gridPadsArr[padId].source && context.gridPadsArr[padId].selfMuted){
        context.gridPadsArr[padId].source.stop();
        context.gridPadsArr[padId].isPlaying = false
        context.dispatch({type: HANDLE_PAD_STOP, payload: {gridPadsArr}});
    }
}

export const updateEditorData = ({context, cmd, val}) => {
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
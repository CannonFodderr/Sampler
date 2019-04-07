import React, {useState, useEffect} from 'react';
import INITIAL_STATE from './Config/AudioInitialState';
import Colors from '../Config/ColorScheme';
import keyCTRL from '../Config/keyboardControls';
import touchCTRL from '../Config/touchControls';

class GridPad {
    constructor({id}){
        this.id = id;
        this.isLoaded = false;
        this.name = `Pad${id}`;
        this.gainNode = null;
        this.source = null;
        this.color = Colors.gray;
        this.selfMuted = true;
        this.sampleStart = 0;
        this.currentGain = 1;
        this.detune = 0;
        this.sampleEnd = this.sampleStart;
    }
}

export const Context = React.createContext();

export function SamplerContextStore(props) {
    let [state, setState] = useState(INITIAL_STATE);
    const setCTX = async () => {
        let ctx = !state.ctx ? new (window.AudioContext || window.webkitAudioContext)() : null;
        createAnalyser(ctx)
    }
    const createAnalyser = (ctx) =>{
        let analyser = ctx.createAnalyser();
        analyser.connect(ctx.destination);
        setState({...state, ctx, analyser})
    }
    const testForTouchDevice = () => {
        return 'ontouchstart' in window;
    }
    const generateGrid = () => {
        let gridPadsArr = []
        let touchEnabled = testForTouchDevice();
        for(let i = 0; i < state.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        return setState({...state, gridPadsArr, touchEnabled})
    }
    const toggleEditMode = () => {
        let editMode = !state.editMode;
        return setState({...state, editMode });
    }
    const updateSources = (file) => {
        let reader = new FileReader();
        reader.onload = e => {
            state.ctx.decodeAudioData(e.target.result, (buffer) => {
                let sourcesList = {...state.sources}
                let name = file.name.split('.')[0]
                let waveformData = buffer.getChannelData(0)
                sourcesList[state.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
                let gridPadsArr = state.gridPadsArr;
                gridPadsArr[state.selectedPad].sampleEnd = buffer.duration;
                gridPadsArr[state.selectedPad].gainNode = state.ctx.createGain();
                gridPadsArr[state.selectedPad].gainNode.connect(state.ctx.destination);
                setState({...state, sources: sourcesList, gridPadsArr})
            })
        }
        reader.readAsArrayBuffer(file);
    }
    const handlePadTrigger = (padId) => {
        let selectedSource =  state.sources[padId];
        if(selectedSource && selectedSource.buffer){
            if(state.gridPadsArr[padId].source && state.gridPadsArr[padId].selfMuted){
                state.gridPadsArr[padId].source.stop();
            }
            let newPadsArr = state.gridPadsArr;
            let newSource = state.ctx.createBufferSource();
            newSource.buffer = state.sources[padId].buffer;
            newPadsArr[padId].source = newSource;
            setState({...state, gridPadsArr: newPadsArr, selectedPad: padId});
            newSource.connect(state.gridPadsArr[padId].gainNode);
            newSource.detune.value = state.gridPadsArr[padId].detune;
            state.gridPadsArr[padId].gainNode.gain.setValueAtTime(state.gridPadsArr[padId].currentGain, state.ctx.currentTime)
            state.gridPadsArr[padId].source.start(state.ctx.currentTime, state.gridPadsArr[padId].sampleStart , state.gridPadsArr[padId].sampleEnd);
            state.gridPadsArr[padId].source.stop(state.ctx.currentTime + state.gridPadsArr[padId].sampleEnd);
        } else {
            setState({...state, selectedPad: padId});
        }
    }
    const clearSelectedPad = () => {
        let sourcesList = {...state.sources}
        sourcesList[state.selectedPad] = {buffer: null, name: "", isPlaying: false}
        setState({...state, sources: sourcesList})
    }
    const updateEditorData = ({cmd, val}) => {
        let newPadsArr = state.gridPadsArr;
        if(cmd === "start"){
            if(val >= newPadsArr[state.selectedPad].sampleEnd) return;
            newPadsArr[state.selectedPad].sampleStart = Number(val);
            setState({...state, gridPadsArr: newPadsArr});
        }
        if(cmd === "end"){
            if(val <= newPadsArr[state.selectedPad].sampleStart) return;
            newPadsArr[state.selectedPad].sampleEnd = Number(val);
            setState({...state, gridPadsArr: newPadsArr});
        }
        if(cmd === "gain"){
            newPadsArr[state.selectedPad].currentGain = val;
            setState({...state, gridPadsArr: newPadsArr})
        }
        if(cmd === "detune"){
            newPadsArr[state.selectedPad].detune = val;
            setState({...state, gridPadsArr: newPadsArr})
        }
    }
    const handleMouseClick = (padId) => {
        if(!state.touchEnabled){
            handlePadTrigger(padId)
        }
    }
    const handleKeyDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let keyTrigger = keyCTRL[e.which];
        if(keyTrigger && !keyTrigger.hold && !e.repeat){
            keyCTRL[e.which].hold = true;
            handlePadTrigger(keyTrigger.padId);
        };
    }
    const handleKeyUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let keyTrigger = keyCTRL[e.which];
        if(keyTrigger && keyTrigger.hold){
            keyCTRL[e.which].hold = false;
        } 
    }
    const handleTouchStart = (padId) => {
        if(!touchCTRL[padId].hold){
            touchCTRL[padId].hold = true;
            handlePadTrigger(padId);
        }
    }
    const handleTouchEnd = (padId) => {
        touchCTRL[padId].hold = false;
    }
    useEffect(() => { 
        if(state.gridPadsArr.length < 1) generateGrid();
    })
    return <Context.Provider value={{
        ...state, 
        setCTX,
        toggleEditMode,
        updateSources,
        handlePadTrigger,
        clearSelectedPad,
        updateEditorData,
        handleMouseClick,
        handleKeyDown,
        handleKeyUp,
        handleTouchStart,
        handleTouchEnd
    }}>{props.children}</Context.Provider>
}




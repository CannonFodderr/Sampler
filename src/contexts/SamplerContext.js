import React, {useState, useEffect} from 'react';
import INITIAL_STATE from './Config/AudioInitialState';
import keyCTRL from '../Config/keyboardControls';

class GridPad {
    constructor({id}){
        this.id = id
        this.isLoaded = false
        this.name = `Pad${id}`
        this.source = null
        this.selfMuted = true
        this.sampleStart = 0
        this.sampleEnd = this.sampleStart + 2;
    }
}

export const Context = React.createContext();

export function SamplerContextStore(props) {
    let [state, setState] = useState(INITIAL_STATE);
    const setCTX = async () => {
        let ctx = !state.ctx ? new AudioContext() : null
        let analyser = createAnalyser(ctx)
        setState({...state, ctx, analyser})
    }
    const createAnalyser = (ctx) =>{
        let analyser = ctx.createAnalyser();
        analyser.connect(ctx.destination);
        return analyser;
    }
    const generateGrid = () => {
        let gridPadsArr = []
        for(let i = 0; i < state.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        return setState({...state, gridPadsArr})
    }
    
    const toggleEditMode = () => {
        let editMode = !state.editMode;
        return setState({...state, editMode })
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
                setState({...state, sources: sourcesList, gridPadsArr})
            })
        }
        reader.readAsArrayBuffer(file);
    }
    const handlePadTrigger = (padId) => {
        padId = Number(padId)
        console.log(state);
        let selectedSource =  state.sources[padId];
        let newPadsArr = state.gridPadsArr;
        if(selectedSource && selectedSource.buffer){
            if(state.gridPadsArr[padId].source && state.gridPadsArr[padId].selfMuted){
                state.gridPadsArr[padId].source.stop();
            }
            let newSource = state.ctx.createBufferSource();
            newSource.buffer = state.sources[padId].buffer;
            newSource.connect(state.ctx.destination);
            newPadsArr[padId].source = newSource;
            setState({...state, gridPadsArr: newPadsArr, selectedPad: padId});
            state.gridPadsArr[padId].source.start(state.ctx.currentTime, state.gridPadsArr[padId].sampleStart , state.gridPadsArr[padId].sampleEnd);
            state.gridPadsArr[padId].source.stop(state.ctx.currentTime + state.gridPadsArr[padId].sampleEnd);
        } else {
            console.log("Else")
            setState({...state, selectedPad: padId, gridPadsArr: newPadsArr});
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
            newPadsArr[state.selectedPad].sampleStart = Number(val);
            setState({...state, gridPadsArr: newPadsArr});
        }
        if(cmd === "end"){
            newPadsArr[state.selectedPad].sampleEnd = Number(val);
            setState({...state, gridPadsArr: newPadsArr});
        }
    }
    const handleKeyDown = (e) => {
        console.log("DOWN")
        e.preventDefault();
        e.stopPropagation();
        let keyTrigger = keyCTRL[e.code];
        if(keyTrigger && !keyTrigger.hold && !e.repeat){
            keyCTRL[e.code].hold = true;
            handlePadTrigger(keyTrigger.padId);
        };
    }
    const handleKeyUp = (e) => {
        console.log("UP")
        e.preventDefault();
        e.stopPropagation();
        let keyTrigger = keyCTRL[e.code];
        if(keyTrigger && keyTrigger.hold){
            keyCTRL[e.code].hold = false;
        } 
    }
    useEffect(() => { 
        if(state.gridPadsArr.length < 1) generateGrid() 
        window.addEventListener('keydown', (e) => { handleKeyDown(e)})
        window.addEventListener('keyup', (e) => { handleKeyUp(e)})
    }, [])
    // console.log(state)
    return <Context.Provider value={{
        ...state, 
        setCTX,
        toggleEditMode,
        updateSources,
        handlePadTrigger,
        clearSelectedPad,
        updateEditorData
    }}>{props.children}</Context.Provider>
}




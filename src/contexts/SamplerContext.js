import React, {useState, useEffect} from 'react';
import INITIAL_STATE from './Config/AudioInitialState';

class GridPad {
    constructor({id}){
        this.id = id
        this.isLoaded = false
        this.name = `Pad${id}`
        this.source = null
        this.isPlaying = false
        this.sampleStart = 0
        this.sampleEnd = this.sampleStart + 2;
    }
}

export const Context = React.createContext();

export function SamplerContextStore(props) {
    const [state, setState] = useState(INITIAL_STATE);
    const setCTX = async () => {
        let ctx = !state.ctx ? new AudioContext() : null
        return setState({...state, ctx})
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
    const updateGridPad = (file) => {
        let reader = new FileReader();
        reader.onload = e => {
            state.ctx.decodeAudioData(e.target.result, (buffer) => {
                let sourcesList = {...state.sources}
                let name = file.name.split('.')[0]
                sourcesList[state.selectedPad] = {buffer: buffer, name, isPlaying: false}
                setState({...state, sources: sourcesList})
            })
        }
        reader.readAsArrayBuffer(file);
    }
    const handlePadClick = (padId) => {
        let selectedSource =  state.sources[padId]
        if(selectedSource && selectedSource.buffer){
            if(state.gridPadsArr[padId].source){
                state.gridPadsArr[padId].source.stop();
            }
            let newSource = state.ctx.createBufferSource();
            newSource.buffer = state.sources[padId].buffer;
            newSource.connect(state.ctx.destination);
            let newPadsArr = state.gridPadsArr;
            newPadsArr[padId].source = newSource;
            setState({...state, gridPadsArr: newPadsArr, selectedPad: padId})
            state.gridPadsArr[padId].source.start(state.ctx.currentTime + state.gridPadsArr[padId].sampleStart);
            state.gridPadsArr[padId].source.stop(state.ctx.currentTime + state.gridPadsArr[padId].sampleEnd)
            ;
        } else {
            setState({...state, selectedPad: padId});
        }
    }
    const clearSelectedPad = () => {
        let sourcesList = {...state.sources}
        sourcesList[state.selectedPad] = {buffer: null, name: "", isPlaying: false}
        setState({...state, sources: sourcesList})
    }
    useEffect(() => { if(state.gridPadsArr.length < 1) return generateGrid() })
    console.log(state)
    return <Context.Provider value={{
        ...state, 
        setCTX,
        toggleEditMode,
        updateGridPad,
        handlePadClick,
        clearSelectedPad
    }}>{props.children}</Context.Provider>
}




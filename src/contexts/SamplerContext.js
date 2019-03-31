import React, {useState, useEffect} from 'react';
import INITIAL_STATE from './Config/AudioInitialState';

class GridPad {
    constructor({id}){
        this.id = id
        this.isLoaded = false
        this.name = `Pad${id}`
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
        let GridPadsArr = []
        for(let i = 0; i < state.NumPads; i++){
            let newPad = new GridPad({id: i})
            GridPadsArr.push(newPad)
        }
        return setState({...state, GridPadsArr})
    }
    const toggleEditMode = () => {
        let editMode = !state.editMode;
        return setState({...state, editMode })
    }
    const updateGridPad = (padId, file) => {
        let reader = new FileReader();
        reader.onload = e => {
            state.ctx.decodeAudioData(e.target.result, (buffer) => {
                let source = state.ctx.createBufferSource();
                source.connect(state.ctx.destination)
                source.buffer = buffer;
                let sourcesList = {...state.sources}
                let name = file.name.split('.')[0]
                sourcesList[padId] = {source: source, name, isPlaying: false}
                setState({...state, sources: sourcesList})
            })
        }
        reader.readAsArrayBuffer(file);
    }
    useEffect(() => { if(state.GridPadsArr.length < 1) return generateGrid() })
    console.log(state)
    return <Context.Provider value={{
        ...state, 
        setCTX,
        toggleEditMode,
        updateGridPad
    }}>{props.children}</Context.Provider>
}




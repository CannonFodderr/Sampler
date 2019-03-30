import React, {useState} from 'react';
import INITIAL_STATE from './Config/AudioInitialState';


export const Context = React.createContext();

export function SamplerContextStore(props) {
    const [state, setState] = useState(INITIAL_STATE);
    const initCTX = () => {
        console.log("INITIALIZING AUDIO...")
        setState({...state, ctx: new AudioContext()})
    }
    return <Context.Provider value={{
        ...state, 
        initCTX
    }}>{props.children}</Context.Provider>
}




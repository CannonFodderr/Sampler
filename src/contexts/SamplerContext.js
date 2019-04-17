import React, {useEffect, useReducer} from 'react';
import * as types from '../reducers/types';
import updateEditorReducer from '../reducers/samplerReducer';
import INITIAL_STATE from './Config/AudioInitialState';
import GridPad from './Config/PadGrid';

export const Context = React.createContext();

export function SamplerContextStore(props) {
    const [state, dispatch] = useReducer(updateEditorReducer, INITIAL_STATE)
    const setCTX = async () => {
        let ctx = !state.ctx ? new (window.AudioContext || window.webkitAudioContext)() : null;
        createAnalyser(ctx)
    }
    const createAnalyser = (ctx) =>{
        let analyser = ctx.createAnalyser();
        analyser.connect(ctx.destination);
        dispatch({type: types.CREATE_ANALYSER, payload: {ctx, analyser}})
    }
    const testForTouchDevice = () => {
        return 'ontouchstart' in window;
    }
    const testForMidiAPI = () => {
        return "requestMIDIAccess" in navigator;
    }
    const generateGrid = () => {
        let midiEnabled = testForMidiAPI();
        let touchEnabled = testForTouchDevice();
        let gridPadsArr = [];
        for(let i = 0; i < state.numPads; i++){
            let newPad = new GridPad({id: i})
            gridPadsArr.push(newPad)
        }
        let payload = {gridPadsArr, touchEnabled, midiEnabled}
        dispatch({ type: types.GENERATE_GRID, payload })
    }
    const updateSources = (file) => {
        let reader = new FileReader();
        reader.onload = e => {
            state.ctx.decodeAudioData(e.target.result, (buffer) => {
                let sources = {...state.sources}
                let name = file.name.split('.')[0]
                let waveformData = buffer.getChannelData(0)
                sources[state.selectedPad] = {buffer: buffer, name, isPlaying: false, waveformData}
                let gridPadsArr = state.gridPadsArr;
                let newSource = state.ctx.createBufferSource();
                newSource.buffer = buffer;
                gridPadsArr[state.selectedPad].source = newSource;
                gridPadsArr[state.selectedPad].source.start()
                gridPadsArr[state.selectedPad].sampleEnd = buffer.duration;
                gridPadsArr[state.selectedPad].gainNode = state.ctx.createGain();
                gridPadsArr[state.selectedPad].gainNode.connect(state.ctx.destination);
                dispatch({type: types.UPDATE_SOURCES, payload: {sources, gridPadsArr}});
            })
        }
        reader.readAsArrayBuffer(file);
    }
    const handlePadTrigger = (padId, velocity = 127) => {
        let selectedSource =  state.sources[padId];
        let selectedPad = padId
        if(selectedSource && selectedSource.buffer){
            if(state.gridPadsArr[padId].source && state.gridPadsArr[padId].selfMuted){
                state.gridPadsArr[padId].source.stop();
            }
            let gridPadsArr = state.gridPadsArr;
            let newSource = state.ctx.createBufferSource();
            newSource.buffer = state.sources[padId].buffer;
            gridPadsArr[padId].source = newSource;
            gridPadsArr[padId].isPlaying = true;
            if(state.selectedPad !== padId){
                dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {gridPadsArr, selectedPad}});
            }
            newSource.connect(state.gridPadsArr[padId].gainNode);
            newSource.detune.value = state.gridPadsArr[padId].detune;
            let currentGain = velocity !== 127 ? Math.pow(velocity, 2) / Math.pow(127, 2) : state.gridPadsArr[padId].currentGain;
            state.gridPadsArr[padId].gainNode.gain.setValueAtTime(currentGain, state.ctx.currentTime)
            state.gridPadsArr[padId].source.start(state.ctx.currentTime, state.gridPadsArr[padId].sampleStart , state.gridPadsArr[padId].sampleEnd);
            state.gridPadsArr[padId].source.stop(state.ctx.currentTime + state.gridPadsArr[padId].sampleEnd);
        } else {
            if(state.selectedPad !== padId){
                dispatch({type: types.HANDLE_PAD_TRIGGER, payload: {selectedPad}});
            }
        }
    }
    useEffect(() => { 
        if(state.gridPadsArr.length < 1) generateGrid();
    }, []);
    // console.log(state)
    return <Context.Provider value={{
        ...state,
        dispatch,
        setCTX,
        updateSources,
        handlePadTrigger,
    }}>{props.children}</Context.Provider>
}
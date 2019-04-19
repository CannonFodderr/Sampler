import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {handlePadTrigger} from '../../actions'
import keyCTRL from '../../Config/keyboardControls';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import StartScreen from '../StartScreen/StartScreen';
import './App.css';

export default function App () {
    const context = useContext(Context);
    const renderAppContent = () => {
        if(!context.ctx) return <StartScreen />
        return (
            <div className="app-wrapper">
                <SamplerGrid />
            </div>
        )
    }
    const handleKeyDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let keyTrigger = keyCTRL[e.which];
        if(keyTrigger && !keyTrigger.hold && !e.repeat){
            keyCTRL[e.which].hold = true;
            handlePadTrigger(context, keyTrigger.padId);
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
    return(
        <div className="app-wrapper" 
        style={{height: "100vh"}}
        onKeyDown={(e) => {handleKeyDown(e)}} 
        onKeyUp={(e) => {handleKeyUp(e)}}
        tabIndex="0">
            {renderAppContent()}
        </div>
    )
}

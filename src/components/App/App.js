import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
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
    return(
        <div className="app-wrapper" 
        style={{height: "100vh"}}
        onKeyDown={(e) => {context.handleKeyDown(e)}} 
        onKeyUp={(e) => {context.handleKeyUp(e)}}
        tabIndex="0">
            {renderAppContent()}
        </div>
    )
}

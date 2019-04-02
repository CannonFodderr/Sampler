import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import './StartScreen.css';
import Colors from '../../Config/ColorScheme';

export default () => {
    const context = useContext(Context);
    const displayContent = () => {
        if(!window.AudioContext){
            return (
                <div>
                    <div className="start-info">
                    <p>Sorry, Your browser doesn't support Web Audio :(</p>
                    </div>
                </div>
            )
        }
        return(
            <div>
                <div className="start-info">
                    <p>Click on a pad then the gear icon to load / unload audio files.</p>
                    <p><strong>only WAV/MP3 files are supported</strong></p>
                    <p>Loaded pads will play audio once clicked.</p> 
                    <p>MIDI & Keyboard support coming soon... :)</p>
                </div>
                <button 
                className="start-btn"
                onClick={() => { context.setCTX()}}
                >ENJOY!</button>
            </div>
        )
    }
    
    return (
        <div className="start-wrapper" style={{backgroundColor: Colors.blue, color: Colors.black}}>
        <div className="content-container">
            <div style={{backgroundColor: Colors.white, padding: "1vh 2vw"}}>
            <h1>React Sampler with <br/> Web Audio API</h1>
            {displayContent()}
            <h4><a href="https://github.com/CannonFodderr/Sampler" target="__blank">Fork me on GitHub</a></h4>
            <h4>Made with <span style={{color: Colors.red, fontSize: "1.3rem"}}>♥</span> by <a href="https://idanprofile.herokuapp.com/profile/1/projects">Idan Izhaki</a></h4>
            </div>
        </div>            
        </div>
    )
}

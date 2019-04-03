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
                    <p>Click on a pad then click the gear icon to load / unload audio files.</p>
                    <p>only <strong>WAV/MP3</strong> files are supported</p>
                    <p>Loaded pads will play audio once clicked.</p>
                    <p>Play with keys: 1- 4 | q - r | a - f | z - v</p>
                    <p>MIDI support coming soon... :)</p>
                </div>
                <button 
                className="start-btn"
                onClick={() => { context.setCTX()}}
                >START</button>
            </div>
        )
    }
    
    return (
        <div className="start-wrapper" style={{backgroundColor: Colors.blue, color: Colors.black}}>
        <div className="content-container">
            <div style={{backgroundColor: Colors.white, padding: "1vh 2vw"}}>
            <h1>REACT SAMPLER <br/> with Web Audio API</h1>
            {displayContent()}
            <div>
                <h4>
                    <a 
                    className="start-links"
                    href="https://github.com/CannonFodderr/Sampler" target="__blank">Fork me on GitHub</a>
                </h4>
                <h4>Made with <span style={{color: Colors.red, fontSize: "1.3rem"}}>♥</span> by <a className="start-links" href="https://idanprofile.herokuapp.com/profile/1/projects">Idan Izhaki</a>
                </h4>
            </div>
            </div>
        </div>            
        </div>
    )
}

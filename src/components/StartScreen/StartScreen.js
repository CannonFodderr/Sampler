import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {setCTX} from '../../actions'
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
                    <p><strong>LOAD:</strong> WAV/MP3 files</p>
                    <p><strong>RECORD:</strong> from default input</p>
                    <p>Basic <strong>MIDI SUPPORT:</strong> on Chromium based browsers</p>
                    <p><strong>KEYBOARD CONTROLS:</strong></p>
                    <ul style={{listStyle:"none"}}>
                        <li>1 - 4</li>
                        <li>Q - R</li>
                        <li>A - F</li>
                        <li>Z - V</li>
                    </ul>
                    <p>New features incoming soon...</p>
                </div>
                <button 
                className="start-btn"
                onClick={() => { setCTX(context)}}
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
                    href="https://github.com/CannonFodderr/Sampler" target="__blank">Fork me on GitHub</a> Made with <span style={{color: Colors.red, fontSize: "1.3rem"}}>♥</span> by <a className="start-links" href="https://idanprofile.herokuapp.com/profile/1/projects">Idan Izhaki</a>
                </h4>
            </div>
            </div>
        </div>            
        </div>
    )
}

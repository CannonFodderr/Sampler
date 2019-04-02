import React from 'react';
import './Hud.css';
import Colors from '../../Config/ColorScheme';
import WaveformDisplay from '../WaveformDisplay/WaveformDisplay';

export default () => {
    // const context = useContext(Context);
    return(
        <div className="hud-wrapper" style={{backgroundColor: Colors.lightblue, color: Colors.white}}>
            <WaveformDisplay />
        </div>
    )
}
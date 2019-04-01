import React, {useContext} from 'react';
import './Hud.css';
import Colors from '../../Config/ColorScheme';
import {Context} from '../../contexts/SamplerContext';
import Controls from '../Controls/Controls';

export default () => {
    const context = useContext(Context);
    let editToggleText = context.editMode ? '◄' : '☼';
    let selectedSource = context.sources[context.selectedPad] ? context.sources[context.selectedPad] : 'Empty'
    return(
        <div className="hud-wrapper" style={{backgroundColor: Colors.lightblue, color: Colors.white}}>
            <div className="hud-top">
            <h2 className="pad-name">{context.selectedPad + 1}: {selectedSource.name}</h2>
            </div>
            <div className="hud-bottom">
                <div className="ctl-item-wrapper">
                    <Controls editToggleText={editToggleText}/>
                </div>
            </div>
        </div>
    )
}
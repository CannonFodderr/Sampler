import React, {useContext} from 'react';
import './Hud.css';
import {Context} from '../../contexts/SamplerContext';
import Controls from '../Controls/Controls';

export default () => {
    const context = useContext(Context);
    let editToggleText = context.editMode ? 'Back' : 'Edit';
    let selectedPad = context.sources[context.selectedPad] ? context.sources[context.selectedPad] : 'Empty'
    return(
        <div className="hud-wrapper">
            <h4>{context.selectedPad + 1}: {selectedPad.name}</h4>
            <Controls editToggleText={editToggleText}/>
        </div>
    )
}
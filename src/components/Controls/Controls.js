import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';

const Controls = (props) => {
    const context = useContext(Context);
    return (
        <div className="controls-wrapper">
            <button onClick={() => context.toggleEditMode()}>{props.editToggleText}</button>
        </div>
    )
}

export default Controls
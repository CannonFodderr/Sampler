import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';

export default () => {
    const context = useContext(Context)
    return (
        <div className="start-wrapper">
            <button 
            className="start-btn"
            onClick={() => { context.setCTX()}}
            >Start</button>
        </div>
    )
}

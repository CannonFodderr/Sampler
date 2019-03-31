import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    return <div 
    className="pad" 
    id={props.id}
    style={{backgroundColor: props.backgroundColor}}
    onClick={() => {context.handlePadClick(props.id)}}
    >
    </div>
}
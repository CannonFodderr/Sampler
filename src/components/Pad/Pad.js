import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    let color = props.id === context.selectedPad ? Colors.green : props.backgroundColor
    return <div 
    className="pad" 
    id={props.id}
    style={{backgroundColor: color}}
    onClick={() => {context.handlePadClick(props.id)}}
    >
    </div>
}
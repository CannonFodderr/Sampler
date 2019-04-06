import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    let color = props.id === context.selectedPad ? Colors.purple : props.backgroundColor
    return <div 
    className="pad" 
    id={props.id}
    style={{backgroundColor: color, transition: "0.5s linear"}}
    onClick={() => {context.handleMouseClick(props.id)}}
    onTouchStart={(e) => {context.handleTouchStart(props.id, e)}}
    onTouchEnd={(e) => {context.handleTouchEnd(props.id, e)}}
    >
    </div>
}
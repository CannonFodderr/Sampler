import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    let currentPad = context.gridPadsArr[props.id]
    let borderColor = currentPad.source ? currentPad.color : Colors.gray;
    let color = props.id === context.selectedPad ? currentPad.color : Colors.black;
    return <div 
    className="pad" 
    id={props.id}
    style={{
        backgroundColor: color,
        color: Colors.white, 
        transition: "0.5s linear", 
        boxShadow: `0px 0px 3px 4px ${borderColor}`,
        WebkitBoxShadow: `0px 0px 3px 4px ${borderColor}`,
        MozBoxShadow: `0px 0px 3px 4px ${borderColor}`,
    }}
    onClick={() => {context.handleMouseClick(props.id)}}
    onDoubleClick={(e) => e.preventDefault()}
    onTouchStart={(e) => {context.handleTouchStart(props.id, e)}}
    onTouchEnd={(e) => {context.handleTouchEnd(props.id, e)}}
    >
    <span className="pad-text">{props.midiNote}</span>
    </div>
}
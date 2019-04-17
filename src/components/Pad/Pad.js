import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import {handlePadTrigger} from '../../actions'
import Colors from '../../Config/ColorScheme';
import touchCTRL from '../../Config/touchControls';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    let currentPad = context.gridPadsArr[props.id]
    let borderColor = currentPad.source ? currentPad.color : Colors.gray;
    let color = props.id === context.selectedPad ? currentPad.color : Colors.black;
    const handleTouchStart = (padId) => {
        if(!touchCTRL[padId].hold){
            touchCTRL[padId].hold = true;
            handlePadTrigger(context, padId);
        }
    }
    const handleTouchEnd = (padId) => {
        touchCTRL[padId].hold = false;
    }
    const handleMouseClick = (padId) => {
        if(!context.touchEnabled){
            handlePadTrigger(context, padId)
        }
    }
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
    onClick={() => {handleMouseClick(props.id)}}
    onDoubleClick={(e) => e.preventDefault()}
    onTouchStart={(e) => {handleTouchStart(props.id, e)}}
    onTouchEnd={(e) => {handleTouchEnd(props.id, e)}}
    >
    <span className="pad-text">{props.midiNote}</span>
    </div>
}
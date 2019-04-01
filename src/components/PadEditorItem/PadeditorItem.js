import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
let style = { 
    background: Colors.gray, 
    color: Colors.white, 
    width: "100%", 
    textAlign: "center",
    border: `1px solid ${Colors.black}`,
    display: "flex",
    justifyContent: "center"
}

export default (props) => {
    const context = useContext(Context);
    let duration = 0;
    if(context.gridPadsArr[context.selectedPad].source && context.gridPadsArr[context.selectedPad].source.buffer ){
        duration = context.gridPadsArr[context.selectedPad].source.buffer.duration;
    }
    return (
        <div className="pad-item-wrapper" style={style}>
            <span className="pad-item-label" style={{width: "100%"}}>{props.label.toUpperCase()}: {props.value}</span>
            <input 
            type="range" 
            min={0} 
            max={duration} 
            value={props.value} 
            name={props.label} 
            onChange={(e) => { context.updateEditorData({cmd: props.label, val: e.target.value})}}/>
        </div>
    )
}
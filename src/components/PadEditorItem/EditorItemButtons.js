import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';

let style = { 
    background: Colors.gray, 
    color: Colors.white, 
    width: "90%", 
    textAlign: "center",
    border: `1px solid ${Colors.white}`,
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 1fr",
    justifyContent: "center",
    margin: "1vh auto"
}

export default (props) => {
    const context = useContext(Context);
    return (
        <div className="pad-item-wrapper" style={style}>
            <button
            className="editor-btn"
            id="prev"
            onClick={(e) => { context.updateEditorData({cmd: "prev", val: -1})}}>
            ◄
            </button>
            <button
            className="editor-btn"
            id="next"
            onClick={(e) => { context.updateEditorData({cmd: "next", val: 1})}}>
            ►
            </button>
        </div>
    )
}
import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import './PadEditorButtons.css';

let style = { 
    background: Colors.gray, 
    color: Colors.red, 
    width: "90%", 
    textAlign: "center",
    border: `1px solid ${Colors.white}`,
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    margin: "1vh auto"
}

export default () => {
    const context = useContext(Context);
    const renderButtonContent = () => {
        let content = context.isMonitoring ? "MUTE" : "MON";
        return content;
    }
    return (
        <div className="pad-item-wrapper" style={style}>
            <button className="editor-btn" id="monitor" onClick={(e) => { context.toggleDirectMonitor()}}>
                {renderButtonContent()}
            </button>
        </div>
    )
}
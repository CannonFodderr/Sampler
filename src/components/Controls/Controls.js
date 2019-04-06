import React, {useContext} from 'react';
import './Controls.css';
import {Context} from '../../contexts/SamplerContext';

const Controls = (props) => {
    const context = useContext(Context);
    const validateSelectedFile = (file) => {
        let ext = file.name.split('.')[1]
        let validExt = /mp3|wav|m4a/.test(ext)
        if(!validExt) return console.log("Set err msg")
        return context.updateSources(file)
    }
    const renderRecButton = () => {
        if(context.editMode){
            return(
                <div className="file-selector-wrapper">
                    <button
                    className="ctl-btn"
                    >REC</button>
                </div>
            )
        }
    }
    const renderFileUpload = () => {
        const openFileSelector = (e) => {
            e.preventDefault();
            let fileSelector = document.getElementById("fileSelector");
            fileSelector.click();
        }
        return (
            <div className="file-selector-wrapper">
                <button 
                className="ctl-btn" 
                onClick={(e) => openFileSelector(e)}>LOAD</button>
                <input 
                type="file" 
                style={{display:"none"}}
                id="fileSelector"
                onChange={(e) => validateSelectedFile(e.target.files[0])} 
                accept="audio/*"/>
            </div>    
        )
    }
    const renderSourceLoadUnload = () => {
        let currentPad = context.sources[context.selectedPad];
        if(context.editMode && !currentPad) return renderFileUpload();
        if(context.editMode && currentPad.buffer) return <button className="ctl-btn" onClick={() => context.clearSelectedPad()}>Clear Sample</button>
        if(currentPad && !currentPad.buffer) return renderFileUpload()
    }
    return (
        <div className="controls-wrapper">
            <button 
            className="ctl-btn" 
            onClick={() => context.toggleEditMode()}>{props.editToggleText}</button>
            {renderSourceLoadUnload()}
            {renderRecButton()}
        </div>
    )
}

export default Controls
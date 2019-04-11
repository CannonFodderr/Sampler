import React, {useContext} from 'react';
import './Controls.css';
import {Context} from '../../contexts/SamplerContext';

const Controls = (props) => {
    const context = useContext(Context);
    let currentPad = context.gridPadsArr[context.selectedPad];
    const validateSelectedFile = (file) => {
        if(!file) return console.log("No file...")
        let ext = file.name.split('.')[1]
        let validExt = /mp3|wav|m4a/.test(ext)
        if(!validExt) return console.error("Unable to load selected file")
        return context.updateSources(file)
    }
    const renderRecButton = () => {
        if(context.editMode && currentPad && !currentPad.source){
            if(!context.recMode){
                return(
                    <div className="file-selector-wrapper">
                        <button
                        onClick={() => { context.toggleRecMode() }}
                        className="ctl-btn"
                        >REC</button>
                    </div>
                )
            } else {
                return(
                    <div className="file-selector-wrapper">
                        <button
                        onClick={() => { context.toggleRecMode() }}
                        className="ctl-btn"
                        >EDIT</button>
                    </div>
                )
            }
            
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
        // if(context.editMode && context.recMode) return;
        if(context.editMode && currentPad && !currentPad.source) return renderFileUpload();
        if(context.editMode && currentPad && currentPad.source) {
            return <button className="ctl-btn" onClick={() => context.clearSelectedPad()}>UNLOAD</button>
        }
        if(context.editMode && currentPad && !currentPad.source) return renderFileUpload()
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
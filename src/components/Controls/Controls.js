import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';

const Controls = (props) => {
    const context = useContext(Context);
    const validateSelectedFile = (file) => {
        let ext = file.name.split('.')[1]
        let validExt = /mp3|wav|m4a/.test(ext)
        if(!validExt) return console.log("Set err msg")
        return context.updateGridPad(file)
    }
    const renderFileInput = () => {
        return <input type="file" onChange={(e) => validateSelectedFile(e.target.files[0])} accept="audio/*"/>
    }
    const renderFileLoadUnload = () => {
        let currentPad = context.sources[context.selectedPad]
        if(context.editMode && !currentPad) return renderFileInput()
        if(context.editMode && currentPad.buffer) return <button onClick={() => context.clearSelectedPad()}>Clear Sample</button>
        if(currentPad && !currentPad.buffer) return renderFileInput()
    }
    return (
        <div className="controls-wrapper">
            <button onClick={() => context.toggleEditMode()}>{props.editToggleText}</button>
            {renderFileLoadUnload()}
        </div>
    )
}

export default Controls
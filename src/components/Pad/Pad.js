import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import './Pad.css';

export default (props) => {
    const context = useContext(Context);
    const backgroundColor = !props.isLoaded ? 'gray' : 'blue'
    const validateSelectedFile = (file) => {
        let ext = file.name.split('.')[1]
        let validExt = /mp3|wav|m4a/.test(ext)
        if(!validExt) return console.log("Set err msg");
        return (
            context.updateGridPad(props.id, file)
        )
    }
    const renderPadContent = (editMode, isLoaded) => {
        if(!editMode) return "Play"
        else if (editMode && !isLoaded) return <input 
        type="file" 
        onChange={(e) => validateSelectedFile(e.target.files[0])} 
        accept="audio/*"/>
        else return <button>clear</button>
    }

    return <div 
    className="pad" 
    id={props.id}
    style={{backgroundColor}}
    >
    {props.name}
    {renderPadContent(context.editMode, props.isLoaded)}
    </div>
}
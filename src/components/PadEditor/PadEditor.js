import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import PadEditorItem from '../PadEditorItem/PadeditorItem';
import './PadEditor.css';

export default () => {
    const context = useContext(Context);
    let selectedPad = context.gridPadsArr[context.selectedPad];
    return(
        <div className="editor-wrapper">
            <PadEditorItem label="start" value={selectedPad.sampleStart}/>
            <PadEditorItem label="end" value={selectedPad.sampleEnd}/>
        </div>
    )
}


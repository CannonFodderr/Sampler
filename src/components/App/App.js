import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Header from '../Header/Header';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import Controls from '../Controls/Controls';
import StartScreen from '../StartScreen/StartScreen';

export default function App () {
    const context = useContext(Context);
    const renderAppContext = () => {
        if(!context.ctx) return <StartScreen />
        let editToggleText = context.editMode ? 'Player' : 'Editor'
        let title = context.editMode ? 'Sampler Editor' : 'Sampler Player'
        return (
            <div>
                <Header title={title} />
                <Controls editToggleText={editToggleText}/>
                <SamplerGrid />
            </div>
        )
    }
    return(
        <div className="app-wrapper">
            {renderAppContext()}
        </div>
    )
}

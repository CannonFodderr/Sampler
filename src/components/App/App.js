import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import StartScreen from '../StartScreen/StartScreen';

export default function App () {
    const context = useContext(Context);
    const renderAppContent = () => {
        if(!context.ctx) return <StartScreen />
        return (
            <div>
                <SamplerGrid />
            </div>
        )
    }
    return(
        <div className="app-wrapper">
            {renderAppContent()}
        </div>
    )
}

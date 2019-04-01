import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import StartScreen from '../StartScreen/StartScreen';

export default function App () {
    const context = useContext(Context);
    const renderAppContext = () => {
        if(!context.ctx) return <StartScreen />
        return (
            <div>
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

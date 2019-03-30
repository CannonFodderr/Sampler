import React, {useContext} from 'react';
import SamplerGrid from '../SamplerGrid/SamplerGrid';
import {Context} from '../../contexts/SamplerContext';


export default function App () {
    const context = useContext(Context);
    console.log(context)
    return(
        <div>
            <h1>Sampler</h1>
            <SamplerGrid />
        </div>
    )
}

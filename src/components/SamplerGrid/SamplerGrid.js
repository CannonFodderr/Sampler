import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Pad from '../Pad/Pad';
import './SamplerGrid.css';

const renderPad = (index) => {
    console.log(index)
    return <Pad key={index} id={index}/>
}

const SamplerGrid = () => {
    const context = useContext(Context);
    let gridArr = context.GridPadsArr;
    console.log(gridArr)
    return (
        <div className="grid-wrapper">
            {gridArr.map((item) => { return renderPad(item) })}
        </div>
    )
}

export default SamplerGrid
import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Pad from '../Pad/Pad';
import './SamplerGrid.css';


const SamplerGrid = () => {
    const context = useContext(Context);
    const gridArr = context.GridPadsArr;
    const renderPad = (item) => {
        return <Pad 
        key={item.id} 
        id={item.id} 
        name={item.name}
        onClick={() => {context.handlePadClick()}}
        />
    }
    return (
        <div className="grid-wrapper">
            {gridArr.map((item) => { return renderPad(item) })}
        </div>
    )
}

export default SamplerGrid
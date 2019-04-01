import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';
import Hud from '../Hud/Hud';
import PadEditor from '../PadEditor/PadEditor';
import Pad from '../Pad/Pad';
import './SamplerGrid.css';


const SamplerGrid = () => {
    const context = useContext(Context);
    const gridArr = context.gridPadsArr;
    const renderPad = (item) => {
        let backgroundColor = Colors.gray
        let source = context.sources[item.id];
        if(!context.editMode &&source && source.buffer) backgroundColor = Colors.blue
        if(context.editMode && source && source.buffer) backgroundColor = Colors.red
        return <Pad 
        key={item.id} 
        id={item.id} 
        name={item.name}
        backgroundColor={backgroundColor}
        />
    }
    const rendercontent = () => {
        if(!context.editMode) return <div>{gridArr.map((item) => { return renderPad(item) })}</div>
        return <PadEditor />
    }
    return (
        <div className="grid-wrapper" style={{backgroundColor: Colors.brown}}>
        <Hud />
            {rendercontent()}
        </div>
    )
}

export default SamplerGrid
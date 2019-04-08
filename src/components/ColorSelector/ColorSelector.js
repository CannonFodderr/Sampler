import React, {useContext} from 'react';
import {Context} from '../../contexts/SamplerContext';
import Colors from '../../Config/ColorScheme';

let style = { 
    background: Colors.gray,
    color: Colors.red, 
    width: "90%", 
    textAlign: "center",
    border: `1px solid ${Colors.white}`,
    display: "grid",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    margin: "1vh auto"
}

export default () => {
    const context = useContext(Context);
    const renderColorItem = () => {
        let colorNames = Object.keys(Colors);
        return colorNames.map((color) => {
            return (
                <option id={color} key={color} style={{backgroundColor: Colors[color]}}></option>
            )
        })
    }
    const updatePadColor = (color) => {
        context.updateEditorData({cmd: "color", val: color})
    }
    return (
        <div className="pad-item-wrapper" style={style}>
            <select 
            onChange={(e) => {updatePadColor(e.currentTarget.selectedOptions[0].id)}}
            style={{backgroundColor: context.gridPadsArr[context.selectedPad].color, textAlign: "center"}}>
                <option id="current" key="current" style={{backgroundColor: context.gridPadsArr[context.selectedPad].color}}>Current</option>
                {renderColorItem()}
            </select>
        </div>
    )
}
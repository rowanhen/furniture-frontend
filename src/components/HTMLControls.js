import { SwatchesPicker } from './SwatchesPicker';
import { ListDesigns } from './ListDesigns';
import { SaveDesign } from './SaveDesign';


export default function HTML(props){
    return(
        <>
            <ListDesigns productName={props.state.product} state={props.state} />
            <div className="controls-overlay">
                {Object.entries(props.state.items).map( (e, index) => {
                    return (
                    <div className="chair" key={index}>
                        <div className="chair__area">{e[0]}
                        <button className="chair__area__hide" onClick={() => props.setMesh[index](!(props.mesh[index]))}>hide mesh</button>
                        </div>
                        <div className="chair__colour">colour: {e[1]}</div>
                        <SwatchesPicker className="picker"
                        onChange={(color) => (props.state.items[e[0]] = color)}
                        presetColors={(index >= 4) ? [ "#ffffff", "#cd9323", "#000000" ] : [ "#ffffff", "#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808", "#000000"]} 
                        />
                    </div>
                    )
                })}
            <button className="chair__toggle__rotate" onClick={() => props.setRotate(!props.rotate)}>rotate: {`${props.rotate}`}</button>
            <SaveDesign state={props.state} productName={props.state.product} />
            </div>
        </>
    )
}
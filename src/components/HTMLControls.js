import { SwatchesPicker } from './SwatchesPicker';
import { ListDesigns } from './ListDesigns';
import { SaveDesign } from './SaveDesign';
import "../controls.css"
import { useSnapshot} from 'valtio'
import { useState } from 'react';

export default function HTML(props){
    const snap = useSnapshot(props.state)
    const [chairIndex, setChairIndex] = useState(0)
    const chairSliderArray = Object.keys(snap.items)
    chairSliderArray.push("save_Design")


    return(
        <>
            <ListDesigns productName={props.productName} state={props.state} />
            <button
                className="chair__area__clicker__left" 
                onClick={() => setChairIndex(chairIndex <= 0 ? Object.keys(props.state.items).length : chairIndex - 1)}
            >Prev
            </button>
            <button
                className="chair__area__clicker__right" 
                onClick={() => setChairIndex(chairIndex === Object.keys(props.state.items).length ? 0 : chairIndex + 1)}
            >Next
            </button>
            <div className="slideshowDots">
                {chairSliderArray.map((_, idx) => (
                <div 
                key={idx} 
                className={`slideshowDot${chairIndex === idx ? " active" : ""}`}
                onClick={() => {
                    setChairIndex(idx);
                }}
                ></div>
                ))}
            </div>

            <button className="chair__toggle__rotate__mobile" onClick={() => props.setRotate(!props.rotate)}>rotate: {`${props.rotate}`}</button>

            <div className="controls-overlay">
                <div className="chair__area__slider" style={{ transform: `translate3d(${-chairIndex * 100}%, 0, 0)` }}>
                    {Object.entries(snap.items).map( (e, index) => {
                        return (
                        <div className="chair__wrapper" key={index}>
                            <div className="chair__content">
                                <div className="chair__area">{e[0]}
                                <button className="chair__area__hide" onClick={() => props.setMesh[index](!(props.mesh[index]))}>hide mesh</button>
                                </div>
                                <div className="chair__colour">colour: {e[1]}</div>
                                <SwatchesPicker className="picker"
                                onChange={(color) => (props.state.items[e[0]] = color)}
                                presetColors={(index >= 4) ? [ "#ffffff", "#cd9323", "#000000" ] : [ "#ffffff", "#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808", "#000000"]} 
                                />
                            </div>
                        </div>
                        )
                    })}
                
                    <div className="save__design__clicker">
                        <button className="chair__toggle__rotate__desktop" onClick={() => props.setRotate(!props.rotate)}>rotate: {`${props.rotate}`}</button>
                        <SaveDesign state={props.state} productName={props.productName} />
                    </div>
                </div>
            </div>
        </>
    )
}
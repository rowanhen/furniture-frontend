import React, { useState } from "react";

export const SaveDesign = (props) => {
    const [ designs, setDesigns ] = useState([]);
    const [ name, setName ] = useState("untitled");

    
    const formattedData = () => {
        let stateArray = Object.entries(props.state.items);
        let dataFormatted = [];
        for( let i = 0; i < stateArray.length; i++ ) {
            dataFormatted[i] = {
            name: name.trim(),
            item: props.state.productName,
            chairPart: stateArray[i][0],
            colour: stateArray[i][1]
            }
        }
        return (dataFormatted)
    }

    //submit design
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = formattedData();
            await fetch("https://chair--app.herokuapp.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setDesigns(designs)
            window.location = `/${props.productName}`;
        } catch (err) {
            console.error(err.message)
        }
    }
    //TODO: Fix this so when 'Enter' is pressed, form is submitted
    const onKeyPress = (e) => {
        return (e.key === 'Enter' ? console.log("it worked") : console.log("it didnt work"))
    }

    //TODO: Add condition where if design__input__name is blank it cannot be submitted
    //TODO: Add censored words so designs cannot be named innapropriately 
    return(
        <div className="design__save__wrapper"> 
            <input className="design__input__name" type="text" placeholder="design name" onChange={e => setName(e.target.value)} tabIndex="0" onKeyDown={onKeyPress} />
            <button className="design__save" onClick={onSubmitForm}>Save Design</button>
        </div>
    )
}
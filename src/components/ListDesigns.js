import React, { useState, useEffect } from "react";

export const ListDesigns = (props) => {
    const [ designs, setDesigns ] = useState([]);
    const [ designName, setDesignName ] = useState("Classic");

    //delete dunction 
    const deleteDesign = async (name) => {
        try {
            const deleteDesign = await fetch(`https://chair--app.herokuapp.com/designs/${name}`, {
                method: "DELETE"
            });

            setDesigns(designs.filter(design => design.name !== name))
            console.log(deleteDesign)
        } catch (err) {
            console.error(err.message)
        }
    }

    // get all designs 
    const getDesigns = async () => {
        try {
            
            const response = await fetch("https://chair--app.herokuapp.com/designs")
            const jsonData = await response.json()

            setDesigns(jsonData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getDesigns()
        setSelectedName()
    }, []);

    const [selectedName, setSelectedName] = useState('something')


    //Finds all saved design names specific to the prop.productName
    const allDesignNames = () => {
        let designNameArray = []
        for(let object of designs) {
            if (object.item === props.productName && !designNameArray.includes(object.name)){
                designNameArray.push(object.name)
            }
        }
        return designNameArray
    }
    const designNameArray = allDesignNames();

    //Filters the design data by a specific name, then adds and creates a new object containing all the product colour data.
    const createDesignObject = (inputName) => {
        return designs.filter(({name}) => name === inputName).reduce((acc, {chairpart, colour, item, name}) => ({...acc, [chairpart]: colour, item: item, name:name}),
        {})
    }

    //Formats the data to contain all relevant information to then be mapped over
    const formatDesignData = () => {
        let someArray = []
        for( let i = 0;  i < designNameArray.length; i++){
            someArray.push(createDesignObject(designNameArray[i]))
        }
        return someArray
    }
    const formattedDesignData = formatDesignData()
    

    //Re-assigns the proxy state to be the saved design info. This is a complex piece of logic so further explanation may be needed
    function propertyChange(index) {
        Object.keys(props.state.items).map((e) => {
            return (
                props.state.items[e] = formattedDesignData[index][e]
            )
        })
    }

    return(
        <>
            <div>
                <div className="product__info__wrapper">
                    <div className="product__title">{props.productName}</div>
                    <div className="product__subtitle">Design: {designName}</div>
                </div>
                <div className="custom__designs__wrapper">
                    <div className="design__saved__subtitle">Saved Designs</div>
                    <div className="design__saved__map__wrapper">
                        {formattedDesignData.map((e, index) => 
                            <div className="design__wrapper" key={e.name}>
                                <div className="design__name" >{ e.name }</div>
                                <button 
                                    className="design__load"
                                    onClick={() =>{ 
                                        setDesignName(e.name)
                                        propertyChange(index)
                                    }}
                                >load</button>
                                <button className="design__delete" onClick={() => deleteDesign(e.name)}>delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
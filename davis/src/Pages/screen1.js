import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';


function Screen1(){

    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios.get('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product')
        .then(
            response => {
                setProduct(response.data);
                console.log('here');
                
            }
        )
    }, ['https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product'])



    if(product){
        return(
            <div>
                <h1>{getValue(product)}</h1>
                <button >Add New Record</button>
            </div>
        )
    }else{
        return(
        <div>
            <h1>no products</h1>
        </div>
        )
    }

}

function getValue(product){
    return product.map(p => p.name);
}

export default Screen1;
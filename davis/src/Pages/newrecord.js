import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { Redirect } from 'react-router';

const Record = () => {
    const [name, setName] = useState("Davis");
    const [value, setValue] = useState(false);

    const postData = (e) => {
        e.preventDefault();
        console.log(e);
        axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
            name: name,
            value: value
        })
    }

    return (
        
        <form>
            
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            < hr />
            <label>Value</label>
            <input type="checkbox" value={value} onChange={(e) => setValue(e.target.value)} />
            < hr />
            <a href="/products"><button onClick={postData}>Submit</button></a>
        </form>
    )
}

export default Record;
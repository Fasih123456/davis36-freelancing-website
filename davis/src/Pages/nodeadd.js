import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { Redirect } from 'react-router';

const NodeAdd = () => {
    const [name, setName] = useState("Davis");
    const [value, setValue] = useState(false);
    const [cause, setCause] = useState("A");
    const [effect, setEffect] = useState("1");

    const postData = (e) => {
        e.preventDefault();
        axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
            name: name,
            value: value
        }).then(res => console.log('Posting data', res))
    }

    return (
        <form>
            <label>Cause</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            < hr />
            <label>Effect</label>
            <input type="checkbox" value={value} onChange={(e) => setValue(e.target.value)} />
            < hr />
            
            <input type="checkbox" value={value} onChange={(e) => setValue(e.target.value)} />
            <a href="/products"><button onClick={postData}>Submit</button></a>
        </form>
    )
}

export default NodeAdd;
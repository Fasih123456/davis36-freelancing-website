import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';

const Record = () => {
    const [name, setName] = useState("Davis");
    const [value, setValue] = useState(false);

    const postData = (e) => {
        e.preventDefault();
        axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
            name: name,
            value: value
        }).then(res => console.log('Posting data', res))
    }

    return (
        <form>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            < hr />
            <label>Value</label>
            <input type="checkbox" value={value} onChange={(e) => setValue(e.target.value)} />
            < hr />
            <button onClick={postData}>Submit</button>
        </form>
    )
}

export default Record;
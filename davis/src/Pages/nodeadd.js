import React, { useEffect, useState, Component } from 'react';
import axios, { Axios } from 'axios';
import { Redirect } from 'react-router';

class NodeAdd extends Component{
    constructor(){
        super();
        this.state = {
            cause: "A",
            effect: "B",
            weight: 0,
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })

        
        console.log(this.state);
    }

    onSubmitForm(event){
        //this is a bit complex so we will do this later
    }
    
    render(){
        const hashMap = this.props.history.location.state;
        console.log(hashMap);
        

        return(
            <form>

            <label>Cause
            <input name="cause" type="text" value={this.state.cause} onChange={this.onInputChange} />
            </label>
            < hr />
            <label>Effect
            <input name="effect" type="text" value={this.state.effect} onChange={this.onInputChange} />
            </label>
            < hr />
            <label>Weight
            <input name="weight" type="number" value={this.state.weight} onChange={this.onInputChange} />
            </label>
            < hr />

            

            </form>
        )
    }
}

/*
const NodeAdd = () => {
    const [name, setName] = useState("Davis");
    const [value, setValue] = useState(false);
    const [weight, setWeight] = useState(0);
    const data = this.props.location;


    const postData = (e) => {
        e.preventDefault();

        console.log(name)

        axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
            
                "nodes": [
                  {
                    "id": "5",
                    "name": "A"
                  },
                  {
                    "id": "2",
                    "name": "B"
                  }
                ],
                "edges": [
                  {
                    "source": "1",
                    "target": "2",
                    "weight": "1"
                  }
                ],
                "id": "1"
              
        }).then(res => console.log('Posting data', res))
    }

    return (
        <form>
            {console.log(data)}
            <label>Cause</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            < hr />
            <label>Effect</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            < hr />
            <label>Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.weight)} />
            < hr />
            
            <a href="/products"><button onClick={postData}>Submit</button></a>
        </form>
    )
}*/

export default NodeAdd;
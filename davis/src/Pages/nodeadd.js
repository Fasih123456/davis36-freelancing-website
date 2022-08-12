import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

var data = [];
var hashmap = [];

function NodeAdd() {
  const [product, setProduct] = useState();
  const [name, setName] = useState("A");
  const [value, setValue] = useState("B");
  const [weight, setWeight] = useState("1");
  const location = useLocation();
  const locationdata = location.state;
  console.log(locationdata)

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setProduct(response.data);
      console.log("here");
    });

    data = product;
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  return (
    <form>
      <label>Cause</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <hr />
      <label>Effect</label>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <hr />
      <label>Weight</label>
      <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <hr />

      
        <button onClick={postDataCheck}>Submit</button>
      
    </form>
  );

  function postDataCheck(event) {
    event.preventDefault();
    var checkOne = false;
    var checkTwo = false;

    hashmap = getValue(product);
    console.log(data)

    var newProduct = product[1];
    newProduct.nodes.map((n) => {
      console.log(n.name);
      if (n.name == name) {
        checkOne = true;
      } else if (n.name == value) {
        checkTwo = true;
      }
    });

    console.log(checkOne, checkTwo);
    console.log(name);
    console.log(weight)

    if (!checkOne && !checkTwo) {
        postData();
    } else {
      newProduct.edges.map((n) => {
        console.log(n);
        const newCause = hashmap.get(n.source);
        const newEffect = hashmap.get(n.target);
        console.log(newCause);
        console.log(newEffect);

        if (newCause == name && newEffect == value) {
          alert("Duplicationsa are not allowed");
        }else{
            postData()
        }
      });
    }
  }
  
  function postData(){

      alert("Sucessfully added record");

      axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
      
          "nodes": [
            {
              "id": "2",
              "name": name
            },
            {
              "id": "3",
              "name": value
            }
          ],
          "edges": [
            {
              "source": "2",
              "target": "3",
              "weight": weight
            }
          ],
          "id": "1"
        
          }).then(res => console.log('Posting data', res))
        
  }

  function getValue(products) {
    //console.log(products[1].nodes);
    var hashmap = new Map();

    const nodes = products[1].nodes;
    //console.log(nodes);

    const arr1 = nodes.map((product) => {
      hashmap.set(product.id, product.name);
    });

    //console.log(hashmap)

    return hashmap;
  }
}
export default NodeAdd;

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

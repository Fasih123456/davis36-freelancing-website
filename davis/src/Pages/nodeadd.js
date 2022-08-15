import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

var hashmap = [];

//This page handles adding nodes to each model
function NodeAdd() {
  const [product, setProduct] = useState();
  const [name, setName] = useState("A");
  const [value, setValue] = useState("B");
  const [weight, setWeight] = useState("1");


  const location = useLocation();
  const locationdata = location.state;
  //console.log(locationdata)

  //This function gets relevent information from API, it fetchs data everytime infomartion in API changes
  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setProduct(response.data);
      //console.log("here");
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  return (
    <form>
      {    console.log(locationdata.model.id)}
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

    var causeExist = false; //this boolean checks weather they cause value exists in the API already or not
    var effectExist = false; //this boolean checks weather they effect value exists in the API already or not

    hashmap = getValue(product);

    var newProduct = product[1];
    console.log(newProduct);

    //making sure there is no duplications
    newProduct.nodes.map((n) => {
      console.log(n);
      if (n.name == name) {
        causeExist = true;
      } else if (n.name == value) {
        effectExist = true;
      }
    });

    //console.log(checkOne, checkTwo);
    //console.log(name);
    //console.log(weight)

    if (!causeExist && !effectExist) {
      postData();
    } else {
      newProduct.edges.map((n) => {
        //console.log(n);
        const newCause = hashmap.get(n.source);
        const newEffect = hashmap.get(n.target);
        //console.log(newCause);
        //console.log(newEffect);

        if (newCause == name && newEffect == value) {
          alert("Duplicationsa are not allowed");
        } else {
          postData();
        }
      });
    }
  }

  function postData() {
    alert("Sucessfully added record");

    axios
      .post("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product", {
        nodes: [
          {
            id: "2",
            name: name,
          },
          {
            id: "3",
            name: value,
          },
        ],
        edges: [
          {
            source: "2",
            target: "3",
            weight: weight,
          },
        ],
        "associateId": Number(locationdata.model.id),
      })
      .then((res) => console.log("Posting data", res));
  }

  function getValue(products) {
    //console.log(products[1].nodes);
    var hashmap = new Map();

    const nodes = products[1].nodes;
    //console.log(nodes);

    //console.log(hashmap)

    return hashmap;
  }
}
export default NodeAdd;

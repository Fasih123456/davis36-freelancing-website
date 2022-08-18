import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var hashmap = [];

//This page handles adding nodes to each model
function NodeAdd() {
  const [product, setProduct] = useState();
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [weight, setWeight] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showGreenText, setGreenText] = useState(false);
  const [showRedText, setRedText] = useState(false);

  const location = useLocation();
  const state = location.state;
  //console.log(locationdata)

  //This function gets relevent information from API, it fetchs data everytime infomartion in API changes
  useEffect(
    () => {
      axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
        setProduct(response.data);
        //console.log("here");
      });
    },
    ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"],
    [isSending]
  );

  return (
    <React.Fragment>
      <h3 style={{ backgroundColor: "#212529", color: "white", marginBottom: "0px" }}>
        <Link
          to={{
            pathname: "/",
            state: state,
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-backward-step" />
        </Link>
        Add New Connection
      </h3>

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
      <div className="message">
      {showGreenText && (
          <p className="green-text">`Succesfully added connection with casuse <b>{name}</b>, effect <b>{value}</b> and weight <b>{weight}</b>`</p>
        )}

        {showRedText && (
          <p className="red-text">Duplications are not allowed</p>
        )}
      </div>
    </React.Fragment>
  );

  function postDataCheck(event) {
    setIsSending(true);
    event.preventDefault();

    let causeExist = false; //this boolean checks weather they cause value exists in the API already or not
    let effectExist = false; //this boolean checks weather they effect value exists in the API already or not
    let duplicatesFound = false;
  
    hashmap = getValue(product);

    let newProduct = product;
    //console.log(newProduct)

    //making sure there is no duplications
    if (product.length > 0) {
      newProduct.map((n) => {
        if (state.model.id == n.associateId) {
          console.log(n.nodes)
          for (let i = 0; i < n.nodes.length; i++) {
            
            


            
            let currentObject = n.nodes[i];
            console.log(currentObject, name, value)
            if (currentObject.name == name) {
              console.log('here1')
              causeExist = true;
            } else if (currentObject.name == value) {
              console.log('here2')
              effectExist = true;
            }

            if (causeExist && effectExist) {
              duplicatesFound = true;
              
              break;
            } 

            console.log(duplicatesFound)

          }
        }
      });
    }

    if (!duplicatesFound) {
      postData();
    } else {
      setGreenText(false);
      setRedText(true);
    }
  }

  function postData() {
    setIsSending(true);
    setGreenText(true);
    setRedText(false);
    const id1 = Math.random() * 100000;
    const id2 = Math.random() * 100000;

    axios.post("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product", {
      nodes: [
        {
          id: id1,
          name: name,
        },
        {
          id: id2,
          name: value,
        },
      ],
      edges: [
        {
          source: id1,
          target: id2,
          weight: weight,
        },
      ],
      associateId: Number(state.model.id),
    })

    //console.log('here')
    setIsSending(false);
  }

  function getValue(products) {
    //console.log(products[1].nodes);
    var hashmap = new Map();

    //console.log(nodes);

    //console.log(hashmap)

    return hashmap;
  }
}
export default NodeAdd;

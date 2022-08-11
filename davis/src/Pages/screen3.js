import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";

var data = [];

function Screen3() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setProduct(response.data);
      console.log("here");
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  /*
  const postData = (e) => {
    e.preventDefault();
    console.log(e);
    axios.post('https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product', {
        name: name,
        value: value
    })
}*/

  if (product) {
    return <React.Fragment>
      {getValue(product)}
      <Link
        to={{
          pathname: "/screen4",
          state: data
        }}
        >
        <button>Run Values</button>
        </Link>
      </React.Fragment>;
  } else {
    return (
      <div>
        <h1>no products</h1>
      </div>
    );
  }
}

function getValue(products) {
  console.log(products[0]);
  var hashmap = new Map();

  const newProducts = products[0].edges;
  const nodes = products[0].nodes;
  //console.log(nodes);

  const arr1 = nodes.map((product) => {
    hashmap.set(product.id, product.name);
  });
  data = hashmap;

  const arr = newProducts.map((product) => {
    return (
      <React.Fragment>
        <div>
          <h3>
            Node {hashmap.get(product.source)} To {hashmap.get(product.target)}
          </h3>

          <Slider
            size="small"
            defaultValue={product.weight}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </React.Fragment>
    );
  });

  return arr;
}

export default Screen3;

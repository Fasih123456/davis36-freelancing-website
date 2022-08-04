import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

function Screen2() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setProduct(response.data);
      console.log("here");
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  if (product) {
    return (
      <React.Fragment>
        <table>
          <tr>
            <th>Cause</th>
            <th>Effect</th>
            <th>Weight</th>
          </tr>
          {getValue(product)}
        </table>
        <a href="node-add"><button>Add Record</button></a>
      </React.Fragment>
    );
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
  })

  

  const arr = newProducts.map((product) => {
    return (
      <tr>
        <td>{hashmap.get(product.source)}</td>
        <td>{hashmap.get(product.target)}</td>
        <td>{product.weight}</td>
      </tr>
    );
  });

  return arr;
}

export default Screen2;

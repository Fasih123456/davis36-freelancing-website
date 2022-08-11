import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

var data =[]
function Screen1() {
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
        <table class="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Options</th>
          </tr>
          </thead>
          <tbody>
          {getValue(product)}
          </tbody>
        </table>
        <Link
        to={{
          pathname: "/product-add",
          state: data
        }}
        >
        <FontAwesomeIcon icon="fa-solid fa-plus" size="2x"/>
        </Link>




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
  console.log(products);
  const arr = products.map((product) => {
    return (
      <tr>
        <th scope="row">1</th>
        <td>{product.name}</td>
        <td>
        <Link
        to={{
          pathname: "/screen2",
          state: data
        }}
        >
         <button >View</button>
        </Link>
         
        
        
        </td>
      </tr>
    );
  });

  return arr;
}


export default Screen1;


import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

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
        <table>
          <tr>
            <th>Name</th>
          </tr>
          {getValue(product)}
        </table>
        <a href="product-add"><button>Add Record</button></a>
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
        <td>{product.name}</td>
      </tr>
    );
  });

  return arr;
}

export default Screen1;

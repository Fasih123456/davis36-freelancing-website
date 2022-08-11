import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";

var data =[]

function Screen4() {
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
            <th>Node</th>
            <th>Weight</th>
          </tr>
          {getValue(product)}
        </table>

        <form>
        <label for="analysis">Analysis:</label><br />
  <input type="textbox" id="fname" name="fname" value="Node A TO B has an average impact" disabled style={{width: "500px"}} />
        </form>

        <Link
        to={{
          pathname: "/screen1",
          state: data
        }}
        >
        <button>Home</button>
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
  console.log(products[0]);
  var hashmap = new Map();


  const newProducts = products[0].edges;
  const nodes = products[0].nodes;
  //console.log(nodes);

  const arr1 = nodes.map((product) => {
      hashmap.set(product.id, product.name);
  })
  data = hashmap;


  

  const arr = newProducts.map((product) => {
    return (
      <tr>
        <td>{hashmap.get(product.source)} TO {hashmap.get(product.target)}</td>

        <td>{product.weight}</td>
      </tr>
    );
  });

  return arr;
}

export default Screen4;

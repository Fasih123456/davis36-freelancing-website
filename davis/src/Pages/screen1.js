import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

var data =[]
function Screen1() {
  const [model, newModel] = useState(null);

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      newModel(response.data);
      console.log("here");
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  if (model) {
    return (
      <React.Fragment>
        <table class="table">
        <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Options</th>

    </tr>
  </thead>
          <tbody>
          {getValue(model)}
          </tbody>
        </table>

        <table class="table">
</table>

        <Link
        to={{
          pathname: "/new-record",
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
        <h1>No Models</h1>
      </div>
    );
  }
}

function getValue(models) {
  console.log(models);
  const arr = models.map((model) => {
    return (
      <tr>
        <th scope="row">1</th>
        <td>{model.name}</td>
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


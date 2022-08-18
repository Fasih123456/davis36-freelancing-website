import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function Screen1() {
  const [model, newModel] = useState(null);

  //This function gets relevent information from API, it fetchs data everytime infomartion in API changes
  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/screen1").then((response) => {
      newModel(response.data);
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/screen1"]);

  //main render function for this page
  if (model) {
    return (
      <React.Fragment>
        <h3 style={{ backgroundColor: "#212529", color: "white", marginBottom: "0px" }}>Models </h3>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>{getValue(model)}</tbody>
        </table>

        <table class="table"></table>

        <Link
          to={{
            pathname: "/new-record",
            state: model,
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-plus" size="2x" />
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

  //displaying all models on the webpage
  function getValue(models) {
    var i = -1;
    const arr = models.map((model) => {
      {
        i++;
      }
      return (
        <tr id={model.id}>
          <th scope="row">1</th>
          <td>{model.name}</td>
          <td>
            <Link
              to={{
                pathname: "/screen2",
                state: { model },
              }}
            >
              <button class="no-top-margin">View</button>
            </Link>
            <button class="no-top-margin" onClick={() => deleteModel(model.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return arr;
  }

  //Deletes a model
  function deleteModel(modelId) {
    let modelDiv;
    axios
      .delete(`https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/screen1/${modelId}`)
      .then((modelDiv = document.getElementById(modelId).remove()));
  }
}

export default Screen1;

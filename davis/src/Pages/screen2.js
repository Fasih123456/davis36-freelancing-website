import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
var data = [];
var screen3Data = [];
var isPushed = false;

const Screen2 = (props) => {
  const location = useLocation();
  const state = location.state;
  //console.log(state.model.name)

  const [connections, setConnections] = useState("");

  const stateId = Number(state.model.id);
  const screen3Data = [stateId, connections, state.model.name];

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setConnections(response.data);
    });

    //data = product;
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  //main render function for this page
  if (connections) {
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
          {state.model.name} : Connections
        </h3>

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cause</th>
              <th scope="col">Effect</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          {getValue(connections)}
        </table>
        <Link
          to={{
            pathname: "/node-add",
            state: state,
          }}
        >
          <button>Add Connection</button>
        </Link>
        <Link
          to={{
            pathname: "/screen3",
            state: screen3Data,
          }}
        >
          <button>Run Values</button>
        </Link>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <h1>No Connections</h1>
      </div>
    );
  }

  //printing all the connections to the screen
  function getValue(connections) {
    var hashmap = new Map();

    connections.map((c) => {
      const stateId = Number(state.model.id);
      if (c.associateId == stateId) {
        for (let i = 0; i < c.nodes.length; i++) {
          let currentObject = c.nodes[i];
          hashmap.set(currentObject.id, currentObject.name);
        }
      }
    });

    //displaying each row of nodes on the webpage
    const arr = connections.map((c) => {
      console.log(c.edges);
      const stateId = Number(state.model.id);
      screen3Data.push(stateId);
      if (c.associateId == stateId) {
        for (let i = 0; i < c.edges.length; i++) {
          let currentObject = c.edges[i];
          console.log(currentObject.source);

          return (
            <tr>
              <td>1</td>
              <td>{hashmap.get(currentObject.source)}</td>
              <td>{hashmap.get(currentObject.target)}</td>
              <td>{currentObject.weight}</td>
            </tr>
          );
        }
      }
    });

    return arr;
  }
};

export default Screen2;

import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

var data = [];

function Screen4() {
  const [connections, setConnections] = useState("");
  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setConnections(response.data);
    });
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  if (connections) {
    return (
      <React.Fragment>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Node From</th>
              <th scope="col">Node To</th>
              <th scope="col">Weight</th>
            </tr>
          </thead>
          {getValue(connections)}
        </table>

        <form>
          <label for="analysis">Analysis:</label>
          <br />
          <input
            type="textbox"
            id="fname"
            name="fname"
            value="Node A TO B has an average impact"
            disabled
            style={{ width: "500px" }}
          />
        </form>

        <Link
          to={{
            pathname: "/",
            state: data,
          }}
        >
          <button>Home</button>
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
      const stateId = Number(c.associateId);

      if (c.associateId == stateId) {
        for (let i = 0; i < c.nodes.length; i++) {
          let currentObject = c.nodes[i];
          hashmap.set(currentObject.id, currentObject.name);
        }
      }
    });

    //printing each row of nodes to the screen
    const arr = connections.map((c) => {
      console.log(connections);
      const stateId = Number(c.associateId);

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

    console.log(hashmap);

    return arr;
  }
}

export default Screen4;

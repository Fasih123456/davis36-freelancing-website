import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";

var data =[]

function Screen2() {
  const [connections, setConnections] = useState('');



  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setConnections(response.data);
      console.log("here");
    });

    //data = product;
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  if (connections) {
    return (
      <React.Fragment>
        <table>
          <tr>
            <th>Cause</th>
            <th>Effect</th>
            <th>Weight</th>
          </tr>
          {getValue(connections)}
        </table>

        <Link
        to={{
          pathname: "/node-add",
          state: data
        }}
        >
        <button>Add Connection</button>
        </Link>
        <Link
        to={{
          pathname: "/screen3",
          state: data
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
}

function getValue(connections) {
  console.log(connections[0]);
  var hashmap = new Map();


  const newConnections = connections[0].edges;
  const nodes = connections[0].nodes;
  //console.log(nodes);

  const arr1 = nodes.map((connection) => {
      hashmap.set(connection.id, connection.name);
  })
  data = hashmap;


  

  const arr = newConnections.map((connection) => {
    return (
      <tr>
        <td>{hashmap.get(connection.source)}</td>
        <td>{hashmap.get(connection.target)}</td>
        <td>{connection.weight}</td>
      </tr>
    );
  });

  return arr;
}

export default Screen2;

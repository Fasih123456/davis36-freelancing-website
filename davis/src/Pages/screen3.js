import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Card from 'react-bootstrap/Card';

var data = [];

function Screen3() {
  const [connections, setConnections] = useState(null);

  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setConnections(response.data);
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

  if (connections) {
    return (
      <React.Fragment>
        {getValue(connections)}
        <Link
          to={{
            pathname: "/screen4",
            state: data,
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
  });
  data = hashmap;

  const arr = newConnections.map((connection) => {
    return (
      <React.Fragment>
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">M1: Runner</th>


            </tr>
          </thead>

        </table>
<Card border="primary" style={{ width: '80%', marginLeft: "10%", marginRight: "10%" }}>

        <Card.Header>Node {hashmap.get(connection.source)} To {hashmap.get(connection.target)}</Card.Header>
        <Card.Body>
        <Slider
            size="small"
            defaultValue={connection.weight}
            aria-label="Small"
            valueLabelDisplay="auto"
            min={0}
            max={1}
            step={0.01}
          />
        </Card.Body>
      </Card>
        
        <div>
          <h3>
            
          </h3>


        </div>
      </React.Fragment>
    );
  });

  return arr;
}

export default Screen3;

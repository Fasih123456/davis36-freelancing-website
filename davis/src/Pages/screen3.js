import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

var changedValue = []; //all values which are changed will be pushed to this array and later on posted to the API
let responseStatus;

function Screen3() {
  const [connections, setConnections] = useState(null);
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
        <h3 style={{ backgroundColor: "#212529", color: "white", marginBottom: "0px" }}>
          <Link
            to={{
              pathname: "/",
              state: state,
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-backward-step" />
          </Link>
          {state[2]} : Runner
        </h3>

        {getValue(connections)}

        <Link
          to={{
            pathname: "/screen4",
            state: state,
          }}
        >
          <button>Run Values</button>
        </Link>
        <button onClick={postData}>Save</button>
      </React.Fragment>
    );
  } else {
    return (
      <div>
        <h1>No Connections</h1>
      </div>
    );
  }
  function postData(e) {
    e.preventDefault();

    for (let i = 0; i < changedValue.length; i++) {
      let currentObject = changedValue[i];

      axios
        .delete(`https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product/${currentObject[1].id}`)
        .then((response) => postData2(currentObject, response.status));
    }
  }

  function postData2(currentObject, value) {
    if (value == 200) {
      axios.post("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product", {
        nodes: [
          {
            id: currentObject[1].nodes[0].id,
            name: currentObject[1].nodes[0].name,
          },
          {
            id: currentObject[1].nodes[1].id,
            name: currentObject[1].nodes[1].name,
          },
        ],
        edges: [
          {
            source: currentObject[1].edges[0].source,
            target: currentObject[1].edges[0].target,
            weight: currentObject[0],
          },
        ],
        associateId: Number(currentObject[1].associateId),
      });
    }
  }

  function handleChange(e, id) {
    e.preventDefault();
    let duplicatesFound = false;
    let position;
    let objectToBeDeleted;

    let connectionToBeAdded;

    for (let i = 1; i < connections.length + 1; i++) {
      let currentObject = connections[i - 1];

      if (currentObject.id == id) {
        connectionToBeAdded = currentObject;
      }
    }

    if (changedValue.length == 0) {
      changedValue.push([e.target.value, connectionToBeAdded]);
    } else {
      for (let i = 1; i < changedValue.length + 1; i++) {
        let currentObject = changedValue[i - 1];

        if (currentObject[1].id == id) {
          duplicatesFound = true;
          position = i;
          objectToBeDeleted = currentObject;
          break;
        }
      }

      //if the object has already been updated, then we delete the old entry and add a new entry. If it is not duplicated, then we simply add a new entry.
      if (duplicatesFound) {
        changedValue.splice(position, 1); //delete 1 object at index "position"

        changedValue.push([e.target.value, connectionToBeAdded]);
      } else {
        changedValue.push([e.target.value, connectionToBeAdded]);
      }
    }
  }

  //printing all the connections to the screen
  function getValue(connections) {
    var hashmap = new Map();

    const Id = state[0];

    const arr = connections.map((c) => {
      if (Id == c.associateId) {
        for (let i = 0; i < c.nodes.length; i++) {
          let currentObject = c.nodes[i];
          hashmap.set(currentObject.id, currentObject.name);
        }

        for (let i = 0; i < c.edges.length; i++) {
          let currentObject = c.edges[i];

          return (
            <React.Fragment>
              <Card
                border="primary"
                style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}
              >
                <Card.Header>
                  Node {hashmap.get(currentObject.source)} To {hashmap.get(currentObject.target)}
                </Card.Header>
                <Card.Body>
                  <Slider
                    size="small"
                    id={c.id}
                    onChange={(e) => handleChange(e, c.id)}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    defaultValue={Number(currentObject.weight)}
                    min={-1}
                    max={1}
                    step={0.01}
                  />
                </Card.Body>
              </Card>

              <div>
                <h3></h3>
              </div>
            </React.Fragment>
          );
        }
      }
    });

    return arr;
  }
}

export default Screen3;

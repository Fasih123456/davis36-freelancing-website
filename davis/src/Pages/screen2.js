import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
var data = [];
var screen3Data = [];
var isPushed = false;


const Screen2 = (props) => {
  const location = useLocation();
  const state = location.state;
  console.log(state)


  const [connections, setConnections] = useState("");

  const stateId = Number(state.model.id)
  const screen3Data = [stateId, connections]


  useEffect(() => {
    axios.get("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product").then((response) => {
      setConnections(response.data);
      //console.log("here");
    });


    //data = product;
  }, ["https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product"]);

  if (connections) {

    
  



    return (

      <React.Fragment>

        <h3 style={{ backgroundColor: "#212529", color: "white", marginBottom: "0px" }}>
          M1: Runner{" "}
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
  //console.log(connections);
  var hashmap = new Map();


  //console.log(connections)

  connections.map((c) => {

    const stateId = Number(state.model.id)
    //console.log(c.associateId, stateId)

    if(c.associateId == stateId){
      for(let i = 0;i < c.nodes.length;i++){
        let currentObject = c.nodes[i];
        hashmap.set(currentObject.id,currentObject.name);
      }
    }








    
    /*if(c.associateId == state.id){
      
    }*/
  })


  const arr = connections.map((c) => {
    console.log(c.edges);
    const stateId = Number(state.model.id)
    screen3Data.push(stateId)
    if(c.associateId == stateId){
    for(let i = 0;i < c.edges.length;i++){
      let currentObject = c.edges[i];
      console.log(currentObject.source)

      return (<tr>
        
      <td>1</td>
      <td>{hashmap.get(currentObject.source)}</td>
      <td>{hashmap.get(currentObject.target)}</td>
      <td>{currentObject.weight}</td>
    </tr>)
    }
  }
  })

  console.log(hashmap)

  /*
  const newConnections = connections[0].edges;
  const nodes = connections[0].nodes;
  //console.log(nodes);

  const arr1 = nodes.map((connection) => {

    hashmap.set(connection.id, connection.name);
  });
  data = hashmap;

  const arr = newConnections.map((connection) => {
    return (
      <tr>
        
        <td>1</td>
        <td>{hashmap.get(connection.source)}</td>
        <td>{hashmap.get(connection.target)}</td>
        <td>{connection.weight}</td>
      </tr>
    );
  });*/

  return arr;
}
};

export default Screen2;




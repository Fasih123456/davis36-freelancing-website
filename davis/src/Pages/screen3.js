import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import Card from "react-bootstrap/Card";
import { useLocation } from "react-router-dom";

var data = [];
var changedValue = [];

function Screen3() {
  const [connections, setConnections] = useState(null);
  const location = useLocation();
  const state = location.state;

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
    console.log("here");

    for(let i = 0;i < changedValue.length; i++){
      let currentObject = changedValue[i];
      console.log(currentObject);
      

      axios
      .delete(`https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product/${currentObject[1].id}`)
      .then((res) => console.log(res))
      .then(      axios
        .post("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/product", {
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
              weight: currentObject[0]
            },
          ],
          "associateId": Number(currentObject[1].associateId),
        })
        .then((res) => console.log("Posting data", res)))



    }


      
      //console.log('here')
   
  }

function handleChange(e, id){
  //console.log(e.target.value);
  e.preventDefault();
  let duplicatesFound = false;
  let position;
  let objectToBeDeleted;

  if(changedValue.length == 0){
    console.log("object creassted")
    changedValue.push([e.target.value,  connections[id-1]]);
  }else{
    console.log("here1");
    for(let i = 0; i < changedValue.length; i++){
      let currentObject = changedValue[i];
      console.log(currentObject);
      if(!currentObject){
        console.log('null deleted')
        changedValue.splice(1,1,currentObject);
      }
  

      console.log(currentObject[1].id, id-1)
      if(currentObject[1].id == id-1){
        duplicatesFound = true;
        position = i;
        objectToBeDeleted = currentObject;
        break;
      }
  

    }

    if(duplicatesFound){
      console.log("object deleted")
      console.log(objectToBeDeleted);
      changedValue.splice(position,1);
      console.log("object creassted")
      changedValue.push([e.target.value,  connections[id-1]]);

    }else{
      console.log("object creassted")
      changedValue.push([e.target.value,  connections[id-1]]);

    }
  }
  console.log("here");

  /*
  [
    -0.02,
    {
        "nodes": [
            {
                "id": 7834.449839137347,
                "name": "A"
            },
            {
                "id": 17095.891168875754,
                "name": "B"
            }
        ],
        "edges": [
            {
                "source": 7834.449839137347,
                "target": 17095.891168875754,
                "weight": "1"
            }
        ],
        "associateId": 1,
        "id": "1"
    }
]*/
  

  
  console.log(changedValue)


  /*setConnections(prevState => ({
    ...prevState,

  }))*/
}

function processInformation(){
  console.log(connections);
  let fas = document.getElementById("2").innerHTML;
  let fas2 = document.getElementsByClassName("MuiSlider-track");
  console.log(fas2);


}

//printing all the connections to the screen
function getValue(connections) {
  var hashmap = new Map();
  console.log(state);
  const Id = state[0];
  

  const arr = connections.map((c) => {
    if(Id == c.associateId){
      for(let i = 0;i < c.nodes.length;i++){
        let currentObject = c.nodes[i];
        hashmap.set(currentObject.id,currentObject.name);
      }

      for(let i = 0;i < c.edges.length;i++){
        let currentObject = c.edges[i];
        console.log(currentObject.source)
  
        return (
          <React.Fragment>
            {console.log(c)}

          <Card border="primary" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
            <Card.Header>
            Node {hashmap.get(currentObject.source)} To {hashmap.get(currentObject.target)} 
            </Card.Header>
            <Card.Body>
              <Slider
                size="small"
                id = {c.id}
                onChange={e => handleChange(e, c.id)}
  
                aria-label="Small"
                valueLabelDisplay="auto"
                defaultValue= {Number(currentObject.weight)}
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
        )
      }
    }

  })

  /*for(let i = 0; i < connections.length; i++){
    let currentObject = connections[i];
    if(Id == currentObject.associateId){
      return (
        <React.Fragment>
          {console.log(state)}
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">M1: Runner</th>
            </tr>
          </thead>
        </table>
        <Card border="primary" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <Card.Header>
            
          </Card.Header>
          <Card.Body>
            <Slider
              size="small"

              aria-label="Small"
              valueLabelDisplay="auto"
              min={0}
              max={1}
              step={0.01}
            />
          </Card.Body>
        </Card>

        <div>
          <h3></h3>
        </div>
      </React.Fragment>
      )
    }
  }*/

  //console.log(connections)

  /*connections.map((c) => {

    const stateId = Number(state.model.id)
    console.log(state)
    //const stateId = 1
    //console.log(c.associateId, stateId)

    if(c.associateId == stateId){
      for(let i = 0;i < c.nodes.length;i++){
        let currentObject = c.nodes[i];
        hashmap.set(currentObject.id,currentObject.name);
      }
    }








    
    /*if(c.associateId == state.id){
      
    }
  })

  const arr = connections.map((c) => {
    //console.log(c.edges);
    const stateId = Number(state.model.id)
    //const stateId = 1;
    if(c.associateId == stateId){
    for(let i = 0;i < c.edges.length;i++){
      let currentObject = c.edges[i];
      //console.log(currentObject.source)

      return (
        <React.Fragment>
          {console.log(state)}
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">M1: Runner</th>
            </tr>
          </thead>
        </table>
        <Card border="primary" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
          <Card.Header>
            
          </Card.Header>
          <Card.Body>
            <Slider
              size="small"

              aria-label="Small"
              valueLabelDisplay="auto"
              min={0}
              max={1}
              step={0.01}
            />
          </Card.Body>
        </Card>

        <div>
          <h3></h3>
        </div>
      </React.Fragment>
    )
    }
  }
  })

  //console.log(hashmap)

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
}

//Node {hashmap.get(connection.source)} To {hashmap.get(connection.target)}
//              defaultValue={connection.weight}

export default Screen3;

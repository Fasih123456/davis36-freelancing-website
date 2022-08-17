import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Redirect } from "react-router";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Record = () => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(false);
  const location = useLocation();
  const state = location.state;

  //this is the request which will be sent to the API to post all requests
  const postData = (e) => {
    e.preventDefault();
    axios
      .post("https://62ea7b1c3a5f1572e87ca9e9.mockapi.io/screen1", {
        name: name,
        value: value,
      })
      .then((res) => {
        alert(`Succesfully added model ${name} with value ${value}`);
      });
  };

  //If there are duplicats user will be promoted about it, other wise information will be posted.
  const postDataCheck = (e) => {
    e.preventDefault();
    let hasDuplicates = false;

    state.map((s) => {
      if (s.name == name) {
        hasDuplicates = true;
      }
    });

    if (!hasDuplicates) {
      postData(e);
    } else {
      alert("Duplicates are not allowed");
    }
  };

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
        Add New Model
      </h3>

      <form>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <hr />
        <label>Value</label>

        <select name="value" id="value" value={value} onChange={(e) => setValue(e.target.value)}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <hr />
        <button onClick={postDataCheck}>Submit</button>
      </form>
    </React.Fragment>
  );
};

export default Record;

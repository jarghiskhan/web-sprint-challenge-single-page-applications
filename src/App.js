import React from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Form from "./Form";

const App = () => {
  return (
    <>
      <div className="header">
        <h1>Lambda Eats</h1>
        <div className="navBar">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/pizza">
            <button id="order-pizza">Order</button>
          </Link>
        </div>
      </div>
      <br></br>
      <Route path="/pizza">
        <Form></Form>
      </Route>
      <Route exact path="/">
        <div>Best pizza in town. Press the order button to begin ordering.</div>
      </Route>
    </>
  );
};
export default App;

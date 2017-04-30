import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Item from './Item.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Shopping</h2>
        </div>

        <div className="form">
        <Item>Milk</Item>
        <Item>Eggs</Item>
        <Item>Bread</Item>
        <Item>Water</Item>
        </div>


        <div id="buttons" className="row">
            <div className="col-xs-6">
              <button className="btn btn-primary" id="button-add">Add</button>
            </div>
            <div className="col-xs-6">

              <button className="btn btn-primary" id="button-delete">Delete</button>
            </div>
        </div>

      </div>

    );
  }
}

export default App;

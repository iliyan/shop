import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Item from './Item.js';
import Btns from './Btns.js';
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <h1 class="jumbotron text-center">Shopping</h1>


        </div>

        <div className="form">
        <Item>Milk</Item>
        <Item>Eggs</Item>
        <Item>Bread</Item>
        <Item>Water</Item>
        </div>


        <Btns/>
      </div>

    );
  }
}

export default App;

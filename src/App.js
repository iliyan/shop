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
        <Item />
      </div>
    );
  }
}

export default App;

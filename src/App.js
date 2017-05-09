import React, { Component } from 'react';


import Item from './Item.js';
import Btns from './Btns.js';


class App extends Component {
  render() {
    return (

        <div className="container">

        <div className="jumbotron">
            <h1>Shopping</h1>
            <p>This is shopping, my way...</p>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-lg-12">

                    <form>
                        <Item>Milk</Item>
                        <Item>Eggs</Item>
                        <Item>Bread</Item>
                        <Item>Water</Item>
                        <Btns/>
                    </form>

                </div>
            </div>

        </div>
      </div>

    );
  }
}

export default App;

import React, { Component } from 'react';


import Item from './Item.js';
import Btns from './Btns.js';


class App extends Component {

  constructor() {
    super();
    this.state = {
        list:[]
    };
  }

  onClickHandler(index) {
      this.setState((oldState, props) => {
         const newList = [...oldState.list];
         newList.splice(index,1);
         return {list: newList};
      });
  }
  onChangeHandler(event) {
   if (event.keyCode !== 13) return;
   const newItem = event.target.value;
   this.setState((oldState, props) => {
     const newList = [...oldState.list , newItem];


     return {list: newList};
    });
    event.target.value = ''
    // console.log(event.target.value);
    console.log(event.keyCode);

  }

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
                      <input type="text"  onKeyUp={this.onChangeHandler.bind(this)}/>

                        {this.state.list.map((x, i) => (
                            <Item
                              index={i}
                              onClick={this.onClickHandler.bind(this)}>{x}</Item>
                        ))}

                    </form>

                </div>
            </div>

        </div>
      </div>

    );
  }
}

export default App;

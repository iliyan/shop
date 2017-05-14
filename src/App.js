import React, { Component } from 'react';


import Item from './Item.js';
import Btns from './Btns.js';

import recipes from './recipes.json';
import r35592 from './35592.json';
console.log(recipes);

class App extends Component {

  constructor() {
    super();
    this.state = {
        list: [],
        recipes: recipes.recipes
    };
  }

  onClickHandler(index) {
      this.setState((oldState, props) => {
         const newList = [...oldState.list];
         newList.splice(index,1);
         return {list: newList};
      });
  }

  onSelectRecipe(event) {
      const id = event.target.value;
      const ingredients = r35592.recipe.ingredients;
      console.log(ingredients);
      this.setState((oldState, props) => {
         return {list: ingredients};
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
            <div className="col-xs-4">
              <ul>
              {this.state.recipes.map(r => (
                  <li>
                    <a href="#" id={r.recipe_id} onClick={this.onSelectRecipe.bind(this)}>
                      {r.title}
                    </a>
                  </li>
              ))}
              </ul>
            </div>
            <div className="col-xs-8">

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

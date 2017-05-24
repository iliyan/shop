import React, { Component } from 'react';


import Item from './Item.js';
import Btns from './Btns.js';

import recipes from './recipes.json';
import r35592 from './35592.json';

// console.log(recipes);
class App extends Component {

  constructor() {
    super();
    this.state = {
        list: [],
        recipes: recipes.recipes
    };
  }

  onIngredientDeleteHandler(index) {
      this.setState((oldState, props) => {
         const newList = [...oldState.list]; // Making a copy of the current list because ...
         newList.splice(index,1); // ... splice modifies its argument and that's a no-no in react
         return {list: newList};
      });
  }

  onSelectRecipe(event) {
      const id = event.target.value; //recipe identifier
      console.log(r35592.recipe); // the dummy recipe we sre going to use (becsuse  thst's whst we hsve for now)
      const ingredients = r35592.recipe.ingredients;
      console.log(ingredients);

      // This is what changes the component state, based on old state and props - it is
      // returning the new component state.
      function updateIngredientList(/* currentState, props */) {
         return {list: ingredients};
      };

      // This is how we REQUEST a state change in react
      this.setState(updateIngredientList);
 }

  onChangeHandler(event) {
   if (event.keyCode !== 13) return;
   const newItem = event.target.value; // See MDN for JS event definitions
   this.setState((oldState, props) => {
       // Making a copy of the current list because ...
       // ... splice modifies its argument and that's a no-no in react
     const newList = [...oldState.list , newItem];

     // the new state
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
              <ul className="media-list">
              {this.state.recipes.map(r => {
                  const style = {width: '64px', height: '64px'};

                  return (
                  <li className="media">
                  <div className="media-left">
                      <a href="#" id={r.recipe_id} onClick={this.onSelectRecipe.bind(this)}>
                      <img style={style} className="media-object" src={r.image_url} alt="Image of a recipe"/>
                      </a>
                  </div>
                  <div className="media-body">
                     <h4 className="media-heading">{r.title}</h4>
                  </div>


                  </li>
                 );
             })}
              </ul>
            </div>
            <div className="col-xs-8">

                    <form>
                      <input type="text"  onKeyUp={this.onChangeHandler.bind(this)}/>

                        {this.state.list.map((x, i) => (
                            <Item
                              index={i}
                              onClick={this.onIngredientDeleteHandler.bind(this)}>{x}</Item>
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

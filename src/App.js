import React, { Component } from 'react';


import Item from './Item.js';
import Btns from './Btns.js';

import recipes from './recipes.json';

class App extends Component {

  constructor() {
    super();
    this.state = {
        list: [],
        recipes: recipes.matches
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
      const id = event.target.id; //recipe identifier
      return fetch(`https://api.yummly.com/v1/api/recipe/${id}`, {
        headers: {
          'X-Yummly-App-ID': 'dc1a4984',
          'X-Yummly-App-Key': '72b6467b0f86ddd5c4eb5e4730fedbb6'}
      })
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(json => {
        // This is how we REQUEST a state change in react
        this.setState(function updateIngredientList(/* currentState, props */) {
           return {list: json.ingredientLines};
        });
      });
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

    event.target.value = '';
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
                      <a href="#" onClick={this.onSelectRecipe.bind(this)}>
                      <img  id={r.id} style={style} className="media-object" src={r.smallImageUrls} alt="Image of a recipe"/>
                      </a>
                  </div>
                  <div className="media-body">
                     <h4 className="media-heading">{r.recipeName}</h4>
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

          <div className="row">
            <p className="small">{recipes.attribution.text} <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a></p>
          </div>
        </div>
      </div>

    );
  }
}

export default App;

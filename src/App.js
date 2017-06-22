// import axios from 'axios';
// import 'isomorphic-fetch';
import React, { Component } from 'react';

//const request = require('superagent');

import Item from './Item.js';
//import Btns from './Btns.js';

//import recipes from './recipes.json';

// console.log(recipes);
class App extends Component {

  constructor() {
    super();
    this.state = {
        list: [],
        recipes: []
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
        this.setState(function updateIngredientList(/* currentState, props */oldState) {
             const ingredientLines=json.ingredientLines.map(ingredient => ({text: ingredient, recipe: json}));
             const newList = [...ingredientLines ,...oldState.list ];
             return {list: newList}
         //  return {list: json.ingredientLines};

        });
      });
  }
      // Hit the API to get the recipe (promise)
    //   axios.get(`http://food2fork.com/api/get?key=d5f1880b2f0caa5faf7b0df84d2fd6a5&rId=${id}`)
    //  .then(res => {
    //    const recipe = res.data.recipe;
    //    console.log(recipe);
    // //    this.setState({ recipe });
    // //    const ingredients = res.data.recipe.ingredients;
    // //    this.setState({ ingredients });
    //  })
    // request.get('https://food2-api.herokuapp.com/api/get')
    //    .query({key: 'fcd2640cf38f413660256dabdfe21136', rId: `${id}`})
    //    .responseType('blob')
    //    .withCredentials(true)
        //  .buffer(true)
        //  .parse((x) => {
        //      console.log(x);
        //      return x;
         //
        //  })
    //    .end((error, response) => {
//console.log(response);
         //console.log(error);

    // });

    //  return fetch(`http//api.yummly.com/v1/api/recipe?_app_id=dc1a4984&_app_key=72b6467b0f86ddd5c4eb5e4730fedbb6&rId=${id}`, {
         //   method: 'GET',
        //   credentials: 'include',
        //   redirect: 'follow',
    //       mode: 'no-cors'
         //   ,
        //   headers: {'Accept': 'application/json', 'Accept-Encoding': 'identity'}
    //   })
    //   .then(response => {
    //       console.log(response);
    //       return response.ok ? response.json() : Promise.resolve('nada');
    //   })
    //   .then(json => {

    //       console.log(json);
    //        const resultPromise = response.ok ? response.json() : Promise.reject(response);

    //  return resultPromise.then(function (recipe){
    //      console.log(recipe);

    //  });
    //  })
    //   .catch(err => console.error);

    //   console.log(r35592.recipe); // the dummy recipe we sre going to use (becsuse  thst's whst we hsve for now)
    //   const ingredients = r35592.recipe.ingredients;
    //   console.log(ingredients);
      //
    //   // This is what changes the component state, based on old state and props - it is
    //   // returning the new component state.
    //   function updateIngredientList(/* currentState, props */) {
    //      return {list: ingredients};
    //   };
      //
    //   // This is how we REQUEST a state change in react
    //   this.setState(updateIngredientList);
// }

  onChangeHandler(event) {
   if (event.keyCode !== 13) return;
   const newItem = event.target.value; // See MDN for JS event definitions
   this.setState((oldState, props) => {
       // Making a copy of the current list because ...
       // ... splice modifies its argument and that's a no-no in react
     const newList = [...oldState.list , {text:newItem, recipe: null}];

     // the new state
     return {list: newList};
    });

    event.target.value = '';
    // console.log(event.target.value);

  }


  // React calls this just before rendering
  // See https://facebook.github.io/react/docs/react-component.html#componentdidmount
  componentDidMount() {
      return fetch(`https://api.yummly.com/v1/api/recipes`, {
        headers: {
          'X-Yummly-App-ID': 'dc1a4984',
          'X-Yummly-App-Key': '72b6467b0f86ddd5c4eb5e4730fedbb6'}
      })
      .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
      .then(json => {
        // This is how we REQUEST a state change in react
        this.setState(function updateRecipesList(/* currentState, props */) {
           return {recipes: json.matches};
        });
      });

  }

  render() {
    const {recipes} = this.state;




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
                 const style = {width: '50px', height: '50px'};

                  return (
                  <li className="media">
                  <div className="media-left">
                      <a href="#"  onClick={this.onSelectRecipe.bind(this)}>
                      <img id={r.id} style={style} className="media-object" src={r.smallImageUrls} alt="A recipe"/>
                      </a>
                  </div>
                  <div className="media-body">
                     <h5 className="media-heading">{r.recipeName}</h5>
                  </div>


                  </li>
                 );
             })}
              </ul>
            </div>
            <div className="col-xs-8">
                <form>




                       <input  className="form-control" type="text" onKeyUp={this.onChangeHandler.bind(this)}/>


                        {this.state.list.map((x, i) => (
                            <Item
                              index={i}
                              onClick={this.onIngredientDeleteHandler.bind(this)}>
                              {x.recipe && <a target="new" href={x.recipe.source.sourceRecipeUrl}>[{x.recipe.name}] </a>}
                              {!x.recipe && <span>[] </span>}
                              <span>{x.text}</span>
                              </Item>
                        ))}
                    </form>

            </div>
            </div>
              <div className="row">
                <p className="small">{recipes.attribution && recipes.attribution.text} <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a></p>
              </div>

            </div>
      </div>

    );
  }
}

export default App;

import React, { Component } from 'react';
import Item from './Item.js';

class App extends Component {

  constructor() {
    super();
    this.state = {
        list: {},
        recipes: []
    };
  }

  onIngredientDeleteHandler(identifier, index) {
    this.setState((oldState, props) => {
       const newList = [...oldState.list[identifier]]; // ...тук ...
       newList.splice(index,1);
       return {list: {...oldState.list, identifier:newList}}; // ... и тук ...
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

          const ingredientLines=json.ingredientLines;
          if(oldState.list[id]) {
            return {list: {...oldState.list, id: []}} // If we have ingredients from this recipe - delete them]

          }
          return {list: {...oldState.list, id: json.ingredientLines}}; // If we don't have ingredients from this recipe - add them
            // const ingredientLines=json.ingredientLines.map(ingredient => ({text: ingredient, recipe: json}));
            // const newList = [...ingredientLines ,...oldState.list ];
            // return {list: newList}
         //  return {list: json.ingredientLines};

     });
   });

  };


   onChangeHandler(event) {
       const LOOSE_INGREDIENTS_KEY = ''; // Empty string

       if (event.keyCode !== 13) return;

       const newItem = event.target.value; // See MDN for JS event definitions
       this.setState((oldState, props) => {
        const newList = [...oldState.list[LOOSE_INGREDIENTS_KEY] , newItem];
         // the new state
        return {list: {...oldState.list, LOOSE_INGREDIENTS_KEY:newList}};
       });
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
                  <li key={r.id} className="media">

                      <a href="#"  onClick={this.onSelectRecipe.bind(this)}>
                      <img id={r.id} style={style} className="media-object" src={r.smallImageUrls} alt="A recipe"/>
                      </a>


                     <h5 className="media-heading">{r.recipeName}</h5>

                  </li>
                 );
             })}
              </ul>
            </div>
            <div className="col-xs-8">





            <input  className="form-control" type="text" onKeyUp={this.onChangeHandler.bind(this)}/>


  {Object.keys(this.state.list).map((identifier, i, list) => { //  Getting the ingredients for each selected recipe
      const fromRecipe = this.state.recipes.find(x => x.id === identifier);
      const lines = [
          <h5><a target="new" href={fromRecipe.source.sourceRecipeUrl}>[{fromRecipe.name}] </a></h5>
      ];
     fromRecipe.ingredients.forEach((x, i) => lines.push(
          <Item index={i} onClick={() =>  this.onIngredientDeleteHandler(identifier, i)}>
            <span>{x}</span>
        </Item>));
      return lines;
  })}
            </div>
            </div>


            {/*//        {this.state.list.map((x, i) => (*/}
            {/*//            <Item*/}
            {/*//              index={i}*/}
            {/*//              onClick={this.onIngredientDeleteHandler.bind(this)}>*/}

            {/*//              {x.recipe && <a target="new" href={x.recipe.source.sourceRecipeUrl}>[{x.recipe.name}] </a>}*/}
            {/*//              {!x.recipe && <span> </span>}*/}
            {/*//              <span>{x.text}</span>*/}
            {/*//              </Item>*/}
            {/*//        ))}*/}

              <div className="row">
                <p className="small">{recipes.attribution && recipes.attribution.text} <a href='http://www.yummly.co/recipes'><img alt='Yummly' src='https://static.yummly.co/api-logo.png'/></a></p>
              </div>

            </div>
      </div>

    );
  }
}

export default App;

import React, { Component } from 'react';
import Item from './Item.js';

class App extends Component {
  
  static BULK_INGREDIENTS_RECIPE = {id:'bulk', recipeName:'Bulk Ingredients'};

  constructor(opts) {
    super(opts);
    this.state = {
      list: {'bulk': []},
      recipes: [...App.BULK_INGREDIENTS_RECIPE]
    };
  }

  onIngredientDeleteHandler(identifier, index) {
    this.setState((oldState, props) => {
       const newList = [...oldState.list[identifier]]; // ...тук ...
       newList.splice(index,1);
       const list = {...oldState.list, [identifier]:newList};
       return {list}; // ... и тук ...
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
        this.setState((/* currentState, props */oldState) => {

          const ingredientLines=json.ingredientLines;
          if(oldState.list[id]) {
            return {list: {...oldState.list, [id]: []}} // If we have ingredients from this recipe - delete them]
          }
          return {list: {...oldState.list, [id]: json.ingredientLines}}; // If we don't have ingredients from this recipe - add them
     });
   });

  };

  onChangeHandler(event) {
    if (event.keyCode !== 13) return;

    const newItem = event.target.value; // See MDN for JS event definitions
    event.target.setSelectionRange(0,newItem.length+1);
        
    this.setState((oldState, props) => {
      const ingredients = oldState.list ? oldState.list[App.BULK_INGREDIENTS_RECIPE.id]: [];
      // the new state
      return {list: {...oldState.list, [App.BULK_INGREDIENTS_RECIPE.id]: [...ingredients, newItem]}};
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
           return {recipes: [...json.matches, App.BULK_INGREDIENTS_RECIPE]};
        });
      });

  }

  render() {
    const {recipes, list} = this.state;

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
              {recipes.map(r => {
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

                {Object.keys(list).map((identifier, i, values) => { //  Getting the ingredients for each selected recipe
                  const components = [];

                  const arecipe = recipes.find(x => x.id === identifier);
                  if(!arecipe) return null;
                  
                  const ingredients = list[arecipe.id];
                  if (ingredients) {
                    components.push(
                        (arecipe.id === 'bulk')
                            ? <h5>[{arecipe.recipeName}]</h5>
                            : <h5><a target="new" href={`http://www.yummly.co/#recipe/${arecipe.id}`}>[{arecipe.recipeName}]</a></h5>);

                    ingredients.forEach((x, i) => components.push(
                        <Item index={i} onClick={() => this.onIngredientDeleteHandler(identifier, i)}>
                          <span>{x}</span>
                        </Item>));
                  }

                  return components;
                })}
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

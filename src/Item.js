import React, { Component } from 'react';

class Item extends Component {
  render() {

    return (
      <div className="Item">
        <input type="checkbox" id="check-one"/>
        {this.props.children}
      </div>
    );
  }
}

export default Item;

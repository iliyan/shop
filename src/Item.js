import React, { Component } from 'react';

class Item extends Component {
  render() {

    return (
      <div className="checkbox">
       <label>
        <input type="checkbox" id="check-one"/>
        {this.props.children}
       </label>
      </div>
    );
  }
}

export default Item;

import React, { Component } from 'react';

class Item extends Component {

  constructor(props) {
      super(props);
      console.log(props);
  }

  onClickHandler(){
      //   const onClick = this.props.onClick;
      //   const index = this.props.index;
      const {onClick, index} = this.props;
      onClick(index);
  }

  render() {

    return (
        <div className="container">


        
        <div className="checkbox">
          <label>
           <input type="checkbox" id="check-one"/>
            {this.props.children}
           </label>
           <a href="#" onClick={this.onClickHandler.bind(this)}>
           <span> </span>
            <span className="glyphicon glyphicon-remove-circle"/>
           </a>
        </div>
        </div>

    );
  }
}

export default Item;


import React,{ Component } from 'react';

class Btns extends Component {
    render() {

        return (
            <div className="Btns">
              <div id="buttons" className="row">
                <div className="col-xs-6">
                  <button className="btn btn-primary" id="button-add">Add</button>
                </div>
                <div className="col-xs-6">

                  <button className="btn btn-primary" id="button-delete">Delete</button>
                </div>
              </div>
            </div>
        );
    }
}

export default Btns;

import React from 'react';
import axios from 'axios';

class Groceries extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return(

      <div>
        {this.props.groceries.map(oneItem => (
          <div id="grocery" name={oneItem.name} key={oneItem.id}>
            <div>{oneItem.name}</div>
            <div>{oneItem.quantity}</div>
            <div>{oneItem.best_before}</div>
            <div>{oneItem.purchased}</div>
            <div>
              <button
              name={oneItem.name}
              onClick={()=> {
                this.props.deleteGrocery(oneItem.id)
              }}
              > Delete
              </button>
              <button>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

    )

  }

}

export default Groceries;
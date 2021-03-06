import React from 'react';
import axios from 'axios';

class GroceryForm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <form>
        <label>
          Item
          <input
          name="name"
          type="text"
          value={this.props.formState.name}
          onChange={this.props.editForm}
          />
        </label>
        <label>
          Quantity
          <input
          name="quantity"
          type="number"
          value={this.props.formState.quantity}
          onChange={this.props.editForm}
          />
        </label>
        <label>
          Best Before
          <input
          name="best_before"
          type="date"
          value={this.props.formState.best_before}
          onChange={this.props.editForm}
          />
        </label>
        <label>
          Purchased
          <input
          name="purchased"
          type="checkbox"
          value={this.props.formState.purchased}
          onChange={this.props.editForm}
          />
          <button
          type="button"
          id="add_edit"
          onClick={this.props.addGrocery}>
            Add Grocery
          </button>
          <button
          type="button"
          id="edit"
          onClick={this.props.editGroceryDB}
          >
            Edit Grocery
          </button>
        </label>
      </form>
    )

  }

}

export default GroceryForm;
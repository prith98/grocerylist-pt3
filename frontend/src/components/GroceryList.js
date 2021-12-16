import React from 'react';
import axios from 'axios';
import GroceryForm from '/frontend/src/components/GroceryForm.js';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        quantity: '',
        best_before: '',
        purchased: false
      },
      groceries: [],
      add_edit: 'Add Grocery'
    }
    this.editForm = this.editForm.bind(this);
    this.addGrocery = this.addGrocery.bind(this);
  }

  editForm(event) {
    if (event.target.name !== 'purchased') {
      let inputName = event.target.name;
      let inputValue = event.target.value;
      let stateCopy = Object.assign({}, this.state);
      stateCopy.form[inputName] = inputValue;
      this.setState(stateCopy);
    } else {
      let inputName = event.target.name;
      let stateCopy = Object.assign({}, this.state);
      stateCopy.form[inputName] = !stateCopy.form[inputName]
      this.setState(stateCopy);
    }
  }

  addGrocery(event) {
    event.preventDefault();
    console.log(this.state.form)
    axios
      .post('/api/groceries', this.state.form)
  }

  render() {

    return(
      <div>
        <img src="grocery-bags.png"/>
        <h1>Grocery List</h1>
        <GroceryForm
         formState={this.state.form}
         editForm={this.editForm}
         add_edit={this.state.add_edit}
         addGrocery={this.addGrocery}
         />
      </div>
    )

  }


}

export default GroceryList;
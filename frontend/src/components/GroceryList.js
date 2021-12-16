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
    this.refreshForm = this.refreshForm.bind(this);
  }

  // Edit the form by altering the form state
  // https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react
  // Used @AlbertoPiras & @ravibagul91's solutions
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

  // Is called after submitting the form to DB, resets form to a blank state
  refreshForm() {
    this.setState({
      form: {
        name: '',
        quantity: '',
        best_before: '',
        purchased: false
      }
    })
  }

  // Invoked when Add Grocery button is clicked, sends grocery object to database
  // and refreshes form afterwards to initial state
  addGrocery(event) {
    event.preventDefault();
    console.log(this.state.form)
    axios
      .post('/api/groceries', this.state.form)
      .then(this.refreshForm())
  }

  // Once component is mounted, makes get request to DB, and gets back
  // all groceries in DB and destructures and stores that data
  // in this.state.groceries
  componentDidMount() {
    axios
      .get('/api/groceries')
      .then(({data}) => {
        this.setState({
          groceries: data
        })
      })
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
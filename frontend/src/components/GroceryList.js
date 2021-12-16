import React from 'react';
import axios from 'axios';
import GroceryForm from '/frontend/src/components/GroceryForm.js';
import Groceries from '/frontend/src/components/Groceries.js';

class GroceryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: '',
        name: '',
        quantity: '',
        best_before: '',
        purchased: false
      },
      groceries: [],
      add_edit: 'Add Grocery',
      groceryToEdit: {}
    }
    this.editForm = this.editForm.bind(this);
    this.addGrocery = this.addGrocery.bind(this);
    this.refreshForm = this.refreshForm.bind(this);
    this.refreshGroceries = this.refreshGroceries.bind(this);
    this.deleteGrocery = this.deleteGrocery.bind(this);
    this.editGrocery = this.editGrocery.bind(this);
    this.editGroceryDB = this.editGroceryDB.bind(this);
  }


  // Allows us to change state values in response
  // to changes from prop values, in this case
  // it's changes to form
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      form: {
        id: nextProps.groceryToEdit.id || '',
        name: nextProps.groceryToEdit.name || '',
        quantity: nextProps.groceryToEdit.quantity || '',
        best_before: nextProps.groceryToEdit.best_before.slice || '',
        purchased: nextProps.groceryToEdit.purchased || false
      }
    })
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

  // Gets the updated list of groceries from DB
  // and sets groceries state equal to the updated list
  refreshGroceries() {
    axios
      .get('/api/groceries')
      .then(({data}) => {
        this.setState({
          groceries: data
        })
      })
  }

  // Is called after submitting the form to DB, resets form to a blank state
  refreshForm() {
    this.setState({
      form: {
        id: '',
        name: '',
        quantity: '',
        best_before: '',
        purchased: false
      },
      groceryToEdit: {}
    })
  }

  // Invoked when Add Grocery button is clicked, sends grocery object to database
  // and refreshes form afterwards to initial state
  addGrocery(event) {
    axios
      .post('/api/groceries', this.state.form)
      .then(this.refreshGroceries())
      .then(this.refreshForm())
  }

  // Sends a delete request to delete a grocery by its ID tag from the DB
  deleteGrocery(id) {
    axios
      .delete(`/api/groceries/${id}`)
      .then(this.refreshGroceries())
  }

  // Puts selected grocery info back into the form to
  // prepare for a PUT request to update info in the DB via ID
  editGrocery(grocery) {
    grocery.best_before = grocery.best_before.slice(0, 10)
    this.setState({
      form: grocery,
      groceryToEdit: grocery
    })
  }

  // Submits PUT Request to DB to edit grocery at ID
  // and then re-renders updated list of groceries
  editGroceryDB(event) {
    axios
      .put('/api/groceries', this.state.groceryToEdit)
      .then(this.refreshForm())

  }


  // Once component is mounted, makes get request to DB, and gets back
  // all groceries in DB and destructures and stores that data
  // in this.state.groceries
  componentDidMount() {
    this.refreshGroceries();
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
         editGroceryDB={this.editGroceryDB}
         />
        <Groceries
        groceries={this.state.groceries}
        deleteGrocery={this.deleteGrocery}
        editGrocery={this.editGrocery}
        editGroceryDB={this.editGroceryDB}
        />
      </div>
    )

  }


}

export default GroceryList;
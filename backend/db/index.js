const mysqlConnection = require('mysql');

const connection = mysqlConnection.createConnection({

  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'GroceryList'
});

connection.connect((err) => {
  if (err) {
    throw new Error(err);
    console.log(err);
  }
  console.log('Successfully connected to db')
});

module.exports = connection;
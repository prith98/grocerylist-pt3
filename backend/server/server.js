const express = require('express');
const path = require('path');
const axios = require('axios');
const db = require('../db')

const app = express();
const PORT = 3000;

app.use('/', express.static('frontend/dist/'));
app.use(express.json());

app.post('/api/groceries', (req, res) => {
  const{name, quantity, best_before, purchased} = req.body;
  db.query('INSERT INTO groceries (name, quantity, best_before, purchased) VALUES(?, ?, ?, ?)', [name, quantity, best_before, purchased], (err) => {
    if (err) {
      throw new Error (err);
      console.log(err);
      res.send(err);
    }
    const resString = 'Successfully added ' + name + ' into the database';
    console.log(resString);
    res.send(resString);
  })
})

app.get('/api/groceries', (req, res) => {
  db.query('SELECT * from groceries', (err, data) => {
    if (err) {
      throw new Error(err);
      console.log(err);
      res.send(err);
    }
    console.log('GET REQUEST SUCCESSFUL');
    res.send(data);
  })
})

app.listen(PORT, () => {
  console.log(`I'm listening on port: ${PORT}`)
})

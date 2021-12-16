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

app.delete('/api/groceries/:id', (req, res) => {
  db.query('DELETE FROM groceries WHERE id = (?)', [req.params.id], function (err, results, fields) {
    if (err) {
      throw new Error (err);
      console.log(err);
      res.send(err);
    }
    console.log('DELETE REQUEST SUCCESSFUL');
    res.send('DELETE REQUEST SUCCESSFUL');
  })
})

app.put('/api/groceries', (req, res) => {
  const {id, name, quantity, best_before, purchased} = req.body;
  db.query(
  'UPDATE groceries SET name = (?), quantity = (?), best_before = (?), purchased = (?) WHERE id = (?)',
  [name, quantity, best_before, purchased, id],
  (err, data) => {
    if (err) {
      throw new Error (err)
      console.log(err)
      res.send(err)
    }
    res.send('UPDATE SUCCESSFUL');
  })
})

app.listen(PORT, () => {
  console.log(`I'm listening on port: ${PORT}`)
})

'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid/v4');

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  return res.json(notes);
});

app.post('/api/notes', (req, res) => {
  notes.push({
    id: uuid(),
    title: req.body.title,
    text: req.body.text
  });
  console.log(notes);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(true);
});

// app.get('/api/notes/:id', (req, res) => {

// });

// app.delete('/api/notes/:id', (req, res) => {

// });

app.listen(PORT, () => {
  console.log('App listening on PORT ' + PORT);
});
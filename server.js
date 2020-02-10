'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
console.log(typeof(notes));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});

app.post("/api/notes", function(req, res) {
  notes.push(req.body);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.json(true);
});

// DELETE /api/notes/:id

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
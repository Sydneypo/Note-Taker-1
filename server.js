'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const dbString = fs.readFileSync('./db/db.json', 'utf-8');
console.log(dbString);

const app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  return res.json(dbString);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
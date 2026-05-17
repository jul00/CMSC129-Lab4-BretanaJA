// backend/app.js
const express = require('express');
const app = express();

app.use(express.json());

// In-memory task database store
let tasks = [];

// Base route to confirm the server runs
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// TODO: API routes will be written during Phase 2 (Integration) and Phase 3 (System) GREEN steps

module.exports = app;
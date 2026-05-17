const express = require('express');
const path = require('path');
const app = express();
const { validateTask } = require('./validateTask'); // Import your Part 1 validation logic

app.use(express.json());

// Serve static frontend files (index.html) out of your frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory task database store
let tasks = [];
let nextId = 1; // Counter to generate unique IDs for new tasks

// GET /tasks - Base route to fetch all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// ─── IMPLEMENT POST ROUTE (User Story 1) ───
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    try {
        // Run your unit validation logic on the incoming title
        validateTask(title);

        const newTask = {
            id: nextId++,
            title: title,
            completed: false
        };

        tasks.push(newTask);
        return res.status(201).json(newTask);
    } catch (error) {
        // If validation fails, return a bad request status with the error message
        return res.status(400).json({ error: error.message });
    }
});

// PUT /tasks/:id - Update task completion status (User Story 2 support)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { completed } = req.body;
  
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = completed !== undefined ? completed : !task.completed;
        return res.status(200).json(task);
    }
  
    return res.status(404).json({ error: 'Task not found' });
});

// ─── IMPLEMENT DELETE ROUTE (User Story 3) ───
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    
    // Find if the task exists before deleting
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task from the array
        return res.status(200).json({ message: 'Task deleted successfully' });
    }

    return res.status(404).json({ error: 'Task not found' });
});

module.exports = app;
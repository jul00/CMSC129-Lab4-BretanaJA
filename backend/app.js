const express = require('express');
const path = require('path');
const app = express();
const { validateTask } = require('./validateTask');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// In-memory data store
let tasks = [];
let nextId = 1;

// GET /tasks - Fetch all tasks
app.get('/tasks', (req, res) => {
    return res.json(tasks);
});

// POST /tasks - Create a task with validation
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    try {
        validateTask(title);

        const newTask = { id: nextId++, title: title.trim(), completed: false };
        tasks.push(newTask);
        
        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// PUT /tasks/:id - Toggle or update task completion status
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const { completed } = req.body;
  
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
  
    task.completed = completed !== undefined ? completed : !task.completed;
    return res.status(200).json(task);
});

// DELETE /tasks/:id - Remove a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    return res.status(200).json({ message: 'Task deleted successfully' });
});

module.exports = app;
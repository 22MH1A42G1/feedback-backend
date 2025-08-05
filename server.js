const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aditya@1710',
    database: 'feedbackDB'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Create table with timestamp
db.query(`CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, err => {
    if (err) throw err;
});

// API endpoint to save feedback
app.post('/api/feedback', (req, res) => {
    const { name, email, feedback } = req.body;
    console.log("Received Feedback:", req.body);  // ADD THIS LINE

    const sql = 'INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)';
    db.query(sql, [name, email, feedback], (err, result) => {
        if (err) {
            console.error("Insert Error:", err);  // ADD THIS LINE
            return res.status(500).send(err);
        }
        res.send({ message: 'Feedback saved successfully' });
    });
});


// API endpoint to get all feedback
app.get('/api/feedback', (req, res) => {
    db.query('SELECT * FROM feedback ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

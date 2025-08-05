const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect(err => {
    if (err) throw err;
    console.log('✅ Connected to MySQL database');
});

db.query(`CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`, err => {
    if (err) throw err;
});

app.post('/api/feedback', (req, res) => {
    const { name, email, feedback } = req.body;
    console.log("Received:", req.body);

    const sql = 'INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)';
    db.query(sql, [name, email, feedback], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Feedback saved successfully' });
    });
});

app.get('/api/feedback', (req, res) => {
    db.query('SELECT * FROM feedback ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

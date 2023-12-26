const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// Set up CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mern1234',
    database: 'node',
});

// Check MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Fetch all users from the 'users' table (Not for login, just an example)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Assuming you have a 'users' table in your database
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length > 0) {
                // Login successful
                res.status(200).json({ message: 'Success' });
            } else {
                // Login failed
                res.status(401).json({ error: 'Invalid credentials' });
            }
        }
    });
});

// Endpoint for user signup without bcrypt
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Assuming you have a 'users' table in your database
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ message: 'Signup successful' });
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

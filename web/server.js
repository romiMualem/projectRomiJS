const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;
const USERS_FILE = 'users.json';

app.use(bodyParser.json());
app.use(express.static('public'));

// Load existing user data from JSON file
let users = [];
try {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
} catch (err) {
    console.error('Error loading user data:', err);
}

// Handle login request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if username and password match any user in the users array
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Login successful
        res.json({ success: true, message: 'Login successful' });
    } else {
        // Login failed
        res.json({ success: false, message: 'Invalid username or password' });
    }
});

// Handle sign-up request
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    // Add new user to users array
    users.push({ username, email, password });

    // Write updated user data to JSON file
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), (err) => {
        if (err) {
            console.error('Error writing user data:', err);
            return res.json({ success: false, message: 'Error signing up user' });
        }
        res.json({ success: true, message: 'User signed up successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
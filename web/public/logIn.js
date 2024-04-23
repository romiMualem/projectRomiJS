document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Sending login request to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful
            document.getElementById('logInMessage').innerText = data.message;
        } else {
            // Login failed
            document.getElementById('logInMessage').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
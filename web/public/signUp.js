document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var username = document.getElementById('signupUsername').value;
    var email = document.getElementById('signupEmail').value;
    var password = document.getElementById('signupPassword').value;

    // Sending sign-up request to server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            // Sign-up successful
            document.getElementById('signupMessage').innerText = "Sign-up successful!";
        } else {
            // Sign-up failed
            document.getElementById('signupMessage').innerText = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('signupMessage').innerText = "An error occurred. Please try again.";
    });
});
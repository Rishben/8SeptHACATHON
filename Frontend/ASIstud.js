document.querySelector('form').addEventListener('submit', function(event) {
    // Prevent the form from submitting by default
    event.preventDefault();
    
    // Get form field values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if all fields are filled
    if (email && password) {
        // All fields are filled, redirect to the next page
        alert('sign in Successful!');
        window.location.href = 'studSI.html';
    } else {
        // If any field is empty, alert the user
        alert('Please fill in all fields.');
    }
});
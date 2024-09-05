document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    const feedback = document.querySelector('.feedback textarea').value;
    
    if (!feedback.trim()) {
        // Prevent submission if feedback is empty
        event.preventDefault();
        alert('Please enter your feedback before submitting.');
    } else {
        // Ask for confirmation to redirect to the home page
        if (confirm('Thank you for your feedback! Do you want to be redirected to the home page?')) {
            window.location.href = 'HOME.html'; // Redirect to HOME.html
        }
    }
});
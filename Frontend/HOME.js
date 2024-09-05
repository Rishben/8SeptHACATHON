
document.getElementById('signup-signin-btn').addEventListener('click', function() {
    window.location.href = 'sUsI.html'; // Redirect to sUsI.html
});

function redirectToPage(page) {
    window.location.href = page;
}

// Add event listeners to menu items
document.getElementById('home-link').addEventListener('click', function() {
    redirectToPage('HOME.html');
});

document.getElementById('about-link').addEventListener('click', function() {
    redirectToPage('aboutus.html');
});

document.getElementById('contact-link').addEventListener('click', function() {
    redirectToPage('contactus.html');
});


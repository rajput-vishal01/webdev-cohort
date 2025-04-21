document.addEventListener('DOMContentLoaded', function() {
  // Load the navbar
  fetch('navbar/nav.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;

      // Add event listeners for the navbar after it's been loaded
      const signupButton = document.getElementById("signupButton");
      const signupModal = document.getElementById("signupModal");
      const loginToggle = document.getElementById("loginToggle");
      const signupToggle = document.getElementById("signupToggle");
      const loginForm = document.getElementById("loginForm");
      const signupForm = document.getElementById("signupForm");

      if (signupButton) {
        signupButton.addEventListener("click", () => {
          signupModal.classList.toggle("hidden");
          document.body.classList.toggle("blur-background");
        });
      }

      if (loginToggle) {
        loginToggle.addEventListener("click", () => {
          loginToggle.classList.add("active");
          signupToggle.classList.remove("active");
          loginForm.classList.add("active");
          signupForm.classList.remove("active");
        });
      }

      if (signupToggle) {
        signupToggle.addEventListener("click", () => {
          signupToggle.classList.add("active");
          loginToggle.classList.remove("active");
          signupForm.classList.add("active");
          loginForm.classList.remove("active");
        });
      }

      if (signupModal) {
        signupModal.addEventListener("click", (e) => {
          if (e.target === signupModal) {
            signupModal.classList.add("hidden");
            document.body.classList.remove("blur-background");
          }
        });
      }
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.lnav1 a');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetPage = this.getAttribute('href');
      fadeOutAndNavigate(targetPage);
    });
  });

  function fadeOutAndNavigate(targetPage) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = targetPage;
    }, 10000); // Adjust the delay based on your animation duration
  }
});

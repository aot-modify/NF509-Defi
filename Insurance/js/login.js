document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Logic for login (e.g., verify the credentials)
  console.log("Login attempted with Email:", email, "Password:", password);

  // Example: Redirect based on login (could be adjusted based on authentication logic)
  // Redirect to appropriate dashboard based on your backend logic
  window.location.href = "/user_dashboard";  // Replace with actual logic for role verification
});
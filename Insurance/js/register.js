document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Logic for registration based on role (You can modify this to match your backend logic)
    console.log("Registration attempted with Name:", name, "Email:", email, "Role:", role);

    // Example: Send data to an API or handle it in your backend
    // You can redirect the user based on their role after registration, for example:
    if (role === "insurance_company") {
        window.location.href = "/insurance_dashboard";
    } else if (role === "hospital") {
        window.location.href = "/hospital_dashboard";
    } else if (role === "user") {
        window.location.href = "/user_dashboard";
    }
});
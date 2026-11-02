// Login page script
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const roleSelect = document.getElementById("role");
  const emailInput = document.getElementById("email");

  // Auto-fill sample email when role changes for easy demoing
  roleSelect.addEventListener("change", function () {
    if (roleSelect.value === "Donor") {
      emailInput.value = "donor@test.com";
    } else if (roleSelect.value === "Collector") {
      emailInput.value = "collector@test.com";
    } else if (roleSelect.value === "Admin") {
      emailInput.value = "admin@test.com";
    }
  });

  // Default pre-fill
  emailInput.value = "donor@test.com";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const role = roleSelect.value;

    // Fake login: find existing user with role or use default user
    const users = getUsers();
    let user = users.find(u => u.role === role && u.email === email);

    if (!user) {
      // Find any user matching the selected role
      user = users.find(u => u.role === role);
    }

    // If still not found, create a temporary user object
    if (!user) {
      user = {
        user_id: Date.now(),
        name: email.split("@")[0],
        email: email,
        role: role
      };
    }

    // Set current active session user
    setCurrentUser(user);

    // Later: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password, role }) })

    // Redirect based on selected role
    if (role === "Donor") {
      window.location.href = "donor-dashboard.html";
    } else if (role === "Collector") {
      window.location.href = "collector-dashboard.html";
    } else if (role === "Admin") {
      window.location.href = "admin.html";
    }
  });
});


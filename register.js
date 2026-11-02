// Register page script
document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const users = getUsers();

    // Check if email already registered
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      alert("Email is already registered. Please login.");
      window.location.href = "index.html";
      return;
    }

    // Generate new numeric user_id
    const newUserId = users.length ? Math.max(...users.map(u => u.user_id)) + 1 : 1;
    const newUser = {
      user_id: newUserId,
      name: name,
      email: email,
      role: role
    };

    // Save to users list
    users.push(newUser);
    saveUsers(users);

    // If collector, create collector record
    if (role === "Collector") {
      const collectors = getCollectors();
      const newColId = collectors.length ? Math.max(...collectors.map(c => c.collector_id)) + 1 : 1;
      collectors.push({
        collector_id: newColId,
        user_id: newUserId,
        availability: "Available"
      });
      localStorage.setItem("ewaste_collectors", JSON.stringify(collectors));
    }

    // Set current active user session
    setCurrentUser(newUser);

    // Later: fetch('/api/register', { method: 'POST', body: JSON.stringify({ name, email, password, role }) })

    alert("Registration successful!");

    // Redirect to corresponding dashboard
    if (role === "Donor") {
      window.location.href = "donor-dashboard.html";
    } else if (role === "Collector") {
      window.location.href = "collector-dashboard.html";
    } else if (role === "Admin") {
      window.location.href = "admin.html";
    }
  });
});


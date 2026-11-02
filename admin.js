// Admin Dashboard Script
document.addEventListener("DOMContentLoaded", function () {
  let currentUser = getCurrentUser();

  // If no user is logged in or user is not an admin, set default demo admin
  if (!currentUser || currentUser.role !== "Admin") {
    const users = getUsers();
    currentUser = users.find(u => u.role === "Admin") || { user_id: 3, name: "Priya Singh", role: "Admin" };
    setCurrentUser(currentUser);
  }

  const nameDisplay = document.getElementById("adminNameDisplay");
  if (nameDisplay) {
    nameDisplay.textContent = "Logged in as " + currentUser.name + " (" + currentUser.email + ")";
  }

  loadUsersTable();
  loadDisputesTable();
});

// Load all registered users
function loadUsersTable() {
  // Later: fetch('/api/admin/users') will replace this
  const users = getUsers();
  const tbody = document.getElementById("usersTableBody");

  let html = "";
  users.forEach(u => {
    html += `
      <tr>
        <td>${u.user_id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td><strong>${u.role}</strong></td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Load all disputed pickup requests
function loadDisputesTable() {
  // Later: fetch('/api/admin/disputes') will replace this
  const requests = getPickupRequests();
  const users = getUsers();
  const disputedRequests = requests.filter(r => r.status === "Disputed");
  const tbody = document.getElementById("disputesTableBody");

  if (disputedRequests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: #666;">No disputed requests pending review.</td></tr>`;
    return;
  }

  let html = "";
  disputedRequests.forEach(req => {
    const donor = users.find(u => u.user_id == req.donor_id);
    const donorName = donor ? `${donor.name} (ID: ${donor.user_id})` : `User ${req.donor_id}`;

    const { item, category } = getRequestItemDetails(req.request_id);
    const categoryName = category ? category.name : "Electronics";
    const weight = item ? item.weight + " kg" : "1.0 kg";

    html += `
      <tr>
        <td><strong>REQ-${req.request_id}</strong></td>
        <td>${donorName}</td>
        <td>${categoryName} (${weight})</td>
        <td>${req.pickup_address}</td>
        <td><strong style="color: #666;">${req.status}</strong></td>
        <td>
          <button class="btn btn-small" onclick="handleApprove(${req.request_id})">Approve</button>
          <button class="btn btn-small btn-secondary" style="margin-left: 5px;" onclick="handleReject(${req.request_id})">Reject</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Rule: Admin approves dispute: Disputed -> Verified & Rewards given: Verified -> Completed
function handleApprove(requestId) {
  if (confirm("Approve dispute for REQ-" + requestId + "? This will verify the pickup and credit reward points to the donor.")) {
    const success = adminApproveDispute(requestId);
    if (success) {
      alert("Dispute approved! Status moved to Verified -> Completed. Reward points credited.");
      loadDisputesTable();
    } else {
      alert("Failed to approve dispute.");
    }
  }
}

// Rule: Admin rejects dispute: Disputed -> Cancelled
function handleReject(requestId) {
  if (confirm("Reject dispute for REQ-" + requestId + "? This will cancel the pickup request.")) {
    const success = adminRejectDispute(requestId);
    if (success) {
      alert("Dispute rejected! Status moved to Cancelled.");
      loadDisputesTable();
    } else {
      alert("Failed to reject dispute.");
    }
  }
}


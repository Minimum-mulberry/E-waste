// Donor Dashboard Script
document.addEventListener("DOMContentLoaded", function () {
  let currentUser = getCurrentUser();

  // If no user is logged in or user is not a donor, set default demo donor for testing
  if (!currentUser || currentUser.role !== "Donor") {
    const users = getUsers();
    currentUser = users.find(u => u.role === "Donor") || { user_id: 1, name: "Rahul Sharma", role: "Donor" };
    setCurrentUser(currentUser);
  }

  const nameDisplay = document.getElementById("donorNameDisplay");
  if (nameDisplay) {
    nameDisplay.textContent = "Logged in as " + currentUser.name + " (" + currentUser.email + ")";
  }

  loadRequests(currentUser.user_id);
});

function loadRequests(donorId) {
  // Later: fetch('/api/donor/' + donorId + '/requests') will replace this
  const requests = getPickupRequests();
  const myRequests = requests.filter(r => r.donor_id == donorId);
  const tbody = document.getElementById("requestsTableBody");

  if (myRequests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: #666;">No pickup requests found. Click 'New Request' above to create one.</td></tr>`;
    return;
  }

  let html = "";
  myRequests.forEach(req => {
    const { item, category } = getRequestItemDetails(req.request_id);
    const categoryName = category ? category.name : "Electronics";
    const quantity = item ? item.quantity : 1;
    const weight = item ? item.weight + " kg" : "1.0 kg";

    html += `
      <tr>
        <td><strong>REQ-${req.request_id}</strong></td>
        <td>${categoryName}</td>
        <td>${quantity}</td>
        <td>${weight}</td>
        <td>${req.pickup_address}</td>
        <td>${req.scheduled_time}</td>
        <td><strong>${req.status}</strong></td>
        <td><a href="track-pickup.html?id=${req.request_id}">Track</a></td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


// Collector Dashboard Script
document.addEventListener("DOMContentLoaded", function () {
  let currentUser = getCurrentUser();

  // If no user is logged in or user is not a collector, set default demo collector
  if (!currentUser || currentUser.role !== "Collector") {
    const users = getUsers();
    currentUser = users.find(u => u.role === "Collector") || { user_id: 2, name: "Amit Kumar", role: "Collector" };
    setCurrentUser(currentUser);
  }

  const nameDisplay = document.getElementById("collectorNameDisplay");
  if (nameDisplay) {
    nameDisplay.textContent = "Logged in as " + currentUser.name + " (" + currentUser.email + ")";
  }

  loadCollectorRequests();
});

function loadCollectorRequests() {
  // Later: fetch('/api/collector/requests') will replace this
  const requests = getPickupRequests();
  const tbody = document.getElementById("collectorTableBody");

  if (requests.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #666;">No requests found in system.</td></tr>`;
    return;
  }

  let html = "";
  requests.forEach(req => {
    const { item, category } = getRequestItemDetails(req.request_id);
    const categoryName = category ? category.name : "Electronics";
    const quantity = item ? item.quantity : 1;
    const weight = item ? item.weight + " kg" : "1.0 kg";

    let actionCell = "";

    if (req.status === "Requested") {
      // Rule: Collector accepts: Requested -> Assigned
      actionCell = `<button class="btn btn-small" onclick="handleAccept(${req.request_id})">Accept</button>`;
    } else if (req.status === "Assigned") {
      // Rule: For Assigned ones, a "Mark as Collected" form with an OTP input and a photo upload field
      actionCell = `
        <form onsubmit="handleCollect(event, ${req.request_id})" style="display: flex; flex-direction: column; gap: 4px;">
          <input type="text" id="otp-${req.request_id}" placeholder="Enter OTP (e.g. 4321)" required style="padding: 3px 6px; font-size: 12px;">
          <input type="file" id="photo-${req.request_id}" accept="image/*" required style="font-size: 11px;">
          <button type="submit" class="btn btn-small" style="margin-top: 2px;">Mark as Collected</button>
        </form>
      `;
    } else if (req.status === "Collected") {
      actionCell = `
        <span style="color: #666; font-size: 12px;">Collected</span>
        <button class="btn btn-small" style="margin-left: 5px; font-size: 11px; padding: 2px 6px;" onclick="handleVerify(${req.request_id})">Verify & Reward</button>
      `;
    } else {
      actionCell = `<span style="color: #666; font-size: 12px;">${req.status}</span>`;
    }

    html += `
      <tr>
        <td><strong>REQ-${req.request_id}</strong></td>
        <td>${categoryName} (Qty: ${quantity})</td>
        <td>${weight}</td>
        <td>${req.pickup_address}</td>
        <td>${req.scheduled_time}</td>
        <td><strong>${req.status}</strong></td>
        <td>${actionCell}</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// Handler for accepting a pickup: Requested -> Assigned
function handleAccept(requestId) {
  const currentUser = getCurrentUser();
  const success = acceptPickup(requestId, currentUser ? currentUser.user_id : 2);
  if (success) {
    alert("Pickup REQ-" + requestId + " has been assigned to you.");
    loadCollectorRequests();
  } else {
    alert("Could not accept request.");
  }
}

// Handler for collector marking as collected with OTP: Assigned -> Collected
function handleCollect(event, requestId) {
  event.preventDefault();

  const otpInput = document.getElementById("otp-" + requestId);
  const photoInput = document.getElementById("photo-" + requestId);

  const otp = otpInput ? otpInput.value.trim() : "";
  const photoName = (photoInput && photoInput.files[0]) ? photoInput.files[0].name : "proof.jpg";

  if (!otp) {
    alert("Please enter the OTP provided by the donor.");
    return;
  }

  // Update status Assigned -> Collected
  const success = markPickupCollected(requestId, otp, photoName);
  if (success) {
    alert("Pickup REQ-" + requestId + " marked as Collected with OTP & Photo proof!");
    loadCollectorRequests();
  } else {
    alert("Failed to update status to Collected.");
  }
}

// Handler to trigger verification pass: Collected -> Verified -> Completed
function handleVerify(requestId) {
  const success = processVerificationAndRewards(requestId);
  if (success) {
    alert("Verification passed! Request REQ-" + requestId + " is Completed and reward points credited to donor.");
    loadCollectorRequests();
  }
}


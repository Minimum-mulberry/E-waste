// Track Pickup script
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const requestIdParam = urlParams.get("id");

  const requests = getPickupRequests();
  let currentReq = null;

  if (requestIdParam) {
    currentReq = requests.find(r => r.request_id == requestIdParam);
  } else if (requests.length > 0) {
    // Default to first request if no id param passed
    currentReq = requests[0];
  }

  if (!currentReq) {
    document.getElementById("requestDetails").innerHTML = "<p>No request found to track.</p>";
    return;
  }

  renderTracking(currentReq.request_id);
});

function renderTracking(requestId) {
  // Later: fetch('/api/requests/' + requestId) will replace this
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);
  if (!req) return;

  const { item, category } = getRequestItemDetails(req.request_id);
  const categoryName = category ? category.name : "Electronics";
  const quantity = item ? item.quantity : 1;
  const weight = item ? item.weight + " kg" : "1.0 kg";

  document.getElementById("requestTitle").textContent = "Track Pickup REQ-" + req.request_id;

  const detailsDiv = document.getElementById("requestDetails");
  detailsDiv.innerHTML = `
    <p style="margin: 4px 0;"><strong>Status:</strong> ${req.status}</p>
    <p style="margin: 4px 0;"><strong>Item:</strong> ${categoryName} (Qty: ${quantity}, Weight: ${weight})</p>
    <p style="margin: 4px 0;"><strong>Address:</strong> ${req.pickup_address}</p>
    <p style="margin: 4px 0;"><strong>Scheduled Time:</strong> ${req.scheduled_time}</p>
    ${(req.status === "Requested" || req.status === "Assigned") ? `<p style="margin: 4px 0; color: #2e7d32;"><strong>Pickup OTP:</strong> 4321 (share with collector during pickup)</p>` : ""}
  `;

  // Reset steps
  const steps = ["Requested", "Assigned", "Collected", "Verified", "Completed"];
  steps.forEach(step => {
    const el = document.getElementById("step-" + step);
    if (el) {
      el.classList.remove("current");
    }
  });

  // Highlight current step in green if status is one of the 5 progression steps
  const currentStepEl = document.getElementById("step-" + req.status);
  if (currentStepEl) {
    currentStepEl.classList.add("current");
  }

  const noticeDiv = document.getElementById("statusNotice");
  if (req.status === "Cancelled") {
    noticeDiv.className = "error-banner";
    noticeDiv.style.display = "block";
    noticeDiv.textContent = "This pickup request was Cancelled.";
  } else if (req.status === "Disputed") {
    noticeDiv.className = "error-banner";
    noticeDiv.style.display = "block";
    noticeDiv.textContent = "A dispute has been raised for this pickup. Admin review is pending.";
  } else {
    noticeDiv.style.display = "none";
  }

  // Cancel button logic: Donor can cancel only when status is Requested or Assigned
  const cancelBtn = document.getElementById("cancelBtn");
  if (req.status === "Requested" || req.status === "Assigned") {
    cancelBtn.style.display = "inline-block";
    cancelBtn.onclick = function () {
      if (confirm("Are you sure you want to cancel this pickup request?")) {
        cancelPickup(req.request_id);
        alert("Pickup REQ-" + req.request_id + " has been cancelled.");
        renderTracking(req.request_id);
      }
    };
  } else {
    cancelBtn.style.display = "none";
  }

  // Raise dispute button logic: Donor raises dispute after Collected
  const disputeBtn = document.getElementById("disputeBtn");
  if (req.status === "Collected") {
    disputeBtn.style.display = "inline-block";
    disputeBtn.onclick = function () {
      const reason = prompt("Enter reason for dispute (e.g. incorrect weight or item damaged):", "Incorrect item quantity verified");
      if (reason !== null) {
        raiseDispute(req.request_id);
        alert("Dispute raised for REQ-" + req.request_id + ". An admin will review it.");
        renderTracking(req.request_id);
      }
    };
  } else {
    disputeBtn.style.display = "none";
  }
}


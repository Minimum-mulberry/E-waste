// E-Waste Pickup System - College SE Project
// data.js: Mock data store and localStorage handlers

// Initial Seed Data
const SEED_CATEGORIES = [
  { category_id: 1, name: "Mobile Phones", is_hazardous: false, reward_per_kg: 50 },
  { category_id: 2, name: "Laptops", is_hazardous: false, reward_per_kg: 80 },
  { category_id: 3, name: "Batteries", is_hazardous: true, reward_per_kg: 30 },
  { category_id: 4, name: "Chargers and Cables", is_hazardous: false, reward_per_kg: 20 }
];

const SEED_USERS = [
  { user_id: 1, name: "Rahul Sharma", email: "donor@test.com", role: "Donor" },
  { user_id: 2, name: "Amit Kumar", email: "collector@test.com", role: "Collector" },
  { user_id: 3, name: "Priya Singh", email: "admin@test.com", role: "Admin" }
];

const SEED_COLLECTORS = [
  { collector_id: 1, user_id: 2, availability: "Available" }
];

const SEED_PICKUP_REQUESTS = [
  {
    request_id: 101,
    donor_id: 1,
    collector_id: null,
    pickup_address: "Flat 402, Green Heights, MG Road, Bengaluru",
    scheduled_time: "2026-11-05 10:00",
    status: "Requested"
  },
  {
    request_id: 102,
    donor_id: 1,
    collector_id: 1,
    pickup_address: "12/A, 5th Cross, Indiranagar, Bengaluru",
    scheduled_time: "2026-11-04 14:30",
    status: "Assigned"
  },
  {
    request_id: 103,
    donor_id: 1,
    collector_id: 1,
    pickup_address: "88, Lake View Colony, Koramangala, Bengaluru",
    scheduled_time: "2026-11-03 11:00",
    status: "Collected"
  },
  {
    request_id: 104,
    donor_id: 1,
    collector_id: 1,
    pickup_address: "24, Residency Road, Bengaluru",
    scheduled_time: "2026-11-02 16:00",
    status: "Disputed"
  },
  {
    request_id: 105,
    donor_id: 1,
    collector_id: 1,
    pickup_address: "301, Sunshine Apartments, HSR Layout, Bengaluru",
    scheduled_time: "2026-10-28 09:30",
    status: "Completed"
  },
  {
    request_id: 106,
    donor_id: 1,
    collector_id: null,
    pickup_address: "77, BTM 2nd Stage, Bengaluru",
    scheduled_time: "2026-10-25 15:00",
    status: "Cancelled"
  }
];

const SEED_EWASTE_ITEMS = [
  { item_id: 1, request_id: 101, category_id: 1, quantity: 2, weight: 0.5 },
  { item_id: 2, request_id: 102, category_id: 2, quantity: 1, weight: 2.0 },
  { item_id: 3, request_id: 103, category_id: 3, quantity: 4, weight: 1.5 },
  { item_id: 4, request_id: 104, category_id: 2, quantity: 1, weight: 2.5 },
  { item_id: 5, request_id: 105, category_id: 4, quantity: 5, weight: 1.0 },
  { item_id: 6, request_id: 106, category_id: 1, quantity: 1, weight: 0.3 }
];

const SEED_VERIFICATIONS = [
  { verification_id: 1, request_id: 103, method: "OTP and Photo", proof_hash: "proof_req103.jpg", status: "Pending" },
  { verification_id: 2, request_id: 104, method: "OTP and Photo", proof_hash: "proof_req104.jpg", status: "Disputed" },
  { verification_id: 3, request_id: 105, method: "OTP and Photo", proof_hash: "proof_req105.jpg", status: "Verified" }
];

const SEED_REWARD_TRANSACTIONS = [
  { txn_id: 1, user_id: 1, request_id: 105, points: 20 }
];

// Initialize localStorage with seed data if not already present
function initStorage() {
  if (!localStorage.getItem("ewaste_initialized")) {
    localStorage.setItem("ewaste_categories", JSON.stringify(SEED_CATEGORIES));
    localStorage.setItem("ewaste_users", JSON.stringify(SEED_USERS));
    localStorage.setItem("ewaste_collectors", JSON.stringify(SEED_COLLECTORS));
    localStorage.setItem("ewaste_pickup_requests", JSON.stringify(SEED_PICKUP_REQUESTS));
    localStorage.setItem("ewaste_items", JSON.stringify(SEED_EWASTE_ITEMS));
    localStorage.setItem("ewaste_verifications", JSON.stringify(SEED_VERIFICATIONS));
    localStorage.setItem("ewaste_reward_transactions", JSON.stringify(SEED_REWARD_TRANSACTIONS));
    localStorage.setItem("ewaste_initialized", "true");
  }
}

// Data Getters and Savers
function getUsers() {
  // fetch('/api/users') will go here later
  return JSON.parse(localStorage.getItem("ewaste_users") || "[]");
}

function saveUsers(users) {
  // fetch('/api/users', { method: 'POST', body: JSON.stringify(users) }) will go here later
  localStorage.setItem("ewaste_users", JSON.stringify(users));
}

function getCategories() {
  // fetch('/api/categories') will go here later
  return JSON.parse(localStorage.getItem("ewaste_categories") || "[]");
}

function getPickupRequests() {
  // fetch('/api/requests') will go here later
  return JSON.parse(localStorage.getItem("ewaste_pickup_requests") || "[]");
}

function savePickupRequests(requests) {
  // fetch('/api/requests', { method: 'PUT', body: JSON.stringify(requests) }) will go here later
  localStorage.setItem("ewaste_pickup_requests", JSON.stringify(requests));
}

function getEWasteItems() {
  // fetch('/api/items') will go here later
  return JSON.parse(localStorage.getItem("ewaste_items") || "[]");
}

function saveEWasteItems(items) {
  // fetch('/api/items', { method: 'POST', body: JSON.stringify(items) }) will go here later
  localStorage.setItem("ewaste_items", JSON.stringify(items));
}

function getVerifications() {
  // fetch('/api/verifications') will go here later
  return JSON.parse(localStorage.getItem("ewaste_verifications") || "[]");
}

function saveVerifications(verifications) {
  // fetch('/api/verifications', { method: 'POST', body: JSON.stringify(verifications) }) will go here later
  localStorage.setItem("ewaste_verifications", JSON.stringify(verifications));
}

function getRewardTransactions() {
  // fetch('/api/rewards') will go here later
  return JSON.parse(localStorage.getItem("ewaste_reward_transactions") || "[]");
}

function saveRewardTransactions(txns) {
  // fetch('/api/rewards', { method: 'POST', body: JSON.stringify(txns) }) will go here later
  localStorage.setItem("ewaste_reward_transactions", JSON.stringify(txns));
}

function getCollectors() {
  // fetch('/api/collectors') will go here later
  return JSON.parse(localStorage.getItem("ewaste_collectors") || "[]");
}

// Current Session User management
function getCurrentUser() {
  const user = localStorage.getItem("ewaste_current_user");
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem("ewaste_current_user", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("ewaste_current_user");
  window.location.href = "index.html";
}

// Helper: Find item and category details for a request
function getRequestItemDetails(requestId) {
  const items = getEWasteItems();
  const categories = getCategories();
  const item = items.find(i => i.request_id == requestId);
  if (!item) return { item: null, category: null };
  const category = categories.find(c => c.category_id == item.category_id);
  return { item, category };
}

// Business Logic Functions matching Status Rules

// 1. Collector accepts: Requested -> Assigned
function acceptPickup(requestId, collectorUserId) {
  // fetch('/api/requests/' + requestId + '/accept', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const collectors = getCollectors();
  const collector = collectors.find(c => c.user_id == collectorUserId) || collectors[0];

  const req = requests.find(r => r.request_id == requestId);
  if (req && req.status === "Requested") {
    req.status = "Assigned";
    req.collector_id = collector ? collector.collector_id : 1;
    savePickupRequests(requests);
    return true;
  }
  return false;
}

// 2. Collector marks collected with OTP: Assigned -> Collected
function markPickupCollected(requestId, otp, photoProofName) {
  // fetch('/api/requests/' + requestId + '/collect', { method: 'POST', body: ... }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (req && req.status === "Assigned") {
    req.status = "Collected";
    savePickupRequests(requests);

    // Save verification entry
    const verifications = getVerifications();
    const newVerId = verifications.length ? Math.max(...verifications.map(v => v.verification_id)) + 1 : 1;
    verifications.push({
      verification_id: newVerId,
      request_id: Number(requestId),
      method: "OTP and Photo",
      proof_hash: photoProofName || "proof_" + requestId + ".jpg",
      status: "Pending"
    });
    saveVerifications(verifications);
    return true;
  }
  return false;
}

// 3. Verification passes: Collected -> Verified & Rewards given: Verified -> Completed
// Reward formula: points = weight * reward_per_kg
function processVerificationAndRewards(requestId) {
  // fetch('/api/requests/' + requestId + '/verify', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (!req) return false;

  // Step A: Collected -> Verified (or Disputed -> Verified)
  req.status = "Verified";

  // Update verification record
  const verifications = getVerifications();
  const ver = verifications.find(v => v.request_id == requestId);
  if (ver) {
    ver.status = "Verified";
    saveVerifications(verifications);
  }

  // Step B: Rewards given: Verified -> Completed
  const { item, category } = getRequestItemDetails(requestId);
  let pointsAwarded = 0;
  if (item && category) {
    const weight = item.weight || 1;
    pointsAwarded = Math.round(weight * category.reward_per_kg);
  }

  // Record reward transaction
  const rewardTxns = getRewardTransactions();
  const newTxnId = rewardTxns.length ? Math.max(...rewardTxns.map(t => t.txn_id)) + 1 : 1;
  rewardTxns.push({
    txn_id: newTxnId,
    user_id: req.donor_id,
    request_id: Number(requestId),
    points: pointsAwarded
  });
  saveRewardTransactions(rewardTxns);

  // Status is now Completed
  req.status = "Completed";
  savePickupRequests(requests);
  return true;
}

// 4. Donor can cancel only when status is Requested or Assigned: -> Cancelled
function cancelPickup(requestId) {
  // fetch('/api/requests/' + requestId + '/cancel', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (req && (req.status === "Requested" || req.status === "Assigned")) {
    req.status = "Cancelled";
    savePickupRequests(requests);
    return true;
  }
  return false;
}

// 5. Donor raises dispute after Collected: Collected -> Disputed
function raiseDispute(requestId) {
  // fetch('/api/requests/' + requestId + '/dispute', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (req && req.status === "Collected") {
    req.status = "Disputed";
    savePickupRequests(requests);

    // Update verification record to disputed
    const verifications = getVerifications();
    const ver = verifications.find(v => v.request_id == requestId);
    if (ver) {
      ver.status = "Disputed";
      saveVerifications(verifications);
    }
    return true;
  }
  return false;
}

// 6. Admin approves dispute: Disputed -> Verified -> Completed (with rewards)
function adminApproveDispute(requestId) {
  // fetch('/api/admin/disputes/' + requestId + '/approve', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (req && req.status === "Disputed") {
    // Calling processVerificationAndRewards will transition Disputed -> Verified -> Completed and grant points
    return processVerificationAndRewards(requestId);
  }
  return false;
}

// 7. Admin rejects dispute: Disputed -> Cancelled
function adminRejectDispute(requestId) {
  // fetch('/api/admin/disputes/' + requestId + '/reject', { method: 'POST' }) will go here later
  const requests = getPickupRequests();
  const req = requests.find(r => r.request_id == requestId);

  if (req && req.status === "Disputed") {
    req.status = "Cancelled";
    savePickupRequests(requests);

    const verifications = getVerifications();
    const ver = verifications.find(v => v.request_id == requestId);
    if (ver) {
      ver.status = "Cancelled";
      saveVerifications(verifications);
    }
    return true;
  }
  return false;
}

// Initialize immediately when script is loaded
initStorage();


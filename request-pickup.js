// Request Pickup script
document.addEventListener("DOMContentLoaded", function () {
  let currentUser = getCurrentUser();
  if (!currentUser) {
    currentUser = { user_id: 1, name: "Rahul Sharma", role: "Donor" };
    setCurrentUser(currentUser);
  }

  // Populate categories
  const categorySelect = document.getElementById("category");
  const categories = getCategories();
  categorySelect.innerHTML = categories.map(c => {
    const hazardNote = c.is_hazardous ? " (Hazardous)" : "";
    return `<option value="${c.category_id}">${c.name}${hazardNote} - ${c.reward_per_kg} pts/kg</option>`;
  }).join("");

  // Set default date to tomorrow
  const dateInput = document.getElementById("pickup_date");
  const timeInput = document.getElementById("pickup_time");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split("T")[0];
  timeInput.value = "10:00";

  const form = document.getElementById("requestPickupForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const categoryId = parseInt(categorySelect.value);
    const quantity = parseInt(document.getElementById("quantity").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const address = document.getElementById("pickup_address").value.trim();
    const date = dateInput.value;
    const time = timeInput.value;

    const scheduledTime = date + " " + time;

    const requests = getPickupRequests();
    const items = getEWasteItems();

    // Generate new IDs
    const newRequestId = requests.length ? Math.max(...requests.map(r => r.request_id)) + 1 : 101;
    const newItemId = items.length ? Math.max(...items.map(i => i.item_id)) + 1 : 1;

    // Create PickupRequest object
    const newRequest = {
      request_id: newRequestId,
      donor_id: currentUser.user_id,
      collector_id: null,
      pickup_address: address,
      scheduled_time: scheduledTime,
      status: "Requested"
    };

    // Create EWasteItem object
    const newItem = {
      item_id: newItemId,
      request_id: newRequestId,
      category_id: categoryId,
      quantity: quantity,
      weight: weight
    };

    // Save to localStorage
    requests.push(newRequest);
    savePickupRequests(requests);

    items.push(newItem);
    saveEWasteItems(items);

    // Later: fetch('/api/requests', { method: 'POST', body: JSON.stringify({ ...newRequest, item: newItem }) })

    alert("Pickup request REQ-" + newRequestId + " submitted successfully!");
    window.location.href = "donor-dashboard.html";
  });
});


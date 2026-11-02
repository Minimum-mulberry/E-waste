// Rewards page script
document.addEventListener("DOMContentLoaded", function () {
  let currentUser = getCurrentUser();
  if (!currentUser) {
    currentUser = { user_id: 1, name: "Rahul Sharma", role: "Donor" };
    setCurrentUser(currentUser);
  }

  loadRewards(currentUser.user_id);
});

function loadRewards(userId) {
  // Later: fetch('/api/donor/' + userId + '/rewards') will replace this
  const allTxns = getRewardTransactions();
  const myTxns = allTxns.filter(t => t.user_id == userId);

  let total = 0;
  myTxns.forEach(t => {
    total += t.points;
  });

  document.getElementById("totalPoints").textContent = total;

  const tbody = document.getElementById("rewardTxnTableBody");
  if (myTxns.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: #666;">No reward transactions yet. Complete pickups to earn points!</td></tr>`;
    return;
  }

  let html = "";
  myTxns.forEach(t => {
    html += `
      <tr>
        <td><strong>TXN-${t.txn_id}</strong></td>
        <td><a href="track-pickup.html?id=${t.request_id}">REQ-${t.request_id}</a></td>
        <td style="color: #2e7d32; font-weight: bold;">+${t.points} pts</td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}


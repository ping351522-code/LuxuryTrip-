/* admin.js : Dashboard summary */
const users = LT.listUsers();
const bookings = LT.listBookings();
const revenue = bookings.filter(b => b.status === 'ok').reduce((s, b) => s + b.total, 0);
const pending = bookings.filter(b => b.status === 'wait').length;

document.getElementById('kpis').innerHTML = `
  <div class="kpi"><small>Total Users</small><b>${users.length}</b></div>
  <div class="kpi"><small>Total Bookings</small><b>${bookings.length}</b></div>
  <div class="kpi"><small>Pending Bookings</small><b>${pending}</b></div>
  <div class="kpi"><small>Confirmed Revenue</small><b>$${revenue.toLocaleString('en-US')}</b></div>`;

document.getElementById('recent').innerHTML = bookings.slice(0, 8).map(b => {
  const u = LT.getUser(b.userId);
  return `<tr><td>#${b.id}</td><td>${u ? u.name : '—'}</td><td>${b.hotel}</td><td>$${b.total}</td><td><span class="tag ${b.status}">${b.status === 'ok' ? 'Confirmed' : b.status === 'wait' ? 'Pending' : 'Cancelled'}</span></td></tr>`;
}).join('') || `<tr><td colspan="5" style="text-align:center;color:#9aa3cc">No bookings yet</td></tr>`;

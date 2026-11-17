/* admin-nav.js : admin panel ရဲ့ ဘေးဘက် menu */
const ADMIN_ITEMS = [
  ['dashboard', 'admin.html', 'Dashboard', '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>'],
  ['users', 'admin-users.html', 'Users', '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>'],
  ['bookings', 'admin-bookings.html', 'Bookings', '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M9 15l2 2 4-4"/>'],
  ['hotels', 'admin-hotels.html', 'Hotels', '<path d="M3 21V9l9-6 9 6v12M9 21v-6h6v6"/>'],
  ['messages', 'admin-messages.html', 'Messages', '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>']
];
const cur = document.body.dataset.admin;
const side = document.createElement('div');
side.className = 'admin-side';
side.innerHTML = `<div class="brand">LuxuryTrip<br><small style="color:#9aa3cc;font-family:Inter;font-size:12px">Admin Panel</small></div>` +
  ADMIN_ITEMS.map(([k, href, label, icon]) => `<a href="${href}" class="${k === cur ? 'on' : ''}"><svg viewBox="0 0 24 24">${icon}</svg>${label}</a>`).join('') +
  `<a href="#" class="logout" id="admin-logout"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>Log Out</a>`;
document.querySelector('.admin-shell').prepend(side);
document.getElementById('admin-logout').addEventListener('click', e => {
  e.preventDefault();
  if (confirm('Log out of admin panel?')) { LT.logout(); location.href = 'admin-login.html'; }
});

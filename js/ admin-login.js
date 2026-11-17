/* admin-login.js */
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const res = LT.adminLogin({ username, password });
  const err = document.getElementById('err');
  if (!res.ok) { err.textContent = res.error; err.classList.add('show'); return; }
  location.href = 'admin.html';
});

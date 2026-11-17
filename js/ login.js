/* login.js */
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const res = LT.login({ email, password });
  const err = document.getElementById('err');
  if (!res.ok) { err.textContent = res.error; err.classList.add('show'); return; }
  location.href = 'account.html';
});

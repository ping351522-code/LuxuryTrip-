/* signup.js */
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const res = LT.signup({ name, email, password }); // server ဆီ "အကောင့်ဖွင့်" အချက်ပို့တာ
  const err = document.getElementById('err');
  if (!res.ok) { err.textContent = res.error; err.classList.add('show'); return; }
  location.href = 'account.html';
});

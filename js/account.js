/* account.js : login ဝင်ထားရင် store.js ကနေ user ရဲ့ balance/points ကို ပြတယ်
   (admin ဘက်ကနေ ပြင်ထားရင် ဒီနေရာမှာ ချက်ချင်း ပေါ်လာမယ်) */
const user = LT.currentUser();

if (user) {
  document.getElementById('name').textContent = user.name;
  document.getElementById('email').textContent = user.email;
  document.getElementById('guest-box').style.display = 'none';
  document.getElementById('member-box').style.display = '';
  document.getElementById('points').textContent = user.points + ' pts';
  document.getElementById('bal').textContent = 'Balance: $' + user.balance.toFixed(2);
  document.getElementById('bar').style.width = Math.min(user.points / 3000, 1) * 100 + '%';
  document.getElementById('logout').style.display = '';
  document.getElementById('logout').addEventListener('click', () => {
    if (confirm('Log out?')) { LT.logout(); location.href = 'index.html'; }
  });
}

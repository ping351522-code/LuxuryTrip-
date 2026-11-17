/* messages.js : user ဘက်ကနေ admin ကို စာပို့တယ်, admin ပြန်စာကိုလည်း ဒီမှာမြင်ရမယ် */
const user = LT.currentUser();
const box = document.getElementById('msgs');

if (!user) {
  box.innerHTML = `<p class="login-note">Please <a href="login.html">log in</a> to chat with our support team.</p>`;
  document.querySelector('.chat-input').style.display = 'none';
} else {
  function render() {
    box.innerHTML = LT.listMessages(user.id).map(m => `<div class="msg ${m.from}">${m.text}</div>`).join('');
    box.scrollTop = 9999;
  }
  render();
  document.getElementById('send').addEventListener('click', () => {
    const t = document.getElementById('text');
    if (!t.value.trim()) return;
    LT.sendMessage(user.id, 'user', t.value.trim());
    t.value = '';
    render();
  });
  document.getElementById('text').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('send').click(); });
}

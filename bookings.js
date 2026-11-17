/* bookings.js
   Login ဝင်ထားရင် LT.currentUser() ကနေ user ကို ယူပြီး LT.listBookingsForUser()
   နဲ့ booking တွေကို "server" (store.js) ကနေ တိုက်ရိုက်ဖတ်တယ် — admin ဘက်ကနေ
   confirm/cancel/edit လုပ်လိုက်တာ ဒီနေရာမှာ ချက်ချင်းပေါ်မယ်။
   Login မဝင်ရသေးရင် demo data ကို ပြထားတယ်။ */
const GOAL_NIGHTS = 40;
const user = LT.currentUser();

const DEMO_BOOKINGS = [
  { id: 'LT-20481', hotel: 'Sule Shangri-La Yangon', place: 'Yangon, Myanmar', img: 'images/hotel-1.jpg', inDate: 'Jun 15', outDate: 'Jun 18', nights: 3, guests: '2 Adults', total: 360, status: 'ok' }
];

const $ = id => document.getElementById(id);
const money = n => '$' + n.toLocaleString('en-US');
const LABEL = { ok: 'Confirmed', wait: 'Pending', off: 'Cancelled' };

function getBookings() {
  return user ? LT.listBookingsForUser(user.id) : DEMO_BOOKINGS;
}

function render() {
  const bookings = getBookings();
  $('who-name').textContent = user ? user.name : 'Guest';
  $('who-tier').textContent = user ? '🏅 Gold Member' : 'Not logged in';
  $('list').innerHTML = bookings.map(b => `
    <article class="card bk ${b.status === 'off' ? 'off' : ''}" data-status="${b.status}" data-id="${b.id}">
      <div class="top"><div class="pic" style="--img:url(${b.img || 'images/hotel-1.jpg'});${b.g ? '--g:' + b.g : ''}"></div>
        <div class="info"><h3>${b.hotel}</h3><p>📍 ${b.place}</p><span class="badge ${b.status}">${LABEL[b.status]}</span></div></div>
      <div class="dates">
        <div><small>Check In</small><b>${b.inDate}</b></div><div><small>Check Out</small><b>${b.outDate}</b></div>
        <div><small>Guests</small><b>${b.guests}</b></div><div><small>Total</small><b>${money(b.total)}</b></div>
      </div>
      <div class="foot"><span class="id">#${b.id}</span>
        <div class="acts"><a class="btn-line" href="hotel.html">View</a>
        ${user ? `<button class="btn-line danger cancel">Cancel</button>` : ''}</div></div>
    </article>`).join('');
  summary(bookings);
  applyFilter();
}

function summary(bookings) {
  const ok = bookings.filter(b => b.status === 'ok');
  const nights = ok.reduce((s, b) => s + b.nights, 0);
  const spent = ok.reduce((s, b) => s + b.total, 0);
  $('nights-txt').textContent = `(${nights}/${GOAL_NIGHTS})`;
  $('fill').style.width = Math.min(nights / GOAL_NIGHTS, 1) * 100 + '%';
  $('spent').textContent = money(spent);
  $('points').textContent = (user ? user.points : spent).toLocaleString('en-US');
  const left = Math.max(GOAL_NIGHTS - nights, 0);
  $('hint').textContent = left ? `${left} more nights to reach the next member tier.` : 'You have reached the next member tier!';
}

function applyFilter() {
  const status = document.querySelector('.chip.on').dataset.status;
  let shown = 0;
  document.querySelectorAll('.bk').forEach(c => {
    const ok = status === 'all' || c.dataset.status === status;
    c.style.display = ok ? '' : 'none';
    shown += ok;
  });
  $('empty').style.display = shown ? 'none' : 'block';
}

document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  applyFilter();
}));

$('list').addEventListener('click', e => {
  if (!e.target.classList.contains('cancel') || !user) return;
  if (!confirm('Cancel this booking?')) return;
  const id = e.target.closest('.bk').dataset.id;
  LT.updateBooking(id, { status: 'off' }); // "server" ကို cancel request ပို့တာ — admin list မှာလည်း ချက်ချင်းပေါ်မယ်
  render();
});

render();

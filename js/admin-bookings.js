/* admin-bookings.js : booking list + confirm/cancel + total/nights ပြင်တာ
   user ဘက်က bookings.html ဖွင့်ရင် ဒီဖြင့်မှုတွေကို အသစ်မြင်ရမယ် */
function render() {
  document.getElementById('rows').innerHTML = LT.listBookings().map(b => {
    const u = LT.getUser(b.userId);
    const label = b.status === 'ok' ? 'Confirmed' : b.status === 'wait' ? 'Pending' : 'Cancelled';
    return `<tr data-id="${b.id}">
      <td>#${b.id}</td><td>${u ? u.name : '—'}</td><td>${b.hotel}</td><td>${b.nights}</td><td>$${b.total}</td>
      <td><span class="tag ${b.status}">${label}</span></td>
      <td>
        ${b.status !== 'ok' ? `<button class="mini-btn gold" data-act="ok">Confirm</button>` : ''}
        ${b.status !== 'off' ? `<button class="mini-btn danger" data-act="off">Cancel</button>` : ''}
        <button class="mini-btn nav" data-act="edit">Edit</button>
      </td></tr>`;
  }).join('') || `<tr><td colspan="7" style="text-align:center;color:#9aa3cc">No bookings yet</td></tr>`;
}
render();

const bg = document.getElementById('modal-bg');
let editingId = null;

document.getElementById('rows').addEventListener('click', e => {
  const act = e.target.dataset.act;
  if (!act) return;
  const id = e.target.closest('tr').dataset.id;
  if (act === 'ok' || act === 'off') { LT.updateBooking(id, { status: act }); render(); return; }
  if (act === 'edit') {
    const b = LT.listBookings().find(x => x.id === id);
    editingId = id;
    document.getElementById('m-nights').value = b.nights;
    document.getElementById('m-total').value = b.total;
    bg.classList.add('show');
  }
});
document.getElementById('m-cancel').addEventListener('click', () => bg.classList.remove('show'));
document.getElementById('m-save').addEventListener('click', () => {
  LT.updateBooking(editingId, {
    nights: parseInt(document.getElementById('m-nights').value) || 1,
    total: parseFloat(document.getElementById('m-total').value) || 0
  });
  bg.classList.remove('show');
  render();
});

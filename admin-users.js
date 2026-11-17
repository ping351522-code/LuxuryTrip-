/* admin-users.js : user list ပြတာ + balance/points/status ပြင်တာ
   admin က balance/points ပြင်လိုက်ရင် user ဘက်က account.html ပြန်ဖွင့်ရင်
   အသစ်ချက်ချင်းမြင်ရမယ် (data တစ်ခုတည်းကို share သုံးနေလို့) */
function render() {
  document.getElementById('rows').innerHTML = LT.listUsers().map(u => `
    <tr>
      <td>${u.name}</td><td>${u.email}</td>
      <td><span class="tag ${u.status}">${u.status === 'active' ? 'Active' : 'Suspended'}</span></td>
      <td>$${u.balance.toFixed(2)}</td><td>${u.points}</td>
      <td>${new Date(u.createdAt).toLocaleDateString()}</td>
      <td><button class="mini-btn nav" data-edit="${u.id}">Edit</button></td>
    </tr>`).join('') || `<tr><td colspan="7" style="text-align:center;color:#9aa3cc">No users yet</td></tr>`;
}
render();

const bg = document.getElementById('modal-bg');
let editingId = null;
document.getElementById('rows').addEventListener('click', e => {
  const id = e.target.dataset.edit;
  if (!id) return;
  const u = LT.getUser(id);
  editingId = id;
  document.getElementById('m-name').value = u.name;
  document.getElementById('m-balance').value = u.balance;
  document.getElementById('m-points').value = u.points;
  document.getElementById('m-status').value = u.status;
  bg.classList.add('show');
});
document.getElementById('m-cancel').addEventListener('click', () => bg.classList.remove('show'));
document.getElementById('m-save').addEventListener('click', () => {
  LT.updateUser(editingId, {
    balance: parseFloat(document.getElementById('m-balance').value) || 0,
    points: parseInt(document.getElementById('m-points').value) || 0,
    status: document.getElementById('m-status').value
  });
  bg.classList.remove('show');
  render();
});

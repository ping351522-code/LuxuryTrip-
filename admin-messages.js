/* admin-messages.js : user-side messages.html နဲ့ data share လုပ်ပြီး chat လုပ်တယ် */
let activeId = null;

function renderConvList() {
  const convs = LT.listConversations();
  document.getElementById('conv-list').innerHTML = convs.map(c => `
    <div class="conv ${c.userId === activeId ? 'on' : ''}" data-id="${c.userId}">
      <b>${c.name}</b><span>${c.last ? c.last.text.slice(0, 26) : 'No messages yet'}</span>
    </div>`).join('') || `<p style="padding:16px;color:#9aa3cc;font-size:13px">No conversations yet</p>`;
  if (!activeId && convs[0]) activeId = convs[0].userId;
}
function renderMsgs() {
  if (!activeId) { document.getElementById('msgs').innerHTML = ''; return; }
  document.getElementById('msgs').innerHTML = LT.listMessages(activeId).map(m =>
    `<div class="msg ${m.from}">${m.text}</div>`).join('');
  document.getElementById('msgs').scrollTop = 9999;
}
renderConvList(); renderMsgs();

document.getElementById('conv-list').addEventListener('click', e => {
  const id = e.target.closest('.conv')?.dataset.id;
  if (!id) return;
  activeId = id; renderConvList(); renderMsgs();
});
document.getElementById('send').addEventListener('click', () => {
  const t = document.getElementById('text');
  if (!t.value.trim() || !activeId) return;
  LT.sendMessage(activeId, 'admin', t.value.trim());
  t.value = '';
  renderMsgs(); renderConvList();
});
document.getElementById('text').addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('send').click(); });

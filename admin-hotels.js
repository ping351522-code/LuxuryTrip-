/* admin-hotels.js : ဟိုတယ်စာရင်း ပြင်တာ (localStorage ထဲ ثsaved, home.html နဲ့ မချိတ်သေးပါ —
   home.html ကို dynamic ပြောင်းချင်ရင် ဒီ key 'lt_hotels' ကို ဖတ်အောင် ပြင်ဖို့ လိုပါမယ်) */
const KEY = 'lt_hotels_v1';
function load() {
  try { const v = JSON.parse(localStorage.getItem(KEY)); if (v) return v; } catch {}
  const def = [
    { name: 'Sule Shangri-La Yangon', place: 'Yangon, Myanmar', price: 120, rating: 4.8 },
    { name: 'Mandarin Oriental Bangkok', place: 'Bangkok, Thailand', price: 210, rating: 4.9 },
    { name: 'Marina Bay Sands', place: 'Singapore', price: 320, rating: 4.7 }
  ];
  localStorage.setItem(KEY, JSON.stringify(def));
  return def;
}
function save(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
let hotels = load();

function render() {
  document.getElementById('rows').innerHTML = hotels.map((h, i) => `
    <tr>
      <td><input class="cell" style="width:160px" value="${h.name}" data-i="${i}" data-k="name"></td>
      <td><input class="cell" style="width:130px" value="${h.place}" data-i="${i}" data-k="place"></td>
      <td>$<input class="cell" type="number" value="${h.price}" data-i="${i}" data-k="price"></td>
      <td><input class="cell" style="width:60px" type="number" step="0.1" value="${h.rating}" data-i="${i}" data-k="rating"></td>
      <td><button class="mini-btn danger" data-del="${i}">Remove</button></td>
    </tr>`).join('');
}
render();

document.getElementById('rows').addEventListener('change', e => {
  const i = e.target.dataset.i, k = e.target.dataset.k;
  if (i === undefined) return;
  hotels[i][k] = k === 'price' || k === 'rating' ? parseFloat(e.target.value) : e.target.value;
  save(hotels);
});
document.getElementById('rows').addEventListener('click', e => {
  if (e.target.dataset.del === undefined) return;
  hotels.splice(e.target.dataset.del, 1);
  save(hotels); render();
});
document.getElementById('add').addEventListener('click', () => {
  hotels.push({ name: 'New Hotel', place: 'City, Country', price: 100, rating: 4.5 });
  save(hotels); render();
});

/* packages.js : category chip နဲ့ filter */
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.pkg');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  const cat = chip.dataset.cat;
  let shown = 0;
  cards.forEach(c => { const ok = cat === 'all' || c.dataset.cat === cat; c.style.display = ok ? '' : 'none'; shown += ok; });
  document.getElementById('empty').style.display = shown ? 'none' : 'block';
}));

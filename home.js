/* home.js : Home စာမျက်နှာ - hero dots */
const dots = [...document.querySelectorAll('.hero .dots i')];
let n = 0;
const show = i => { n = i; dots.forEach((d, k) => d.classList.toggle('on', k === i)); };
dots.forEach((d, i) => d.addEventListener('click', () => show(i)));
setInterval(() => show((n + 1) % dots.length), 4000);

/* login ဝင်/မဝင် အလိုက် ထိပ်က avatar ကို account/login ဆီ ညွှန်းအောင် */
const avatarLink = document.querySelector('.avatar');
if (avatarLink && window.LT) {
  avatarLink.setAttribute('href', LT.currentUser() ? 'account.html' : 'login.html');
}

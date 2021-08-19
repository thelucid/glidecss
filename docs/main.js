import './main.scss'

// Dark mode
const isDark = () => localStorage.theme === 'dark' || (
  !('theme' in localStorage) &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
);

document.querySelector('[data-mode=toggle]').addEventListener('click', (event) => {
  localStorage.theme = isDark() ? 'light' : 'dark';
  document.documentElement.classList.toggle('dark', isDark());
});

// Anchors
const links = document.querySelectorAll('[href^="#"]');
const headings = document.querySelectorAll('h2[id], h3[id]');

function currents() {
  let index = headings.length;
  while(--index && window.scrollY + 32 < headings[index].offsetTop) {}
  links.forEach(link => link.classList.remove('is-current'));
  links[index].classList.add('is-current');
}

let redraw = null;

window.addEventListener('scroll', event => {
  if (redraw) return;

  redraw = requestAnimationFrame(() => {
    currents();
    cancelAnimationFrame(redraw);
    redraw = null;
  });
});

currents();
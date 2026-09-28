const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const paletteBackdrop = document.getElementById('palette-backdrop');
const openPaletteButton = document.getElementById('open-palette');

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('vaibhav-theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☼' : '☾';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#f1eee7');
}

setTheme(localStorage.getItem('vaibhav-theme') || 'dark');
themeToggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

function goTo(id) {
  if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' });
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => goTo(button.dataset.scroll));
});

function openPalette() { paletteBackdrop.hidden = false; }
function closePalette() { paletteBackdrop.hidden = true; }
openPaletteButton.addEventListener('click', openPalette);
paletteBackdrop.addEventListener('click', (event) => { if (event.target === paletteBackdrop) closePalette(); });

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    paletteBackdrop.hidden ? openPalette() : closePalette();
  }
  if (event.key === 'Escape') closePalette();
});

document.querySelectorAll('[data-command]').forEach((button) => {
  button.addEventListener('click', () => {
    const command = button.dataset.command;
    closePalette();
    if (['about', 'projects', 'opensource', 'stack', 'contact'].includes(command)) goTo(command);
    if (command === 'github') window.open('https://github.com/Vaibh37', '_blank', 'noopener,noreferrer');
    if (command === 'x') window.open('https://x.com/AkagamiRust37', '_blank', 'noopener,noreferrer');
    if (command === 'theme') setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  });
});

function updateClock() {
  const value = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date());
  document.getElementById('ist-clock').textContent = `${value} IST`;
}
updateClock();
setInterval(updateClock, 30000);

fetch('https://api.github.com/users/Vaibh37')
  .then((response) => response.ok ? response.json() : Promise.reject())
  .then((user) => {
    document.getElementById('repo-count').textContent = user.public_repos ?? '—';
    document.getElementById('follower-count').textContent = user.followers ?? '—';
  })
  .catch(() => {});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-on-scroll').forEach((element) => observer.observe(element));

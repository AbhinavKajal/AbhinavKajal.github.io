
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

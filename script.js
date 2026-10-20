const areaFilter = document.getElementById('areaFilter');
const budgetFilter = document.getElementById('budgetFilter');
const searchButton = document.getElementById('searchButton');
const staysGrid = document.getElementById('staysGrid');
const noResults = document.getElementById('noResults');
const quickChips = document.querySelectorAll('[data-quick]');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function filterStays(areaOverride) {
  const area = areaOverride || areaFilter.value;
  const budget = budgetFilter.value === 'any' ? Infinity : Number(budgetFilter.value);
  let visible = 0;
  document.querySelectorAll('.stay-card').forEach(card => {
    const cardArea = card.dataset.area;
    const price = Number(card.dataset.price);
    const matchesArea = area === 'all' || (area === 'budget' ? price <= 1500 : cardArea === area);
    const matchesBudget = price <= budget;
    const show = matchesArea && matchesBudget;
    card.hidden = !show;
    if (show) visible++;
  });
  noResults.hidden = visible > 0;
  quickChips.forEach(chip => chip.classList.toggle('active', chip.dataset.quick === area));
}
searchButton.addEventListener('click', () => {
  filterStays();
  document.getElementById('stays').scrollIntoView({ behavior: 'smooth' });
});
areaFilter.addEventListener('change', () => filterStays());
budgetFilter.addEventListener('change', () => filterStays());
quickChips.forEach(chip => chip.addEventListener('click', () => {
  areaFilter.value = chip.dataset.quick;
  filterStays(chip.dataset.quick);
}));
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

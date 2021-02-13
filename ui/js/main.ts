import './utils/snippets';

const setTheme = (theme: 'light' | 'dark', save = false) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);

  if (save) {
    localStorage.setItem('preferredTheme', theme);
  }
};

const getTheme = () => {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

const detectAndSetPreferredTheme = () => {
  let theme = localStorage.getItem('preferredTheme') as 'light' | 'dark';
  if (!theme) {
    theme = window.matchMedia?.('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  setTheme(theme);
};

const themeToggler = () => {
  document
    .querySelector('.theme-toggler')
    ?.addEventListener('click', (e: Event) => {
      e.preventDefault();

      const currentTheme = getTheme();
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      setTheme(newTheme, true);
    });
};

// An array of initialization functions called on DOMContentLoaded
const onDOMContentLoaded: ((e: Event) => void)[] = [
  detectAndSetPreferredTheme,
  themeToggler,
];

window.addEventListener(
  'DOMContentLoaded',
  (e: Event) => {
    onDOMContentLoaded.forEach((f) => f(e));
  },
  { passive: true },
);

import './utils/snippets';

const setTheme = (
  theme: 'light' | 'dark',
  options: { save?: boolean } = { save: false },
) => {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);

  if (options.save) {
    localStorage.setItem('preferredTheme', theme);
  }
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

const deprivitizeMyEmail = () => {
  // I made zero effort to hide this, but please don't spam me
  const email = atob('bWFyc2hhbGRoYXllc0BnbWFpbC5jb20=');

  const handleEvent = (e: Event) => {
    const target = e.target as HTMLElement;
    if (!target.matches('.email-me')) {
      return;
    }

    const href = target.getAttribute('href');

    if (!href || href === '#') {
      e.preventDefault();

      const a = document.createElement('a');

      a.href = `mailto:${email}`;
      a.click();
      a.remove();
    }
  };

  document.documentElement.addEventListener('click', handleEvent);
};

// An array of initialization functions called on DOMContentLoaded
const onDOMContentLoaded: ((e: Event) => void)[] = [
  detectAndSetPreferredTheme,
  deprivitizeMyEmail,
];

window.addEventListener(
  'DOMContentLoaded',
  (e: Event) => {
    onDOMContentLoaded.forEach((f) => f(e));
  },
  { passive: true },
);

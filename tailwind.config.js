module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{tsx,css}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

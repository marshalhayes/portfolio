module.exports = {
  purge: ['./ui/views/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'tiffany-blue': '#07beb8',
        charcoal: '#2f4858',
        'sizzling-red': '#f05d5e',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};

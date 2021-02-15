const plugins = {
  tailwindcss: {},
  autoprefixer: {},
};

const prodPlugins = {
  cssnano: {
    preset: 'default',
  },
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(plugins, { ...plugins, ...prodPlugins });
}

module.exports = {
  plugins,
};

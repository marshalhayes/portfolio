/* eslint-disable @typescript-eslint/no-var-requires */
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourceMaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

function build() {
  return src('ui/styles/main.scss')
    .pipe(sourceMaps.init())
    .pipe(
      sass({
        outputStyle:
          process.env.NODE_ENV === 'production' ? 'compressed' : 'expanded',
      }).on('error', sass.logError),
    )
    .pipe(
      cleanCSS({
        inline: ['local'],
      }),
    )
    .pipe(
      rename({
        basename: 'main',
        suffix: '.bundle',
      }),
    )
    .pipe(sourceMaps.write('.'))
    .pipe(dest('public/css'));
}

module.exports = {
  default: build,
  build,
};

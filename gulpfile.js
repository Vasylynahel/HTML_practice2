const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Шляхи
const paths = {
  html: './*.html',
  scss: './scss/**/*.scss',
  js: './js/**/*.js',
};

// Компіляція SCSS
function scssTask() {
  return src(paths.scss)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(concat('style.min.css'))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream());
}

// Копіювання JS
function jsTask() {
  return src(paths.js)
    .pipe(concat('script.min.js'))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
}

// BrowserSync
function serveTask() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
  watch(paths.scss, scssTask);
  watch(paths.js, jsTask);
  watch(paths.html).on('change', browserSync.reload);
}

// Експортуємо задачі
exports.default = series(scssTask, jsTask, serveTask);

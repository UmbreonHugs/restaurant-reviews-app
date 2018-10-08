// load the gulp
'use strict';

const gulp = require('gulp');
// build tools
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


 const browserSync = require('browser-sync').create();
// SASS
gulp.task('styles', function () {
  return gulp.src('src/scss/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({ "bundleExec": true }))
    .pipe(gulp.dest('dist/css/'));
});
// update html
gulp.task('html', function(done) {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));
    done();
})
// update javascript
gulp.task('js', function(done) {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js/'));
  done();
})
// watch the files for changes
gulp.task('watch', function (done) {
  gulp.watch('src/scss/*.scss', ['styles', 'html']);
  gulp.watch('src/*.html', ["html"]);
  gulp.watch('src/js/*.js', ["js"]);
  gulp.watch('dist/js/*.js').on('change', browserSync.reload);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
  gulp.watch('dist/css/*.css').on('change', browserSync.reload);
    browserSync.init({
    server: "./dist",
    port: 8000
  });
  done();
});

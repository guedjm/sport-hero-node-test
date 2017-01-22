var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('default', function () {
  console.log('Default task');
});

gulp.task('lint', function () {
  return gulp.src(['./*.js', './src/*.js', './test/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

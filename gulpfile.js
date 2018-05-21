const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')
const watch = require('gulp-watch')
const plumber = require('gulp-plumber');

gulp.task('css', function() {
  gulp.src(['css/*.scss', 'css/!global.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'))

  gulp.src('css/global.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('global.min.css'))
    .pipe(gulp.dest('css'))

  gulp.src('css/themes/dirtdiglett/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css/themes/dirtdiglett'))
})

gulp.task('dev', function() {
  return watch('css/**/*.scss', function() {
    gulp.start('css')
  })
})

const gulp = require('gulp')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso')
const plumber = require('gulp-plumber')

function css() {
  gulp
    .src('css/main.scss',)
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css'))

  return gulp
    .src('css/themes/dirtdiglett/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css/themes/dirtdiglett'))
}

gulp.task('css', css)

gulp.task('dev', function() {
  gulp.watch('css/**/*.scss', css)
})

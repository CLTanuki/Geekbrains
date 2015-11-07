var gulp = require('gulp');
var sass = require('gulp-sass');
var nunjucksRender = require('gulp-nunjucks-render');

var paths = {
    dest: 'build',
    templates: ['src/**/*.html'],
    styles: ['src/**/*.scss']
};

gulp.task('html', function() {
  nunjucksRender.nunjucks.configure(['build/templates/']);
  // Gets .html and .nunjucks files in pages
  return gulp.src(paths.templates)
  .pipe(nunjucksRender())
  .pipe(gulp.dest(paths.dest))
});

gulp.task('css', function () {
    return gulp.src(paths.styles)
        .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['html', 'css'], function () {
    gulp.watch(paths.templates, ['html']);
    gulp.watch(paths.styles, ['css']);
});
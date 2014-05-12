var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var package = require('./package.json');

var paths = {};
paths.scripts = "./src/scripts";
paths.styles = "./src/styles";
paths.html = "./src";
paths.dist = "./dist";

var sass = require('gulp-sass')

gulp.task('styles', function () {
    gulp.src(paths.styles + '/scss/main.scss')
        .pipe(sass())
        .pipe(connect.reload())
        .pipe(rename(package.name + '-' + package.version + '.css'))
        .pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts + '/app.js', {read: false})
    .pipe(browserify({ 
        insertGlobals : false, 
        transform: ['reactify'],
        compress: true
    }))
    .pipe(uglify())
    .pipe(rename(package.name + '-' + package.version + '.js'))
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts + "/*", ['scripts']);
    gulp.watch(paths.html + "/*.html", ['html']);
    gulp.watch(paths.styles + "/**/*", ['styles']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('build', ['scripts', 'styles', 'html']);
gulp.task('default', ['build', 'connect', 'watch']);

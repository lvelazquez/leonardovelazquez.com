// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
//var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
/*gulp.task('sass', function() {
 return gulp.src('scss/*.scss')
 .pipe(sass())
 .pipe(gulp.dest('css'));
 });*/

var aMain = [
    "dev/models/project.js",
    "dev/models/contact.js",
    "dev/views/projectViews.js",
    "dev/views/contactView.js",
    "dev/main.js"];

// Concatenate & Minify main JS
gulp.task('scripts', function () {
    return gulp.src(aMain)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

var aLib = [
    "dev/lib/jquery.min.js",
    "dev/lib/jquery.lazyload.min.js",
    "dev/lib/jquery.scrollstop.min.js",
    "dev/lib/modernizr.custom.65236.js",
    "dev/lib/easing/EasePack.min.js",
    "dev/lib/TweenMax.min.js",
    "dev/lib/handlebars-v1.3.0.js",
    "dev/lib/bootstrap.min.js",
    "dev/lib/underscore-min.js",
    "dev/lib/backbone-min.js",
    "dev/lib/bowser.min.js",
    "dev/lib/plugins.js"
    ];

// Concatenate & Minify lib JS
gulp.task('lib', function () {
    return gulp.src(aLib)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('public/js'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('dev/*.js', ['lint', 'scripts']);
    gulp.watch('dev/models/*.js', ['lint', 'scripts']);
    gulp.watch('dev/views/*.js', ['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', [ 'scripts', 'watch']); // 'sass','lint', 'lib',
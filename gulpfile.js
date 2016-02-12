// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function () {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var aMain = [
    "dev/data/data.js",
    "dev/helpers.js",
    "dev/models/project.js",
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
    "node_modules/underscore/underscore-min.js",
    "node_modules/backbone/backbone-min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/jquery-lazyload/jquery.lazyload.min.js",
    "node_modules/jquery-scrollstop/jquery.scrollstop.min.js",
   // "dev/lib/modernizr.custom.65236.js",
    "node_modules/gsap/src/minified/EasePack.min.js",
    "node_modules/gsap/src/minified/TweenMax.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/bowser/bowser.min.js"
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
gulp.task('default', ['scripts', 'watch']); // 'sass','lint', 'lib',
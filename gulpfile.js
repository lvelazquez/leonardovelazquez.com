// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

gulp.task('styles', function() {
   return gulp.src('dev/sass/main.scss')
       .pipe(sass())
       .pipe(concat('main.css'))
       .pipe(gulp.dest('public/css'));
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

var aMain = [
    // TODO remove data from build make into json
    "dev/data/data.js",
    "dev/js/utils/helpers.js",
    "dev/js/models/project.js",
    "dev/js/models/contact.js",
    "dev/js/views/projectViews.js",
    "dev/js/views/contactView.js",
    "dev/js/main.js",
    "dev/js/utils/googlemap.js"];

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
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/handlebars/dist/handlebars.js",
    "node_modules/backbone/backbone-min.js",
    "node_modules/jquery-lazyload/jquery.lazyload.js",
    "node_modules/jquery-scrollstop/jquery.scrollstop.min.js",
    //65236
    "dev/js/lib/modernizr.custom.js",
    "node_modules/gsap/src/minified/EasePack.min.js",
    "node_modules/gsap/src/minified/TweenMax.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "node_modules/bowser/bowser.min.js"
    ];

// Concatenate & Minify lib JS
gulp.task('lib', function () {
    return gulp.src(aLib)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('dev/**/*.js', ['lint', 'scripts']);
    gulp.watch('dev/sass/*.scss', ['styles']);
});

// Default Task
gulp.task('default', ['styles', 'scripts', 'watch']); // 'sass','lint', 'lib',
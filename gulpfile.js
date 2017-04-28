// Simple Tempate - Made By Eon - All rights reserved
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceSting: /\bgulp[\-.]/
});

var reload  = browserSync.reload;

// Js
// Concat + Minifiy Js Files and move to vendor folder
var jsFiles = ['Content/SimpleTemplate/js/plugins/*.js'];
var jsDest = 'Scripts/';

gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(plugins.order([
            'jquery.min.js',
            'bootstrap.min.js',
            'imagesloaded.pkgd.min.js',
            '*.js',
        ]))
        .pipe(plugins.concat('plugins.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(plugins.rename({ suffix:'.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDest));
});

// Concat + Minify modernizer.js file
var jsFiles = 'Content/SimpleTemplate/js/modernizr.js';
var jsDest = 'Scripts/';

gulp.task('js-modernizer', function () {
    return gulp.src(jsFiles)
        .pipe(plugins.order([
            'jquery.min.js',
            'bootstrap.min.js',
            'imagesloaded.pkgd.min.js',
            '*.js',
        ]))
        .pipe(plugins.concat('plugins.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(jsDest));
});

// Css
// Concat + Minifiy Css Files and move to vendor folder
var cssFiles = 'Content/SimpleTemplate/css/plugins/*.css';
var cssDest = 'Styles/css/';

gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(plugins.order([
            'bootstrap.css',
            '*.css'
        ]))
        .pipe(plugins.concat('plugins.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(plugins.rename({ suffix:'.min' }))
        .pipe(plugins.cssmin({keepBreaks: true, keepSpecialComments : '*' }))
        .pipe(gulp.dest(cssDest));
});

// Sass
var sassFile = 'Content/SimpleTemplate/sass/style.scss';
var sassDest = 'Styles/scss/';
gulp.task('sass', function () {
    return gulp.src(sassFile)
        .pipe(plugins.sass({outputStyle: 'expanded'})) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(sassDest));
});

// Custom Saas
var sassFile = 'Styles/sass/general.scss';
var sassDest = 'Styles/sass/';
gulp.task('customSass', function () {
    return gulp.src(sassFile)
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(sassDest));
});

// Sass index-event file
var sassFile = 'Content/SimpleTemplate/sass/homepages/index-event.scss';
var sassDest = 'Styles/sass/';
gulp.task('sass-index-event', function () {
    return gulp.src(sassFile)
        .pipe(plugins.sass({ outputStyle: 'expanded' })) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(sassDest));
});

// Sass home pages
gulp.task('sassHome', function () {
    return gulp.src('Content/SimpleTemplate/sass/homepages/*.scss')
        .pipe(plugins.sass({outputStyle: 'expanded'}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest('Content/SimpleTemplate/css/homepages/'));
});

// Sass Skins files/folder
gulp.task('skins', function () {
    return gulp.src('Content/SimpleTemplate/sass/theme-skins/*.scss')
        .pipe(plugins.sass({outputStyle: 'expanded'}))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest('Content/SimpleTemplate/css/theme-skins/'));
});

// call - gulp htmlmin
// Html files minify 
// this will make your html files minified 
// make sure to copy all html files before using this
gulp.task('htmlmin', function () {
    return gulp.src('*.html')
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyJS: true, // minify js too
            minifyCSS: true // minify css too
        }))
        .pipe(gulp.dest(''))
});

// Images - Optimize jpeg and png images
gulp.task('imagemin', function () {
    return gulp.src('Content/SimpleTemplate/images/**/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('Content/SimpleTemplate/images'));
});


// This task will run css and js task 
// To concat all plugins folder int plugins.css or plugins.js
gulp.task('build', ['css', 'js'], function () {
    console.log('Created plugins files.');
});

// Sync - Livereload
gulp.task('browser-sync', ['sass', 'sassHome', 'skins'], function () {
    // Change simple with your project's folder name
    browserSync.init({
        proxy: "localhost/simple/"
    });

    // watch scss files
    gulp.watch(['Content/SimpleTemplate/sass/*.scss', 'Content/SimpleTemplate/sass/*/*.scss', '!Content/SimpleTemplate/theme-skins/'], ['sass', reload]);

    // watch scss files
    gulp.watch(['Content/SimpleTemplate/sass/homepages/*.scss'], ['sassHome', reload]);

    //Watch skins scss files
    gulp.watch(['Content/SimpleTemplate/sass/theme-skins/*.scss'], ['skins', reload]);

    gulp.watch([
        '*.html',
        '*.php',
        'Content/SimpleTemplate/js/main.js'
    ]).on('change', reload);
});

// Default Task
gulp.task('default', ['browser-sync']);
// Simple Tempate - Made By Eon - All rights reserved
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const watch = require("gulp-watch");
const batch = require("gulp-batch");

var plugins = require("gulp-load-plugins")({
    pattern: ["gulp-*", "gulp.*"],
    replaceSting: /\bgulp[\-.]/
});


// JS compilation
gulp.task("js-min-plugins", function () {
    return gulp.src([
        "NotDeployed/SimpleTemplate/js/modernizr.js",
        "NotDeployed/SimpleTemplate/js/plugins/owl.carousel.min.js"])
        .pipe(plugins.concat("plugins.js"))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("Scripts/"));
});

gulp.task("js-min-main", function () {
    return gulp.src([
        "Scripts/main.js"])
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("Scripts/"));
});

gulp.task("js-site-head-min", function () {
    return gulp.src([
        "Scripts/plugins.min.js",
        "Scripts/main.min.js"])
        .pipe(plugins.concat("site-head.js"))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest("Scripts/"));
});

// Css
// Concat + Minifiy Css Files and move to vendor folder
gulp.task("css-min-plugins", function () {
    return gulp.src([
        "NotDeployed/SimpleTemplate/css/plugins/vspacing.min.css"])
        .pipe(plugins.concat("plugins.css"))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.cssmin({ keepBreaks: true, keepSpecialComments: "*" }))
        .pipe(gulp.dest("Styles/"));
});

// Sass
gulp.task("sass-min-style", function () {
    return gulp.src("NotDeployed/SimpleTemplate/sass/style.scss")
        .pipe(plugins.sass({ outputStyle: "expanded" })) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ["last 2 versions", "ie 9"],
            cascade: false
        }))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.cssmin({ keepBreaks: true, keepSpecialComments: "*" }))
        .pipe(gulp.dest("Styles/"));
});


// Sass index-event file
gulp.task("sass-index-event", function () {
    return gulp.src("NotDeployed/SimpleTemplate/sass/homepages/index-event.scss")
        .pipe(plugins.sass({ outputStyle: "expanded" })) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ["last 2 versions", "ie 9"],
            cascade: false
        }))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.cssmin({ keepBreaks: true, keepSpecialComments: "*" }))
        .pipe(gulp.dest("Styles/"));
});

// Custom-style scss file
gulp.task("sass-custom-style", function () {
    return gulp.src("Styles/custom-style.scss")
        .pipe(plugins.sass({ outputStyle: "expanded" })) // expanded - compressed - compact - nested
        .pipe(plugins.autoprefixer({
            browsers: ["last 2 versions", "ie 9"],
            cascade: false
        }))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.cssmin({ keepBreaks: true, keepSpecialComments: "*" }))
        .pipe(gulp.dest("Styles/"));
});

gulp.task("css-site-min", function () {
    return gulp.src([
        "Styles/plugins.min.css",
        "Styles/style.min.css",
        "Styles/index-event.min.css",
        "Styles/custom-style.min.css"])
        .pipe(plugins.autoprefixer({
            browsers: ["last 2 versions", "ie 9"]
        }))
        .pipe(plugins.concat("site.css"))
        .pipe(plugins.rename({ suffix: ".min" }))
        .pipe(plugins.cssmin({ keepBreaks: true, keepSpecialComments: "*" }))
        .pipe(gulp.dest("Styles/"));
});

// Watcher task.
gulp.task("watch", function () {
    watch("Scripts/main.js", batch(function (events, done) {
        gulp.start("js-min-main", done);
        gulp.start("js-site-head-min", done);
    }));

    watch("Styles/custom-style.scss", batch(function (events, done) {
        gulp.start("sass-custom-style", done);
        gulp.start("css-site-min", done);
    }));
});
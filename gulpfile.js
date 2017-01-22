
var gulp = require('gulp'); // import gulp module
var browserSync = require('browser-sync').create(); // auto sync browser
var autoprefixer = require('gulp-autoprefixer'); // browser prefixer adding
var cssnano = require('gulp-cssnano'); // minify css
var plumber = require('gulp-plumber'); // error hiding
var concat = require('gulp-concat'); // merge files to make one
 

// Browser-sync task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
        	baseDir: './dist' // where files will go
        }
    });
});

// HTML tasks
gulp.task('html', function() {
    return gulp.src('./src/*.html') // get all html files
    .pipe(plumber()) // hide errors
    .pipe(gulp.dest('./dist')) // move then to dist folder
    .pipe(browserSync.reload({stream: true})); // reload browser
});

// css tasks
gulp.task('css', function() {
	var cssStream = gulp.src('./src/styles/css/*.css'); // get all css files

    return cssStream
    .pipe(plumber()) // hide errors
    .pipe(concat('style.css')) // put them all together in one file called s // add browser prefixestyle.css
    .pipe(autoprefixer('last 2 versions')) // add browser prefixes
    .pipe(cssnano()) // minify file
    .pipe(gulp.dest('./dist/')) // add to dist folder
    .pipe(browserSync.reload({stream:true})); // reload browser

});


// Watch tasks
gulp.watch('./src/*.html', ['html']); // watch all html files in this folder - changes trigger html task
gulp.watch('./src/styles/css/*.css', ['css']); // watch all css files in this folder - changes trigger css task


// task to run on start up - run each task then run browser synv
gulp.task('default', ['html', 'css', 'browser-sync']);
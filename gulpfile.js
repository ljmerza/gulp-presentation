
var gulp = require('gulp'); // import gulp module
var browserSync = require('browser-sync').create(); // auto sync browser
var autoprefixer = require('gulp-autoprefixer'); // browser prefixer adding
var cssnano = require('gulp-cssnano'); // minify css
var plumber = require('gulp-plumber'); // error hiding
var concat = require('gulp-concat'); // merge files to make one
var sass = require('gulp-sass') // import sass compiler
var merge = require('merge-stream'); // merge streams
var sourcemaps = require('gulp-sourcemaps'); // generate source maps of sass
var notify = require('gulp-notify'); // notification messages
 

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
    .pipe(browserSync.reload({stream: true})) // reload browser
    .pipe(notify({ message: 'html build done' }));
});

// css tasks
gulp.task('css', function() {
	var cssStream = gulp.src('./src/styles/css/*.css'); // get all css files
	var sassStream = gulp.src('./src/styles/sass/*.sass') // get all sass files
		.pipe(sass().on('error', sass.logError)); 	// to combine sass and css we need to convert sass to css first

    return merge(sassStream, cssStream)
    	.pipe(plumber()) // hide errors
    	.pipe(sourcemaps.init()) // start source maps
    	.pipe(concat('style.css')) // put them all together in one file called s // add browser prefixestyle.css
    	.pipe(autoprefixer('last 2 versions')) // add browser prefixes
    	.pipe(cssnano()) // minify file
    	.pipe(sourcemaps.write('./dist/')) // generate source maps
    	.pipe(gulp.dest('./dist/')) // add to dist folder
    	.pipe(browserSync.reload({stream:true})) // reload browser
    	.pipe(notify({ message: 'css build done' }));

});


// Watch tasks
gulp.watch('./src/*.html', ['html']); // watch all html files in this folder - changes trigger html task
gulp.watch('./src/styles/**/*.*', ['css']); // watch all files in all folders this folder - changes trigger css task


// task to run on start up - run each task then run browser synv
gulp.task('default', ['html', 'css', 'browser-sync']);
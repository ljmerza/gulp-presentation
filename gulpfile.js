
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
var uglify = require('gulp-uglify'); // minify js
var babel = require('gulp-babel'); // js complier
var del = require('del'); // delete dist files
var inject = require('gulp-inject'); // inject css/js links into html
 

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
	var sources = gulp.src(['./dist/*.js', './dist/*.css'], {read: false}); // get injection sources
	var target = gulp.src('./src/*.html') // get all html files

	return target
	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // capture errors

    .pipe(inject(sources, {ignorePath: 'dist/'})) // inject css/js files into html - drop dist/ path from links
    .pipe(gulp.dest('./dist')) // move then to dist folder
    .pipe(browserSync.reload({stream: true})) // reload browser
    .pipe(notify({ message: 'HTML build done.', onLast: true })); // notify me only on the last stream
});

// css tasks
gulp.task('css', function() {
	var cssStream = gulp.src('./src/styles/css/**/*.css'); // get all css files
	var sassStream = gulp.src('./src/styles/sass/**/*.sass') // get all sass files
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // capture errors
		.pipe(sass().on('error', sass.logError)); 	// to combine sass and css we need to convert sass to css first

    return merge(sassStream, cssStream)
    	.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")})) // capture errors
    	.pipe(sourcemaps.init()) // start source maps
    	.pipe(concat('style.css')) // put them all together in one file called s // add browser prefixestyle.css
    	.pipe(autoprefixer('last 2 versions')) // add browser prefixes
    	.pipe(cssnano()) // minify file
    	.pipe(sourcemaps.write('./')) // generate source maps
    	.pipe(gulp.dest('./dist')) // add to dist folder
    	.pipe(browserSync.reload({stream:true})) // reload browser
    	.pipe(notify({ message: 'CSS build done.', onLast: true })); // notify me only on the last stream

});

// Javascript tasks
gulp.task('javascript', function() {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './src/scripts/**/*.js'
        ])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))  // capture errors
    .pipe(sourcemaps.init()) // start source maps
    .pipe(babel({
        presets: ['es2015']
    })) // babel conversion and error checking
    .pipe(concat('script.js')) // conact all files int one file
    .pipe(uglify()) // minify js
    .pipe(sourcemaps.write('./')) // generate source maps
    .pipe(gulp.dest('./dist')) // add to dist folder
    .pipe(browserSync.reload({stream:true})) // reload browser
    .pipe(notify({ message: 'JavaScript build done.', onLast: true })); // notify me only on the last stream
});


// images tasks
gulp.task('images', function(done) {
	done();
});


// clean out dist folder
gulp.task('clean', function() {
	return del(['./dist/**']); // clean dist folder and tell gulp you're done
});


// watch task
gulp.task('watch', function() {
	gulp.watch('./src/*.html', gulp.series('html')); // watch all html files in this folder - changes trigger html task
	gulp.watch('./src/styles/**/*.*', gulp.series('css')); // watch all files in all folders this folder - changes trigger css task
	gulp.watch('./src/javascript/**/*.js', gulp.series('javascript')); // watch all files in all folders this folder - changes trigger javascript task
	gulp.watch('./src/images/**/*.*', gulp.series('images')); // watch all files in all folders this folder - changes trigger images task
});


// task to run on start up - run each task then run browser synv
gulp.task('default', gulp.series('clean', gulp.parallel('css', 'javascript', 'images'), 'html', gulp.parallel('browser-sync', 'watch')));
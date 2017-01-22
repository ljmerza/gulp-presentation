
var gulp = require('gulp');
var browserSync = require('browser-sync').create();


// Browser-sync task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
        	baseDir: './dist'
        }
    });
});

// HTML tasks
gulp.task('html', function() {
    return gulp.src('./src/*.html') // get source files
    .pipe(gulp.dest('./dist')) // move then to dist folder
    .pipe(browserSync.reload({stream: true})); // reload browser
});


// Watch tasks
gulp.watch('./src/*.html', ['html']);


// tasks to run on start up
gulp.task('default', ['html', 'browser-sync']);
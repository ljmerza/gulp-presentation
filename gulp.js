
var gulp = require('gulp');
var browserSync = require('browser-sync').create();



// Browser-sync task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: '/dist'
    })
});

// HTML tasks
gulp.task('html', function() {
	// get source files
    return gulp.src('./src/*.html')
    // move then to dist folder
    .pipe(gulp.dest('./dist/')
    // reload browser
    .pipe(browserSync.reload); 
});


// Watch tasks
gulp.watch('./src/*.html', ['html']);
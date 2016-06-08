var gulp = require('gulp');
var sass = require("gulp-ruby-sass");
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

gulp.task('serve',['sass'],function(){
	browserSync.init({
        server: "./"
    });
	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass',function(){
	return sass('./src/scss/pages/*.scss', {sourcemap: true})
		.on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: './src/scss'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream({match: './dist/css/*.css'}));
});


gulp.task('default', ['serve']);
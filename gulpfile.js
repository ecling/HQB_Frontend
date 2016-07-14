var gulp = require('gulp');
var sass = require("gulp-ruby-sass");
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');

gulp.task('serve',['sass'],function(){
	browserSync.init({
        server: "./"
    });
	gulp.watch("./src/scss/**/*.scss", ['sass']);
	gulp.watch("./*.html").on('change', reload);
    gulp.watch("./dist/js/*.js").on('change',reload);
});

gulp.task('sass',function(){
	return sass('./src/scss/pages/*.scss', {sourcemap: true})
		.on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: '../../src/scss/pages/'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);
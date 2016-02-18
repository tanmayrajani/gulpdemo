var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	csso = require('gulp-csso'),
	htmlmin = require('gulp-htmlmin'),
	newer = require('gulp-newer'),
	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('min', function () {
	return gulp.src('js/*.js')
		.pipe(newer('build/js'))
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

gulp.task('finecss', function () {
	gulp.src('css/*.css')
		.pipe(newer('build/css'))
		.pipe(csso())
		.pipe(gulp.dest('build/css'));
});

gulp.task('finehtml', function () {
	gulp.src('*.html')
		.pipe(newer('build'))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('images', function () {
	gulp.src('media/*.*')
		.pipe(newer('build/media'))
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('build/media'));
});

gulp.task('watch', function() {
	gulp.watch('js/*.js', ['min']);
	gulp.watch('css/*.css', ['finecss']);
	gulp.watch('*.html', ['finehtml']);
	gulp.watch('media/*.*', ['images']);
});

gulp.task('browser-sync',['watch'], function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});
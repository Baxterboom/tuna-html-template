const gulp = require('gulp');
const minify = require('gulp-uglify');

gulp.task("default", ["compress"])

gulp.task('compress', function() {
    gulp.src(['./dist/*.js'])
        .pipe(minify())
        .pipe(gulp.dest('./dist'))
});
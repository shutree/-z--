
let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('homepage',function(){
    return gulp.src(['src/sass/*.scss'])
    .pipe(sass({outputStyle:'compact'}).on('error',sass.logError))
    .pipe(gulp.dest('src/css/'))
});

gulp.task('auto',function(){
    gulp.watch('src/sass/*.scss',['homepage']);
})
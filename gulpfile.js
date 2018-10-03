var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean-css');

gulp.task('sass', function() {
    return gulp.src('app/scss/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
		.pipe(clean())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {   
    return gulp.src('app/js/scripts/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});

gulp.task('vendor', function() {   
    return gulp.src(['app/js/vendor/jquery-3.3.1.min.js', 'app/js/vendor/bootstrap.min.js'])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
});


gulp.task('pug', function() {
    return gulp.src('app/**/*.pug')
      .pipe(pug({          
          pretty: true
        }))
      .pipe(gulp.dest('app/html'))
      .pipe(browserSync.stream());
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: './app',
            proxy: 'localhost',
            index: 'html/views/pages/home.html'            
        }
    });

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    // gulp.watch('app/views/');
    gulp.watch("app/views/**/*.pug", ['pug']);
    gulp.watch("app/js/scripts/*.js", ['scripts']);
});

gulp.task('default', ['serve', 'scripts', 'vendor', 'pug']);

//gulp.task('default', ['clean', 'icons', 'serve','vendor','componentscript','kitchensink','pug']);

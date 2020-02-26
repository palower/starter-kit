var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean-css');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');
var merge = require('gulp-merge-json');

gulp.task('pug:data', function() {
    return gulp.src('app/src/data/*.json')
        .pipe(merge({
            fileName: 'data.json',
            edit: (json, file) => {
                // Extract the filename and strip the extension
                var filename = path.basename(file.path),
                    primaryKey = filename.replace(path.extname(filename), '');

                // Set the filename as the primary key for our JSON data
                var data = {};
                data[primaryKey.toUpperCase()] = json;

                return data;
            }
        }))
        .pipe(gulp.dest('app/content/data'));
});

gulp.task('sass', function() {
    return gulp.src('app/src/scss/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
		.pipe(clean())
        .pipe(gulp.dest('app/content/css'))
        .pipe(browserSync.stream());
});

gulp.task('kitchen-sass', function() {
    return gulp.src('app/src/scss/kitchen-sink.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
		.pipe(clean())
        .pipe(gulp.dest('app/content/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {   
    return gulp.src('app/src/js/scripts/*.js')
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/content/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/content/js'))
        .pipe(browserSync.stream());
});

gulp.task('kitchen-scripts', function() {   
    return gulp.src('app/src/js/kitchen-scripts.js')
        .pipe(plumber())
        .pipe(gulp.dest('app/content/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/content/js'))
        .pipe(browserSync.stream());
});


gulp.task('vendor', function() {   
    return gulp.src(['app/content/js/vendor/jquery-3.3.1.min.js', 'app/content/js/vendor/bootstrap.min.js'])
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('app/content/js'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('app/content/js'))
        .pipe(browserSync.stream());
});


gulp.task('pug',['pug:data'], function() {
    return gulp.src('app/src/**/*.pug')
    .pipe(data(function(){
        return JSON.parse(fs.readFileSync('app/content/data/data.json'))
    }))
      .pipe(pug({          
          pretty: true
        }))
      .pipe(gulp.dest('app/content/html'))
      .pipe(browserSync.stream());
});


gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: './app',
            proxy: 'localhost',
            index: 'content/html/views/pages/kitchen-sink.html'            
        }
    });

    gulp.watch('app/src/scss/**/*.scss', ['sass', 'kitchen-sass']);
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch("app/src/views/**/*.pug", ['pug']);
    gulp.watch("app/src/js/scripts/*.js", ['scripts']);
    gulp.watch("app/src/js/kitchen-scripts.js", ['kitchen-scripts']);
    gulp.watch("app/src/data/*.json", ['pug:data']);
});

gulp.task('default', ['serve', 'scripts', 'kitchen-scripts', 'vendor', 'pug', 'pug:data']);

//gulp.task('default', ['clean', 'icons', 'serve','vendor','componentscript','kitchensink','pug']);

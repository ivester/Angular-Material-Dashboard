var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./src",
    notify: false
  });

  gulp.watch("src/assets/styles/sass/*.scss", ['sass']);
  gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/assets/styles/sass/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("src/assets/styles/css"))
      .pipe(browserSync.stream());
});

// TODO No more dist folder in output - all flat please
// TODO Get only js files
// Get all main files from Bower
gulp.task('getMainFiles', function() {
  return gulp.src(mainBowerFiles(), { base: 'bower_components' })
    .pipe(gulp.dest('src/assets/js/vendor'))
});

gulp.task('default', ['getMainFiles', 'serve']);
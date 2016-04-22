var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'getMainFiles:scripts'], function() {
  browserSync.init({
    server: "./src",
    notify: false
  });

  gulp.watch("src/assets/styles/sass/*.scss", ['sass']);
  gulp.watch("./src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', ['getMainFiles:styles'], function() {
  var stream = gulp.src("src/assets/styles/sass/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("src/assets/styles/css"))
      .pipe(browserSync.stream());

  return stream;
});

// Get all js main files from Bower
gulp.task('getMainFiles:styles', function() {
  var stream = gulp.src(mainBowerFiles('**/*.scss'))
    .pipe(gulp.dest('src/assets/styles/sass/vendor'));

  return stream;
});

// Get all js main files from Bower
gulp.task('getMainFiles:scripts', function() {
  var stream = gulp.src(mainBowerFiles('**/*.js'))
    .pipe(gulp.dest('src/assets/js/vendor'));

  return stream;
});

gulp.task('default', ['serve']);
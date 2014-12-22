var browserify = require('browserify')
var calc = require('rework-calc')
var csso = require('gulp-csso')
var gulp = require('gulp')
var imprt = require('rework-import')
var reactify = require('reactify')
var rename = require('gulp-rename')
var rework = require('gulp-rework')
var rmComments = require('rework-comments')
var source = require('vinyl-source-stream')
var streamify = require('gulp-streamify')
var through = require('through2')
var uglify = require('gulp-uglify')
var vars = require('rework-vars')

function gulpToJson(f) {
  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file)
    }

    if (file.isBuffer()) {
      var exported = JSON.stringify(String(file.contents))
      file.contents = new Buffer(exported)
    }

    this.push(file)

    return callback()
  })
}

const paths = {
  css: ['modules/*.css']
}

gulp.task('compile', function () {
  return gulp.src('modules/lotus.css')
    .pipe(rework(imprt(), vars(), calc))
    .pipe(rename(function (path) {
      path.basename = 'lotus.min'
    }))
    .pipe(csso())
    .pipe(gulp.dest('./dist'))
})

gulp.task('json', function () {
  return gulp.src(paths.css)
    .pipe(rework(rmComments))
    .pipe(streamify(gulpToJson))
    .pipe(rename(function (path) {
      path.extname = '.json'
    }))
    .pipe(gulp.dest('./json'))
})

gulp.task('gh-pages', ['json'], function () {
  return browserify('./src/index.jsx')
    .transform(function (file) {
      return reactify(file, {
        harmony: true
      })
    })
    .bundle()
    .pipe(source('custom.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function () {
  gulp.watch(paths.css, ['compile'])
})

gulp.task('default', ['compile'])
gulp.task('all', ['compile', 'gh-pages'])

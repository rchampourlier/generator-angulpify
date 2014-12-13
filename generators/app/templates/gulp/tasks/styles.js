'use strict';

var gulp = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');<% if (includeLess) { %>
var less = require('gulp-less');<% } else if (includeSass) { %>
var sass = require('gulp-sass');<% } %><% if (includeLess || includeSass) { %>
var sourcemaps = require('gulp-sourcemaps');<% } %>

<% if (includeLess || includeSass) { %>
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
<% } %>

module.exports = gulp.task('styles', function () {
  return gulp.src(config.paths.src.styles)<% if (includeLess || includeSass) { %>
    .pipe(gulpif(!release, sourcemaps.init()))<% } %><% if (includeLess) { %>
    .pipe(less().on('error', handleError))<% } else if (includeSass) { %>
    .pipe(sass().on('error', handleError))<% } %>
    .pipe(autoprefixer('last 1 version'))
    .pipe(gulpif(release, csso()))<% if (includeLess || includeSass) { %>
    .pipe(gulpif(!release, sourcemaps.write()))<% } %>
    .pipe(gulpif(release, rename(config.filenames.release.styles), rename(config.filenames.build.styles)))
    .pipe(gulpif(release, gulp.dest(config.paths.dest.release.styles), gulp.dest(config.paths.dest.build.styles)));
});

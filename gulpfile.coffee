gulp = require "gulp"
gulpLoadPlugins = require "gulp-load-plugins"
{tsc, mocha} = gulpLoadPlugins()
browserify = require "browserify"
source = require "vinyl-source-stream"

gulp.task "compile", ->
  gulp.src "./test/*.ts"
    .pipe do tsc
    .pipe gulp.dest "./.tmp/"

gulp.task "build", ["compile"], ->
  browserify "./.tmp/src/siena.js", standalone: "Siena"
    .bundle()
    .pipe source "siena.js"
    .pipe gulp.dest "./"

gulp.task "test", ["build"], ->
  gulp.src "./.tmp/test/*.js"
    .pipe do mocha

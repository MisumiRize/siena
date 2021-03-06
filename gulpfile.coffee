gulp = require "gulp"
gulpLoadPlugins = require "gulp-load-plugins"
{tsc, mocha} = gulpLoadPlugins()
browserify = require "browserify"
source = require "vinyl-source-stream"
{API, Context, Options} = require "tsd"

gulp.task "definition", ->
  api = new API new Context
  api.readConfig().then () ->
    api.reinstall Options.fromJSON
      saveToConfig: true

gulp.task "compile", ["definition"], ->
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

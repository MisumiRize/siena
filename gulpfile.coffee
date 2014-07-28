gulp = require "gulp"
gulpLoadPlugins = require "gulp-load-plugins"
{tsc, mocha} = gulpLoadPlugins()

gulp.task "compile", ->
  gulp.src "./src/*.ts"
    .pipe tsc module: "amd"
    .pipe gulp.dest "./"

gulp.task "compile:test", ->
  gulp.src "./test/*.ts"
    .pipe do tsc
    .pipe gulp.dest "./.tmp/"

gulp.task "test", ["compile:test"], ->
  gulp.src "./.tmp/test/*.js"
    .pipe do mocha

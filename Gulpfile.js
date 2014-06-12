/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    notify = require('gulp-notify'); // takes advantage of growl for notifications

// Reference our app files for easy reference in out gulp tasks
var paths = {
  specs: ['./path/to/your/mocaha/specs'],
  uat: ['./uat/**/*.uat.js'],
  uatHelpers: ['./uat/helpers/*.js']
};

// run smoke tests
gulp.task('smokeTest', function(){
  gulp.src(paths.uat)
    .pipe(mocha({reporter: 'spec'}))
    .pipe(notify({message: "UAT complete"}));
});

// lint your js files
gulp.task('jshint', function(){
  gulp.src(paths.uat, paths.uatHelpers)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({message: 'Linitng complete'}));
});

gulp.task('default', ['jshint', 'smokeTest']);
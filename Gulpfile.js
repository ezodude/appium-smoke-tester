/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

// Reference our app files for easy reference in out gulp tasks
var paths = {
  specs: ['./path/to/your/mocaha/specs'],
  uat: ['./uat/**/*.uat.js'],
  uatHelpers: ['./uat/helpers/*.js']
};

// run smoke tests
gulp.task('smokeTest', function () {
  gulp.src(paths.uat)
    .pipe(mocha({reporter: 'spec'}));
});

// lint your js files
gulp.task('jshint', function () {
  gulp.src(paths.uat, paths.uatHelpers)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'smokeTest']);
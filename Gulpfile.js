/*jslint node: true */

'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha');

// Reference our app files for easy reference in out gulp tasks
var paths = {
  uat: {
    all: ['./uat/**/*.uat.js'],
    hybrid: ['./uat/hybrid/**/*.uat.js'],
    native: ['./uat/native/**/*.uat.js']
  },
  uatHelpers: ['./uat/helpers/*.js']
};

gulp.task('verifySetup', function () {
  process.env.PLATFORM = 'ios';
  process.env.IOS_UDID = undefined;
  process.env.DEV = true;

  gulp.src(paths.uat.native)
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('smokeHybridLocal', function () {
  process.env.DEV = true;

  gulp.src(paths.uat.hybrid)
    .pipe(mocha({reporter: 'spec'}));
});

// lint your js files
gulp.task('jshint', function () {
  gulp.src(paths.uat.all, paths.uatHelpers)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['jshint', 'smokeHybridLocal']);
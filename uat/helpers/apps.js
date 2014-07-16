/*jslint node: true */

'use strict';

if (process.env.DEV) {
  exports.iosWebviewApp = "sample-code/apps/ios/sim/WebViewApp.app";
  exports.iosHybrid = "sample-code/apps/ios/sim/BeanThere.app";
  exports.iosHybridDevice = "sample-code/apps/ios/device/BeanThere.app";
  exports.androidHybrid = "sample-code/apps/android/BeanThere-debug.apk";
} else {
  exports.iosWebviewApp = "http://appium.github.io/appium/assets/WebViewApp7.1.app.zip";
  exports.androidApiDemos = "http://appium.github.io/appium/assets/ApiDemos-debug.apk";
  exports.selendroidTestApp = "http://appium.github.io/appium/assets/selendroid-test-app-0.10.0.apk";
}
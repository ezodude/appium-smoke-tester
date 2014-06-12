/*jslint node: true */

'use strict';

if (process.env.DEV) {
  exports.iosTestApp = "sample-code/apps/ios/TestApp/build/Release-iphonesimulator/TestApp.app";
  exports.iosWebviewApp = "sample-code/apps/ios/WebViewApp/build/Release-iphonesimulator/WebViewApp.app";
  exports.iosUICatalogApp = "sample-code/apps/ios/UICatalog/build/Release-iphonesimulator/UICatalog.app";
  exports.androidApiDemos = "sample-code/apps/android/ApiDemos/bin/ApiDemos-debug.apk";
} else {
  exports.iosTestApp = "http://appium.github.io/appium/assets/TestApp7.1.app.zip";
  exports.iosWebviewApp = "http://appium.github.io/appium/assets/WebViewApp7.1.app.zip";
  exports.iosUICatalogApp = "http://appium.github.io/appium/assets/UICatalog7.1.app.zip";
  exports.androidApiDemos = "http://appium.github.io/appium/assets/ApiDemos-debug.apk";

  exports.iosWebviewAppLocal = "http://localhost:3000/WebViewApp7.1.app.zip";
  exports.androidApiDemosLocal = "http://localhost:3000/ApiDemos-debug.apk";
}
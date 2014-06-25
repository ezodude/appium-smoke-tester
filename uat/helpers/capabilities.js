/*jslint node: true */

'use strict';

exports.ios = {
  browserName: '',
  'appium-version': '1.1',
  platformName: 'iOS',
  platformVersion: '7.1',
  deviceName: 'iPhone',
  app: undefined // will be set later
};

exports.android = {
  browserName: '',
  'appium-version': '1.1',
  platformName: 'Android',
  platformVersion: '4.4',
  deviceName: 'Android Emulator',
  automationName: 'selendroid',
  deviceType: "phone",
  androidUseRunningApp: false,
  app: undefined, // will be set later
};

exports.android18 = {
  browserName: '',
  'appium-version': '1.1',
  platformName: 'Android',
  platformVersion: '4.3',
  deviceName: 'Android Emulator',
  automationName: 'selendroid',
  deviceType: "phone",
  androidUseRunningApp: false,
  app: undefined // will be set later
};

exports.selendroid16 = {
  browserName: '',
  'appium-version': '1.1',
  platformName: 'Android',
  platformVersion: '4.1',
  automationName: 'selendroid',
  deviceName: 'Android Emulator',
  app: undefined // will be set later
};
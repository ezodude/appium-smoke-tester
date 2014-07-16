/*jslint node: true */

"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers'),
    path = require('path');

describe("Can Login", function () {
  this.timeout(300000);

  var driver;
  var allPassed = true,
      username = process.env.PRIVATE_USERNAME,
      password = process.env.PRIVATE_PASSWORD,
      platform = process.env.PLATFORM || 'ios',
      iOSDeviceUDID = process.env.IOS_UDID;

  function setupWithAppiumServer(serverConfig) {
    return wd.promiseChainRemote(serverConfig);
  }

  function setupLogging(driver) {
    require("../helpers/logging").configure(driver);
  }

  function addCapabilitiesAndInit(capabilities, driver) {
    var desired = _.clone(capabilities[platform]);
    desired.app = path.join('../../', require("../helpers/apps")[platform + 'Hybrid']);

    if (platform === 'ios' && iOSDeviceUDID) {
      desired.app = path.join('../../', require("../helpers/apps")[platform + 'Hybrid' + 'Device']);
      desired.udid = iOSDeviceUDID;
    }

    if (platform === 'android') {
      desired.appPackage = process.env.APP_PACKAGE;
      desired.appActivity = process.env.APP_ACTIVITY;
    }

    if (process.env.SAUCE) {
      desired.name = platform + ' - Can login';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  }

  function switchToUIWebViewContext(driver) {
    // instead of default NATIVE_APP context

    return driver.setImplicitWaitTimeout(3000)
      .contexts()
      .then(function (contexts) {
        var webViewContext = _.find(contexts, function (context) {
          return context.indexOf('WEBVIEW') !== -1;
        });
        console.log('webViewContext', webViewContext);
        return driver.context(webViewContext);
      });
  }

  before(function () {
    var serverConfig = process.env.SAUCE ? serverConfigs.sauce : serverConfigs.local;
    driver = setupWithAppiumServer(serverConfig);

    setupLogging(driver);

    driver = addCapabilitiesAndInit(require("../helpers/capabilities"), driver);

    return switchToUIWebViewContext(driver);
  });

  after(function () {
    return driver.quit().finally(function () {
        if (process.env.SAUCE) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should have an email field ", function () {
    return driver
      .elementByCss('input[type=\'email\']', 500)
      .should.eventually.exist;
  });

  it("should have a password field ", function () {
    return driver
      .elementByCss('input[type=\'password\']')
      .should.eventually.exist;
  });

  it("should login with correct name and password", function () {
    return driver
      .elementByCss('input[type=\'email\']')
        .sendKeys(username)
      .elementByCss('input[type=\'password\']')
        .sendKeys(password)
      .elementByCss('.sign-in').click()
      .waitForElementByCss('.app-title', 5000)
      .waitForElementByCss('.app-button', 5000)
      .text().should.eventually.include('+');
  });

});
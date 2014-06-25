/*jslint node: true */

/*
  THIS ONLY RUNS ON IOS.
  USE TO ENSURE APPIUM IS SETUP CORRECTLY.
*/

"use strict";

require("../helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    serverConfigs = require('../helpers/appium-servers'),
    path = require('path');

describe("Can Search Simple", function () {
  this.timeout(300000);

  var driver;
  var allPassed = true,
      platform = 'ios';

  function setupWithAppiumServer(serverConfig) {
    return wd.promiseChainRemote(serverConfig);
  }

  function setupLogging(driver) {
    require("../helpers/logging").configure(driver);
  }

  function addCapabilitiesAndInit(capabilities, driver) {
    var desired = _.clone(capabilities[platform]);
    desired.app = path.join('../../', require("../helpers/apps")[platform + 'WebviewApp']);

    if (process.env.SAUCE) {
      desired.name = 'simple search webview';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  }

  before(function () {
    var serverConfig = process.env.SAUCE ? serverConfigs.sauce : serverConfigs.local;
    driver = setupWithAppiumServer(serverConfig);

    setupLogging(driver);

    return addCapabilitiesAndInit(require("../helpers/capabilities"), driver);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.SAUCE) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should get the url", function () {
    return driver
      .elementByXPath('//UIATextField[@value=\'Enter URL\']')
        .sendKeys('https://www.google.com')
      .elementByName('Go').click()
      .elementByClassName('UIAWebView').click() // dismissing keyboard
      .context('WEBVIEW')
      .sleep(1000)
      .waitForElementByName('q', 5000)
        .sendKeys('bbc')
        .sendKeys(wd.SPECIAL_KEYS.Return)
      .sleep(1000)
      .title().should.eventually.include('bbc');
  });

});
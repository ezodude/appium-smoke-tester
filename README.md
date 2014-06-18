# Appium Smoke Tester

This is a WIP.

Use this project as a painless starting point for setting up the necessary environment
to start crafting your own smoke tests for [Appium](http://appium.io). For now, the prime concern is __hybrid mobile app tests__.

More example test cases will be added as time goes on including interaction testing helpers etc...

__Contributions are very welcome__ - I want this to be a great resource as getting all the parts to work out of the box can be a pain.

## Setting up

This project assumes that you have [Node.js](http://nodejs.org) installed.

I'm a big fan of using localised dependency dev environments. I utilise the awesome [direnv](https://github.com/zimbatm/direnv) to make this happen.

The project root has the necessary ```.envrc``` ready.

Any node modules with an executable cli in the local ```node_modules``` directory will able to run without installing the global version, i.e. __NO ```npm install -g <module>```__ needed.

### Setting up direnv (on mac osx)

```
brew install direnv
```

Follow setup instructions [here](https://github.com/zimbatm/direnv#setup).

```cd``` into the directory where you've just installed the project.

Allow the ```.envrc``` file by running the following:

```
direnv allow
```

### Node modules

Simply ```npm install``` at the root of the project. This includes appium.

## Running the tests

### Start Appium

From the project root, run Appium in a separate shell window.

```
appium
```

This should output:
```
info: Welcome to Appium v1.1.0 (REV e433bbc31511f199287db7724e1ce692bcb32117)
info: Appium REST http interface listener started on 0.0.0.0:4723
info: socket.io started
```

### Double check the setup works

This runs a test for iOS against a basic bundled app. The app is native but uses a WebView to perform a google search.

```
DEV=true mocha uat/native/CanSearchSimple.ios.uat.js
```

Running the test will fire up the iOS simulator and run the mocha tests.

It should end with this output:
```
Ending your web drivage..

 > RESPONSE quit()


  1 passing (19s)
```

### Running bundled example hybrid tests

The __default gulp task__ is configured to run a prototypical hybrid test. This is a plain mocha smoke test that checks that login works correctly.

> Unfortunately, the target app used is **private**.

> You can supply your own app and settings **using ENV variables** - but I'm working on adding a sample app soon.

#### iOS for login smoke test

This targets the simulator only.

```
DEV=true PLATFORM=ios PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp
```

```PRIVATE_USERNAME``` and ```PRIVATE_PASSWORD``` are the target login screen's username and password.

This fires up the iOS simulator and runs the hybrid mocha tests.

#### Android for login smoke test

I use [Genymotion](http://www.genymotion.com) to run tests on a virtual device. Install the personal version as it will save you a ton of time.

Here we're targetting Kitkat 4.4. If using Genymotion, just install the Nexus 5: *Google Nexus 5 - 4.42 - API 19 - 1080x1920*

> You have to ensure Genymotion and the specific virtual device are
> running before the test can be executed.

```
DEV=true APP_PACKAGE='com.domain.name' APP_ACTIVITY='.ActivityName' PLATFORM=android PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp
```

```PRIVATE_USERNAME``` and ```PRIVATE_PASSWORD``` are the target login screen's username and password.

This fires up the Android Google Nexus 5 virtual device and runs the hybrid mocha tests.

##### Configuring APP_PACKAGE + APP_ACTIVITY

These are ENV variables picked up from the project's [AndroidManifest.xml](http://developer.android.com/guide/topics/manifest/manifest-intro.html).

In Apache Cordova projects, this is found at```./platforms/android/AndroidManifest.xml```

Specifically:
* APP_PACKAGE: is the **package** attribute in the *manifest* node.
* APP_ACTIVITY: is the **android:name** attribute prefixed with a '.' in the *application/activity* node.
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

All the tests will be run locally using a local Appium setup and local app packages.

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

### Verify the setup works

This runs a test on the iOS simulator against a basic bundled app. The app is native but uses a WebView to perform a google search.

```
gulp verifySetup
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

The tests are run against the bundled BeanThere.app found in the ```/sample-code``` directory.

### On Simulators

#### iOS for login smoke test

This targets the simulator only, i.e. an ```i386``` .app build.

```
PLATFORM=ios PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp
```

```PRIVATE_USERNAME``` and ```PRIVATE_PASSWORD``` are the target login screen's username and password.

This fires up the iOS simulator and runs the hybrid mocha tests.

#### Android for login smoke test

I use [Genymotion](http://www.genymotion.com) to run tests on a virtual device. Install the personal version as it will save you a ton of time.

The tests work fine against both:

* Android Kitkat 4.4
* Android Jelly Bean 4.3

Using Genymotion, install these virtual devices:

* Google Nexus 5 - 4.4.2 - API 19 - 1080x1920
* Samsung Galaxy S4 - 4.3 - API 18 - 1080x1920

> You have to ensure Genymotion and the specific virtual device are
> running before the test can be executed. Start a device, test, kill that device, move to next device and repeat.

Also, ensure that ANDROID_HOME is setup correctly,
```
echo $ANDROID_HOME
```
This should output something similar to below - i.e. the path to your Android installation:
```
/usr/local/opt/android-sdk
```

Running the actual test:
```
PLATFORM=android APP_PACKAGE='com.domain.appname' APP_ACTIVITY='.ActivityName' PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp
```

```PRIVATE_USERNAME``` and ```PRIVATE_PASSWORD``` are the target login screen's username and password.

This fires up the Android virtual device and runs the hybrid mocha tests.

##### Configuring APP_PACKAGE + APP_ACTIVITY

These are ENV variables picked up from the project's [AndroidManifest.xml](http://developer.android.com/guide/topics/manifest/manifest-intro.html).

In Apache Cordova projects, this is found at```./platforms/android/AndroidManifest.xml```

Specifically:
* APP_PACKAGE: is the **package** attribute in the *manifest* node.
* APP_ACTIVITY: is the **android:name** attribute prefixed with a '.' in the *application/activity* node.

### On Device

#### iOS

#### Building app for running on device

We have to ensure that the app has been compiled for __a device (armv7 build)__ and has been signed with __a developer cert__.

Also, the device used should be already be __configured as a trusted development device in Xcode__.

We can confirm both these assumptions using this command

Code sign info:
```
codesign -dvvv /path/to/app
```

Output
```
Executable=/path/to/app/smoke-tests/sample-code/apps/ios/device/Private1.app/App
Identifier=com.domain.app-name
Format=bundle with Mach-O thin (armv7)
CodeDirectory v=20200 size=9793 flags=0x0(none) hashes=480+5 location=embedded
Hash type=sha1 size=20
CDHash=0c79926b8fa4025da8ab9e077d8b4bd70xxxxxxx
Signature size=4000
Authority=iPhone Developer: Joe Dev (XXXXXXXX)
Authority=Apple Worldwide Developer Relations Certification Authority
Authority=Apple Root CA
Signed Time=23 Jun 2014 12:14:17
Info.plist entries=30
TeamIdentifier=XXXXXXX
Sealed Resources version=2 rules=5 files=198
Internal requirements count=2 size=980
```
The ```Format``` field verifies the target env (armv7 or otherwise).
The ```Authority``` field verifies that the app has been signed.

##### To build for device and code sign

Use the xcodebuild command (and substitute for your own app). The ```build.xcconfig``` is conveniently bundled with the project:
```
xcodebuild -xcconfig "./build.xcconfig" -project "path/to/xcode/project/file/PROJECT_NAME.xcodeproj" ARCHS="armv7 armv7s arm64" -target "PROJECT_NAME" -configuration $CONFIGURATION -sdk iphoneos build VALID_ARCHS="armv7 armv7s arm64" CONFIGURATION_BUILD_DIR="path/to/build/dir/device"
```

##### To only code sign

Find available signing identities using:
```
security find-identity |  sed -n 's/.*\("[^"]*"\).*/\1/p' | grep 'iPhone'
```

To actually code sign:
```
codesign -v --sign "iPhone Developer: Joe Dev" /path/to/app
```

#### Setting up a debug proxy

Provided your device is connected using a USB cable, find your ```UDID``` using the shell:
```
system_profiler SPUSBDataType
```

This prints all attached USB devices. Look for your iPhone's serial number. That is the ```UDID```.

Ensure you have the ios-webkit-debug-proxy proxying your device.

```
ios_webkit_debug_proxy -c UDID:27753 -d
```

Installation instructions [here](https://github.com/appium/appium/blob/master/docs/en/hybrid.md#execution-against-a-real-ios-device).

I have seen some issues getting the proxy to run. This helped resolve my issues: https://github.com/google/ios-webkit-debug-proxy/issues/59

#### Running tests

After all the pieces come together, run
```
PLATFORM=ios IOS_UDID='UDID' PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp
```

#### Android

Ensure your device is attached as a usb device. Then simply run:

```
PLATFORM=android APP_PACKAGE='com.domain.appname' APP_ACTIVITY='.ActivityName' PRIVATE_USERNAME='username@app.com' PRIVATE_PASSWORD='xxxx' gulp

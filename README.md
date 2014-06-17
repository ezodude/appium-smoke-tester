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
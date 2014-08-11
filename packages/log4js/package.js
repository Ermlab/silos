Package.describe({
    summary: "log4js for Meteor"
});

// I made some changes to official NPM gitlab module (v0.8.6), so for now
// we are using a local copy of the module
// See https://www.npmjs.org/package/gitlab

Npm.depends({
    "log4js": "0.6.16",
    "log4js-appender-silos": "0.0.1"
});

Package.on_use(function (api) {
    api.export("log4js");
    api.export("silosAppender");
    api.add_files("log4js.js", "server");
});
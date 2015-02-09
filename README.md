Silos
=====

**Si**mple **Lo**gging **S**ervice


## In-browser console

Using web browser console (assuming that jQuery is present):

    $.post("http://your_domain.com/api/call/token_abcd",{body:"Hello PLON from browser", level:1, logger: "console"});


## Bash

Type in terminal:

    curl -X POST --data 'body=Hello PLON!&level=1&logger=bash' http://your_domain.com/api/call/token_abcd


## C# and Visual Studio

Install NLog and NLog Configuration via Package Manager Console

    PM> Install-Package NLog
    PM> Install-Package NLog.Config


Next, modify your config file so that it uses Silos target. Check out this [repository for more details](https://github.com/Ermlab/nlog_silos_target).

## Node.js

Add required npm packages:

    npm install log4js
    npm install log4js-appender-silos

Then your server code might look like:

    var log4js = require('log4js');
    var appender = 'log4js-appender-silos';
    var token = 'token_abcd';

    log4js.loadAppender(appender);
    log4js.addAppender(log4js.appenders[appender](token));

    var logger = log4js.getLogger('node');

    logger.info('Node server started on ', new Date());


## Meteor
For meteor 0.9.x and up, add ermlab:log4js-silos package

    meteor add ermlab:log4js-silos

Then your server code might look like:

    log4js.enableSilos("token_abcdd");
    var logger = log4js.getLogger("meteor");

    Meteor.startup(function () {
        logger.info("Meteor server started on ", new Date());
    });


## Python
PyPI (pip) package for Silos is on the way. For now, check out [this gist](https://gist.github.com/pgorecki/e616444fcd8e729206e3). 


### Not on the list?
Your favourite language is not on the list? Drop us an email at office@ermlab.com.

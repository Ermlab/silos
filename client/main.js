var loggers = {};

//DATE_TIME_FORMAT = 'Y-m-d H:i';
DATE_FORMAT = 'DD.MM.YYYY';
TIME_FORMAT = 'HH:mm';
DATE_TIME_FORMAT = DATE_FORMAT+' '+TIME_FORMAT;

Meteor.startup(function () {
    Meteor.subscribe('logBooks');
    Meteor.subscribe("userData");

    // Listen for unique loggers and store them in session variable
    // so that they can be used in the template later on
    Session.setDefault('loggers',[]);
    Session.set('autoScroll', true);
    
    Logs.find().observeChanges({
        added: function (id, doc) {
            if (loggers[doc.logger]) {
                loggers[doc.logger]++;
            }
            else {
                loggers[doc.logger]=1;
                Session.set('loggers', Object.keys(loggers).sort());
            }
        },
        removed: function (id) {
            /*
            console.log(id, doc);
            loggers[doc.logger]--;
            if (loggers[doc.logger]==0) {
                delete loggers[doc.logger];
                Session.set('loggers', Object.keys(loggers).sort());
            }
            */
        }
    });
});
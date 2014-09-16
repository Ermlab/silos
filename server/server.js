var silosLogbookSecretKey = 'qjKS3oHBigfr8YycZBsi8mp4c8hp3S8fsewEFP9mM6C3LgsTasYLCb4ygKGF2xY5';

log4js.enableSilos(silosLogbookSecretKey);
logger = log4js.getLogger("meteor");

Accounts.onCreateUser(function (options, user) {

    // Create Silos logbook for the first user
    if (Meteor.users.find().count() == 0 && LogBooks.find().count() == 0) {

        var timestamp = (new Date()).getTime();
        // Add Silos logbook for first created user
        LogBooks.insert({
            Name: 'Silos',
            Key: silosLogbookSecretKey,
            Created: timestamp,
            LogsCount: 0,
            Fields: [],
            Members: [
                {
                    UserId: user._id,
                    LastViewed: timestamp,
                    Role: 'owner'
                }
            ]
        });
        logger.info('Created Silos logbook for user ' + user.emails[0].address);

        logger.info('User ' + user.emails[0].address + ' gets admin rights');
        user.role = ['admin'];
    }

    // extra user fields
    logger.debug(options);
    logger.debug(user);

    var username = undefined;

    // standard auth
    if (!username) {
        try {
            username = user.emails[0].address;
        } catch (e) {}
    }

    // google auth
    if (!username) {
        try {
            username = user.services.google.email;
        } catch (e) {}
    }

    // github auth
    if (!username) {
        try {
            username = user.services.github.username;
        } catch (e) {}
    }

    user.username = username;
    user.logbookLimit = 3;

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;

    // If user loggin in with github 
    if (user.services.github) {
        var accessToken = user.services.github.accessToken,
            result,
            profile;

        result = Meteor.http.get("https://api.github.com/user", {
            headers: {
                "User-Agent": "Meteor/1.0"
            },
            params: {
                access_token: accessToken
            }
        });

        if (result.error)
            throw result.error;

        profile = _.pick(result.data,
            "name",
            "login",
            "avatar_url",
            "url",
            "company",
            "blog",
            "location",
            "email",
            "bio",
            "html_url");

        user.profile = profile;
    }
    if (user.services.google) {
        var obiekt = {
            avatar_url: user.services.google.picture,
            name: user.profile.name
        };

        user.profile = obiekt;
    }
    return user;
});

Meteor.startup(function () {
    logger.info("Silos server restarted on " + new Date());
    Updates.run();

    Meteor.setInterval(function () {
        var allLogs = Logs.find().fetch()

        for (var obj in allLogs) {

            var nowTime = Date.now();

            var diff = Math.abs(nowTime - allLogs[obj].date);

            if (diff > 604800000) {
                Logs.remove({
                    _id: allLogs[obj]._id
                });
                console.log('Remove old log by id: ' + allLogs[obj]._id);
            }
        }
    }, 900000);

    // Set settings for Email system

    process.env.MAIL_URL = 'smtp://postmaster%40mg.ermlab.com:0e3b968207f4265e04961b18e7b2e7e7@smtp.mailgun.org:587'

    Accounts.emailTemplates.from = 'no-reply@mg.ermlab.com';
    Accounts.emailTemplates.sitename = 'Silos';
    Accounts.emailTemplates.verifyEmail.subject = function (user) {
        return 'Confirm Your Email Adress';
    };

    Accounts.config({
        sendVerificationEmail: true
    });
});
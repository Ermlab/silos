var silosLogbookSecretKey = 'qjKS3oHBigfr8YycZBsi8mp4c8hp3S8fsewEFP9mM6C3LgsTasYLCb4ygKGF2xY5';


log4js.enableSilos(silosLogbookSecretKey);
logger = log4js.getLogger("meteor");


Accounts.onCreateUser(function (options, user) {
    // Add first logbook for Silos
    if (user.emails[0].address == 'gorecki@ermlab.com' && LogBooks.find().count() === 0) {
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
    }

    // Update user
    user.username = user.emails[0].address;
    user.Limit = 3;
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});


Meteor.startup(function () {
    logger.info([1, 2, 3, 4, [10, 20, 30]]);
    logger.info(1, 2, 3, 4);

    logger.info("Silos restarted", {
        aa: 1,
        bb: 2
    });

});
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
    user.username = user.emails[0].address;
    user.logbookLimit = 3;

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});


Meteor.startup(function () {
    logger.info("Meteor server started", new Date());
    Updates.run();
});
Accounts.onCreateUser=function (options, user) {
    Meteor.limits.insert({UserID:user._id,Limit: 3})

    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;

    return user;
};
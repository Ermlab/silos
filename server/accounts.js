Accounts.onCreateUser(function(options, user) {

    user.Limit = 3;
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
        user.profile = options.profile;
    return user;
});

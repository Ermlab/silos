Utils = {
    canAddNewLogbook: function () {
        try {
            var limit = Meteor.user().Limit;
            var count = LogBooks.find({
                AuthorID: Meteor.user()._id
            }).count();
            return count < limit;
        } catch (e) {}
        return false;
    },

    normalizeLogLevel: function (i) {
        switch (i) {
            // log4js
        case 5000:
            return 1;
        case 10000:
            return 2;
        case 20000:
            return 3;
        case 30000:
            return 4;
        case 40000:
            return 5;
        case 50000:
            return 6;
        default:
            return i;
        }
    },

    logLevelFromInt: function (i) {
        switch (i) {
        case 1:
            return "trace";
        case 2:
            return "debug";
        case 3:
            return "info";
        case 4:
            return "warning";
        case 5:
            return "error";
        case 6:
            return "fatal";
        }
    },

    userOwnsDocument: function (userId, doc) {
        for (var i in doc.Members) {
            if (doc.Members[i].UserId == userId && doc.Members[i].Role == 'owner') {
                return true;
            }
        }
        return false;
    },

    pprint: function (arg) {
        var htmlEntities = function (str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        var t = typeof arg;
        switch (t) {
        case 'number':
            return '<span class="arg arg-number">' + arg + '</span>';
            break;

        case 'string':
            return '<span class="arg arg-string">' + htmlEntities(arg) + '</span>';
            break;

        case 'object':
            var output = [];
            if (arg instanceof Array) {
                for (var i = 0; i < arg.length; i++) {
                    output[i] = Utils.pprint(arg[i]);
                }
                return '<span class="arg arg-array">[' + output.join(', ') + ']</span>';
            } else {
                for (var p in arg) {
                    output.push(p + ': ' + Utils.pprint(arg[p]));
                }
                return '<span class="arg arg-object">{' + output.join(', ') + '}</span>';
            }
            break;

        default:
            return '<span class="arg arg-default">' + arg + '</span>';
        }
    }
};
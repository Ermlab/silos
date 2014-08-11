Router.map(function () {
    this.route('apiCall', {
        path: '/api/call/:_key',
        where: 'server',
        action: function () {
            var logbook = LogBooks.findOne({
                Key: this.params._key
            });

            if (this.request.method == 'POST' && logbook) {
                var log = this.request.body;
                try {
                    log.body = JSON.parse(log.body);
                } catch (err) {}
                log.LogBookID = logbook._id;
                log.date = (new Date()).getTime();
                log.level = Utils.normalizeLogLevel(parseInt(log.level));
                Logs.insert(log);

                LogBooks.update(logbook._id, {
                    $inc: {
                        LogsCount: 1
                    }
                });

                this.response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                this.response.end('Success');

            } else {
                log.warn("Logging to unknown log", {
                    user: this.userId,
                    header: this.request.header,
                    body: this.request.body
                });

                this.response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                this.response.end('Failed');
            }

        }
    });
});
Router.configure({
layoutTemplate: 'layout'
});
Router.map(function() {
this.route('stronaGlowna', {path: '/'});
this.route('createLogBook', {path: '/CreateLogBook'});
});

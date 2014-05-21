Router.configure({
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});


Router.map(function () {
	this.route('home', {
		path: '/',
		template: 'home',
		layoutTemplate: 'layout',
		yieldTemplates: {
			"header": {to: "header"}
		},
		data: function() {
			Meteor.call("scrape", function(err, res) {
				if (err) {
					throw new Meteor.Error(400, "Проблемочка");
				} else {
					return res;
				}
				
			});
		}
	});
});
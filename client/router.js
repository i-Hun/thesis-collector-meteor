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
		}
	});
});
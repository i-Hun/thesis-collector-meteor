if (Meteor.isServer) {
	Meteor.call("scrape", function(err, res) {
		if (err) {
			throw new Meteor.Error(400, "Проблемочка");
		} else {
			console.log("______________________");
			console.log(res);
		}
		
	});
}
if (Meteor.isServer) {
	Meteor.call("scrapeBk55", function(err, res) {
		if (err) {
			throw new Meteor.Error(400, "Проблемочка");
		} else {
			console.log("______________________");
			console.log(res);
		}
		
	});
}
Meteor.methods({
	scrape: function() {
		Future = Npm.require('fibers/future');

    var cats = [ 'programming', 'javascript', 'node' ];

    var futures = _.map(cats, function(cat) {
      var future = new Future();
      var onComplete = future.resolver();

      var url = 'http://reddit.com/r/' + cat;

      /// Make async http call
      HTTP.get(url, function(error, result) {
 				var $ = Cheerio.load(result.content);
				var output = [];
				$('a.title').each(function () {
					console.log('%s (%s)', $(this).text(), $(this).attr('href'));
					console.log("____________________________")
					output.push({
							title: $(this).text(),
							link: $(this).attr('href')
					});
				});
        onComplete(error, output);
      });

      return future;
    });

    // wait for all futures to finish
    Future.wait(futures);

    // and grab the results out.
    return _.invoke(futures, 'get'); 
	}
});

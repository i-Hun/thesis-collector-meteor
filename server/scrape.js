Future = Npm.require('fibers/future');

var options = {
	headers: {
		'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/34.0.1847.116 Chrome/34.0.1847.116 Safari/537.36'
	}
};

function trim (str) {
	return str.replace(/(\r\n|\n|\r)/gm,"") //удаляем разрывы линий
						.replace(/ +(?= )/g,'') //удаляем двойные пробелы
						.replace(/^\s\s*/, '') //удаляем пробелы с начала
						.replace(/\s\s*$/, ''); //и с конца
}

Meteor.methods({
	scrapeBk55: function() {
		var futures = _.map(_.range(1, 3), function(num) {
			var future = new Future();
			var onComplete = future.resolver();

			var url = "http://bk55.ru/news/article/" + num;

			/// Make async http call
			HTTP.get(url, options, function(error, result) {
				var $ = Cheerio.load(result.content);

				var content = $("#divcontnews").text();
				if (!content) {
					onComplete(error, "пустая страница");
				} else {
					content = trim(content);

					var rowDate = $("#main>div:first-child>div:nth-child(3)").text();
					var date = moment(rowDate, "DD MMMM YYYY — HH:mm"); //02 января 2013 — 18:29

					var response = {
						url: url,
						title: $("#main h1").text(),
						content: content,
						category: $("#main .rubric").text(),
						date: new Date(date),
						views: Number($("#main>div>.view:first-child").text())
					};

					onComplete(error, response);
				}
			});

			return future;
		});

		// wait for all futures to finish
		Future.wait(futures);

		// and grab the results out.
		return _.invoke(futures, 'get'); 


	}
});

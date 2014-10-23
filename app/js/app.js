utils.ready(function() {
    "use strict";

    utils.$('#search-input')[0].addEventListener('keyup', utils.debounce(function(e) {

        utils.JSONP({
            q: e.target.value
        }, function(result) {
            var resultsList = utils.$('.results')[0];
            if (result._total > 0) {
                var html = [];
                result.streams.forEach(function(stream) {
                    var parsed = utils.parseTemplate('stream-item', {
                        preview: stream.preview.small,
                        link: stream._links.self,
                        displayName: stream.channel.display_name,
                        gameName: stream.channel.game,
                        viewers: stream.viewers,
                        description: stream.channel.status
                    });
                    html.push(parsed);
                });
                resultsList.innerHTML = html.join('');
            } else {
                resultsList.innerHTML = 'No results found for "' + e.target.value + '"';
            }
        });

    }, 500));
});

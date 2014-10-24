(function(global) {

    var app = {},
        resultsPerPage = 10;

    app.onHashChange = function() {
        var query = utils.getHash('query');

        if (!query) {
            return;
        }

        utils.$('.loading-gif').classList.remove('hidden');
        utils.$('.search-input').value = query;

        utils.JSONP({
            q: query,
            limit: resultsPerPage,
            offset: utils.getHash('page', 0) * resultsPerPage
        }, this.handleSearchResults.bind(this));
    };

    app.renderStreams = function(streams) {
        var html = [];
        streams.forEach(function(stream) {
            var parsed = utils.parseTemplate('#stream-item', {
                preview: stream.preview.medium,
                logo: stream.channel.logo,
                link: stream.channel.url,
                displayName: stream.channel.display_name,
                gameName: stream.channel.game,
                viewers: stream.viewers,
                description: stream.channel.status
            });
            html.push(parsed);
        });
        return html.join('');
    };

    app.handlePagination = function(total) {
        var currentPage = parseInt(utils.getHash('page', 0), 10),
            totalPage = Math.ceil(total / resultsPerPage);

        if (total > resultsPerPage) {
            utils.$('.next-page').removeAttribute('disabled');
        }

        if (currentPage + 1 >= totalPage) {
            utils.$('.next-page').setAttribute('disabled', 'disabled');
        }

        if (currentPage > 0) {
            utils.$('.previous-page').removeAttribute('disabled');
        } else {
            utils.$('.previous-page').setAttribute('disabled', 'disabled');
        }

        utils.$('.page-status').innerHTML = (currentPage+1) + '/' + totalPage;
    };

    app.handleSearchResults = function(result) {
        var resultsList = utils.$('.results');

        utils.$('.loading-gif').classList.add('hidden');
        utils.$('.total').innerHTML = result._total + ' results';
        if (result._total > 0) {
            resultsList.innerHTML = this.renderStreams(result.streams);
        } else {
            resultsList.innerHTML = '';
        }
        this.handlePagination(result._total);
    };

    global.app = app;
})(this);

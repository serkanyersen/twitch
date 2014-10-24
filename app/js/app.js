(function(global) {

    "use strict";

    var app = {},
        resultsPerPage = 10;

    /**
     * When hash value changed update the page according
     * to the values in the hash. This function will make
     * a new request to server and either fetch the new page
     * or make a search with the given query. If there is no query
     * this function will clean the results.
     */
    app.handleHashValue = function() {
        var query = utils.getHash('query');

        // If no query is set, just reset results page
        if (!query) {
            utils.$('.results').innerHTML = '';
            utils.$('.search-input').value = '';
            this.handlePagination(0);
            return;
        }

        // There will be a new request, display loading bar
        utils.$('.loading-gif').classList.remove('hidden');

        // Make sure search query is in the search box,
        // This will be necessary when query is provided
        // by URL, this happens when page is refreshed.
        utils.$('.search-input').value = query;

        // Make a JSONP request to twitch api and get the results
        utils.JSONP({
            q: query,
            limit: resultsPerPage,
            offset: utils.getHash('page', 0) * resultsPerPage
        }, this.handleSearchResults.bind(this));
    };

    /**
     * Creates HTML code for the list of results
     * @param  {Array} streams Array of results
     * @return {String}         Generated html
     */
    app.renderStreams = function(streams) {
        var html = [];
        streams.forEach(function(stream) {
            var parsed = utils.parseTemplate('#stream-item', {
                preview: stream.preview.medium,             // Preview image
                logo: stream.channel.logo,                  // Logo of the channel
                link: stream.channel.url,                   // Link to channel
                displayName: stream.channel.display_name,   // Display Name
                gameName: stream.channel.game,              // Game Name
                viewers: stream.viewers,                    // Number of viewers
                description: stream.channel.status          // Description
            });
            html.push(parsed);
        });
        return html.join('');
    };

    /**
     * Handle the page buttons, decide if they should be disabled or not
     * display total number of pages and results on the page
     * @param  {Number} total Total number of results
     */
    app.handlePagination = function(total) {
        // Get the current page we are viewing
        var currentPage = parseInt(utils.getHash('page', 0), 10),
            // How mane pages are there?
            totalPage = Math.ceil(total / resultsPerPage);

        // If there are more than one page, enable Next button
        if (totalPage > 0) {
            utils.$('.next-page').removeAttribute('disabled');
        }

        // If we reach the end of all pages, disable Next button
        if (currentPage + 1 >= totalPage) {
            utils.$('.next-page').setAttribute('disabled', 'disabled');
        }

        // If we are on the first page disable the previous button, if not enable it
        if (currentPage > 0) {
            utils.$('.previous-page').removeAttribute('disabled');
        } else {
            utils.$('.previous-page').setAttribute('disabled', 'disabled');
        }

        // Show how many results have returned.
        utils.$('.total').innerHTML = total + ' results';

        // Show how many pages are there and which page we are on.
        utils.$('.page-status').innerHTML = (currentPage + 1) + '/' + totalPage;
    };

    /**
     * When search results are received, render results and update pagination
     * @param  {Object} result Api Response
     */
    app.handleSearchResults = function(result) {
        var resultsList = utils.$('.results');

        utils.$('.loading-gif').classList.add('hidden');

        if (result._total > 0) {
            resultsList.innerHTML = this.renderStreams(result.streams);
        } else {
            resultsList.innerHTML = '';
        }
        this.handlePagination(result._total);
    };

    global.app = app;
})(this);

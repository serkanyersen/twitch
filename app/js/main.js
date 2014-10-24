utils.ready(function() {
    "use strict";

    utils.readHash();

    utils.$('.search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        utils.setHash('query', utils.$('.search-input').value || null);
        utils.setHash('page', null);
    });

    utils.$('.previous-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) - 1);
    });

    utils.$('.next-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) + 1);
    });

    app.handleSearch();
    window.addEventListener('hashchange', app.handleSearch.bind(app));
});

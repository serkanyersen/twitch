utils.ready(function() {
    "use strict";

    utils.$('.search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        utils.setHash('query', utils.$('.search-input').value);
        // reset pagination
    });

    utils.$('.previous-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) - 1);
    });

    utils.$('.next-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) + 1);
    });

    window.addEventListener('hashchange', app.onHashChange.bind(app));
    app.onHashChange();
});

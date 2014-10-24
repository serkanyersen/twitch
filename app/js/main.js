utils.ready(function() {

    "use strict";

    // When search form is submitted, set the query in the hash
    utils.$('.search-form').addEventListener('submit', function(e) {
        e.preventDefault();
        utils.setHash('query', utils.$('.search-input').value || null);
        utils.setHash('page', null);
    });

    // When previous button is clicked, decrease page value by one
    utils.$('.previous-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) - 1);
    });

    // When next button is clicked, increase page value by one
    utils.$('.next-page').addEventListener('click', function() {
        utils.setHash('page', parseInt(utils.getHash('page', 0), 10) + 1);
    });

    // Update application according to hash value
    app.handleHashValue();
    window.addEventListener('hashchange', app.handleHashValue.bind(app));
});

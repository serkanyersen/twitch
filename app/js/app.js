utils.ready(function() {
    "use strict";

    utils.$('#search-input')[0].addEventListener('keyup', utils.debounce(function(e) {

        utils.JSONP({
            q: e.target.value
        }, function(result) {
            console.log(result);
        });


    }, 500));
});

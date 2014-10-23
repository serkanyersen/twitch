(function(global) {
    "use strict";

    var base = 'https://api.twitch.tv/kraken/search/streams',
        utils = {};

    /**
     * Run when document is loaded and ready
     * @param  {Function} callback function to run when document is ready
     */
    utils.ready = function(callback) {
        document.addEventListener("DOMContentLoaded", callback);
    };

    /**
     * Document query selector shorthand
     * @param  {String} selector CSS Selector
     * @return {Array}          Array of results, empty array of none
     */
    utils.$ = function(selector) {
        return document.querySelectorAll(selector);
    };

    /**
     * Converts given object to a query string
     * @param  {Object} object dictionary that you want to
     *                         turn into query string
     * @return {String}        Resulting query string
     */
    utils.serialize = function(object) {
        var serialized = [];
        Object.keys(object).forEach(function(key) {
            serialized.push(key + '=' + encodeURIComponent(object[key]));
        });

        return serialized.join('&');
    };

    /**
     * Ignores repetitive calls for a function, only runs after given time
     * @param  {Function} func  function to debounce
     * @param  {Number} delay delay amount in milliseconds
     * @return {Function}       debounced function
     */
    utils.debounce = function(func, delay) {
        var debounceTimer = false;
        return function() {
            var args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function(){
                func.apply(this, args);
            }, delay);
        };
    };

    /**
     * Makes a JSONP request with given parameters
     * @param {Object}   params   Parameters you want to pass
     * @param {Function} callback function to run when result is arrived
     */
    utils.JSONP = function(params, callback) {
        var script;
        params.callback = '__jsonp_callback_' + (+new Date());

        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = base + '?' + this.serialize(params);

        global[params.callback] = function(data){
          callback.call(global, data);
          document.getElementsByTagName('head')[0].removeChild(script);
          script = null;
          delete global[params.callback];
        };

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     * A very basic template parser. Finds all {{ name }} tags and replaces
     * them with values in given dictionary
     * @param  {String} template #id of the element that contains template
     * @param  {Object} data     Dictionary to use as data for template
     * @return {String}          Parsed template
     */
    utils.parseTemplate = function(template, data) {
        var html = document.getElementById('stream-item').innerHTML || "";
        return template.replace(/\{\{\s*(.*?)\s*\}\}/gim, function(all, match){
            return data[match] || "";
        });
    };

    global.utils = utils;
})(this);

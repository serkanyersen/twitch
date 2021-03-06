(function(global) {

    "use strict";

    var base = 'https://api.twitch.tv/kraken/search/streams', // Twitch api url
        utils = {}, // utility object
        hash = {};  // Storage for url hash

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
     * @return {DOMElement}     Element that matched or false
     */
    utils.$ = function(selector) {
        return document.querySelector(selector);
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
     * Converts given string to an object
     * @param  {String} Query to de-serialize
     * @return {Object} Dictionary out of given string
     */
    utils.deserialize = function(string) {
        var obj = {};
        string.split('&').forEach(function(piece) {
            var pair = piece.split('=');
            if (pair[0]) {
                obj[pair[0]] = decodeURIComponent(pair[1]);
            }
        });
        return obj;
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
        var html = this.$(template).innerHTML || "";
        return html.replace(/\{\{\s*(.*?)\s*\}\}/gim, function(all, match){
            return data[match] || "";
        });
    };

    /**
     * Reads current hash and converts it into an object
     * @return {[type]} [description]
     */
    utils.readHash = function() {
        hash = this.deserialize(location.hash.replace(/^./, ''));
        return hash;
    };

    /**
     * Adds a new property to current hash
     * @param {String} key   Key for the value
     * @param {String} value Value to be stored
     */
    utils.setHash = function(key, value) {
        if (value === null) {
            delete hash[key];
        } else {
            hash[key] = value;
        }
        location.hash = this.serialize(hash);
    };

    /**
     * Gets requested value from current hash
     * @param  {String} key          Name of the value you want
     * @param  {Mixed} defaultValue a replacement value if it cannot be found
     * @return {String|Undefined}              Value that was stored in hash or undefined
     */
    utils.getHash = function(key, defaultValue) {
        var hashObject = this.readHash();
        return hashObject[key] || defaultValue;
    };

    global.utils = utils;
})(this);

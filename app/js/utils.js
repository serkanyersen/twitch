(function(global) {
    "use strict";

    var base = 'https://api.twitch.tv/kraken/search/streams',
        utils = {};

    utils.ready = function(callback) {
        document.addEventListener("DOMContentLoaded", callback);
    };

    utils.$ = function(selector) {
        return document.querySelectorAll(selector);
    };

    utils.serialize = function(object) {
        var serialized = [];
        Object.keys(object).forEach(function(key) {
            serialized.push(key + '=' + encodeURIComponent(object[key]));
        });

        return serialized.join('&');
    };

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

    utils.parseTemplate = function(template, data) {
        var html = document.getElementById('stream-item').innerHTML || "";
        return template.replace(/\{\{\s*(.*?)\s*\}\}/gim, function(all, match){
            return data[match] || "";
        });
    };

    global.utils = utils;
})(this);

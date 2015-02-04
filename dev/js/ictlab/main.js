/* jshint unused:false */


(function(){document.getElementsByTagName('html')[0].classList.remove('no-js');})();

(function() {

    var Events = (function() {

        var topics = {};

        return {

            subscribe: function(topic, callback) {

                if (!topics[topic]) { topics[topic] = { queue:[] }; }

                var index = topics[topic].queue.push(callback) - 1;

                return {

                    remove: function() {

                        delete topics[topic].queue[index];

                    }

                };

            },

            publish: function(topic, info) {

                if (!topics[topic] || !topics[topic].queue.length) { return; }

                var callbacks = topics[topic].queue;

                callbacks.forEach(function(cb) {
                    cb(info || {});
                });

            }

        };

    }());

    console.logType = function(message) {
        console.log('(' + typeof message + ') ' + message);
    };


    function get(el, first) {
        return document['querySelector' + ((el.indexOf('#') === 0 || first) ? '' : 'All')](el);
    }

    /**
     * Get the computed value of an elemnts style rule
     * @param  {Object} el   A node for which the stylerule is wanted
     * @param  {String} rule The rule for which the computed value is wanted
     * @return {String}      Computed style rule, including measure
     */
    function getStyle(el, rule) {
        if (typeof el.nodeType !== 'number') {
            console.log('getStyle first argument must be a single Node');
            return false;
        }
        return window.getComputedStyle(el).getPropertyValue(rule);
    }


    function addElement(type, content, parent) {
        var el = document.createElement(type);
        el.innerHTML = content;
        parent.appendChild(el);
        return el;
    }


    function styleHCorners() {
        var hName = '.panel--header',
            sName = '.panel--header__sidebar';
        var hMain = get(hName, true),
            hSide = get(sName, true);
        var mainHeight = parseFloat(getStyle(hMain, 'height')),
            sideHeight = parseFloat(getStyle(hSide, 'height'));

        function getWidth(height) {
            return (height * 0.618) - 1;
        }

        function getRule(el, width) {
            return el + ":after{border-width:" + width + "px;}";
        }

        var rule = getRule(hName, getWidth(mainHeight)) + getRule(sName, getWidth(sideHeight));

        addElement('style', rule, get('head', true));

    }


    function init() {

        styleHCorners();

    }


    init();

}());
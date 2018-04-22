var EventBus = (function () {
    var events = {};

    /**
     * Subscribe to an event.
     * 
     * @param {string} eventName - The name of the event to subscribe.
     * @param {function} fn - The function which accepts a single argument from the event.
     */
    var subscribe = function(eventName, fn) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }

        if (typeof fn != "function") {
            throw new Error("Subscriber must be a function");
        }
        events[eventName] = events[eventName] || [];
        if (!events[eventName].includes(fn)) {
            events[eventName].push(fn);
        }
    };

    /**
     * Unsubscribe from an event.
     * 
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {function} fn - The function which accepts a single argument from the event.
     */
    var unsubscribe = function(eventName, fn) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }

        if (typeof fn != "function") {
            throw new Error("Unsubscriber must be a function");
        }
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if (events[eventName][i] == fn) {
                    events[eventName].splice(i, 1);
                    i--;
                }
            }
        }
    };

    /**
     * Publish an event.
     * 
     * @param {string} eventName - The name of the event to publish to.
     * @param {any} data - The data of the event.
     */
    var publish = function(eventName, data) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }
        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    };

    var reset = function(){
        events = {};
    };

    return {
        publish: publish,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        reset: reset
    };
})();
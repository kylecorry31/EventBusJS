var EventBus = {
    events: {},

    /**
     * Subscribe to an event.
     * 
     * @param {string} eventName - The name of the event to subscribe.
     * @param {function} fn - The function which accepts a single argument from the event.
     */
    subscribe: function(eventName, fn) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }

        if (typeof fn != "function") {
            throw new Error("Subscriber must be a function");
        }
        this.events[eventName] = this.events[eventName] || [];
        if (!this.events[eventName].includes(fn)) {
            this.events[eventName].push(fn);
        }
    },

    /**
     * Unsubscribe from an event.
     * 
     * @param {string} eventName - The name of the event to unsubscribe from.
     * @param {function} fn - The function which accepts a single argument from the event.
     */
    unsubscribe: function(eventName, fn) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }

        if (typeof fn != "function") {
            throw new Error("Unsubscriber must be a function");
        }
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] == fn) {
                    this.events[eventName].splice(i, 1);
                    i--;
                }
            }
        }
    },

    /**
     * Publish an event.
     * 
     * @param {string} eventName - The name of the event to publish to.
     * @param {any} data - The data of the event.
     */
    publish: function(eventName, data) {
        if (typeof eventName != "string") {
            throw new Error("Event name must be a string");
        }
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};
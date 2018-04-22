# Event Bus JS

A simple event bus framework for JavaScript.


## Installation
Just add the event_bus.js file to your project and include it with:

```html
<script src="event_bus.js"></script>
```

## Usage
The Event Bus framework only provides three methods to subscribe, publish, or unsubscribe from events.

### Subscribe
```javascript
EventBus.subscribe("testEvent", function(data){
  // Do something with data
  console.log(data);
});
```

### Publish
```javascript
EventBus.publish("testEvent", 3);
```

### Unsubscribe
```javascript
EventBus.unsubscribe("testEvent", function(data){});
```

### Example
```javascript
var square = function(number){
  console.log(number * number);
};

EventBus.subscribe("numbers", console.log);
EventBus.subscribe("numbers", square);

EventBus.publish("numbers", 1);
EventBus.publish("numbers", 2);

EventBus.unsubscribe("numbers", square);

EventBus.publish("numbers", 3);

```

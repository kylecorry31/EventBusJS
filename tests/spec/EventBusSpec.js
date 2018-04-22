describe("EventBus", function() {
  beforeEach(function() {
    EventBus.events = {};
  });

  it("should be able to subscribe and publish", function() {
    var i = 0;
    EventBus.subscribe("i", function(data){
      i = data;
    });
    expect(i).toEqual(0);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
  });

  it("should be able to unsubscribe", function() {
    var i = 0;
    var setI = function(data){
      i = data;
    };
    EventBus.subscribe("i", setI);
    expect(i).toEqual(0);
    EventBus.unsubscribe("i", setI)
    EventBus.publish("i", 1);
    expect(i).toEqual(0);
  });

  it("should be able to publish to multiple topics", function(){
    var i = 0;
    var j = 0;
    EventBus.subscribe("i", function(data){
      i = data;
    });
    EventBus.subscribe("j", function(data){
      j = data;
    });
    expect(i).toEqual(0);
    expect(j).toEqual(0);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
    expect(j).toEqual(0);
    EventBus.publish("j", 2);
    expect(i).toEqual(1);
    expect(j).toEqual(2);
  });

  it("should be able to subscribe to multiple topics", function(){
    var i = 0;
    var setI = function(data){
      i = data;
    };
    EventBus.subscribe("i", setI);
    EventBus.subscribe("setI", setI);
    expect(i).toEqual(0);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
    EventBus.publish("setI", 2);
    expect(i).toEqual(2);
  });

  it("should not error if there are no subscribers", function(){
    expect(function(){ EventBus.publish("test", 1); } ).not.toThrow();
  });

  it("should be able to publish to multiple subscribers", function(){
    var i = 0;
    var j = 0;
    EventBus.subscribe("i", function(data){
      i = data;
    });
    EventBus.subscribe("i", function(data){
      j = data;
    });
    expect(i).toEqual(0);
    expect(j).toEqual(0);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
    expect(j).toEqual(1);
  });

  it("should only allow the same subscriber once", function(){
    var i = 0;
    var incrementI = function(data){
      i++;
    };
    EventBus.subscribe("i", incrementI);
    EventBus.subscribe("i", incrementI);
    expect(i).toEqual(0);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
    EventBus.unsubscribe("i", incrementI);
    EventBus.publish("i", 1);
    expect(i).toEqual(1);
  });

  it("should not allow non-string event names", function(){
    expect(function(){ EventBus.publish(7, "test"); } ).toThrow();
    expect(function(){ EventBus.subscribe(7, function(data){}); } ).toThrow();
    expect(function(){ EventBus.unsubscribe(7, function(data){}); } ).toThrow();
  });

  it("should not allow non-function subscribers or unsubscribers", function(){
    expect(function(){ EventBus.subscribe("test", "test"); } ).toThrow();
    expect(function(){ EventBus.unsubscribe("test", "test"); } ).toThrow();
  });

  it("should not complain if a function unsubscribes that wasn't subscribed", function(){
    expect(function(){ EventBus.unsubscribe("test", function(data){}); } ).not.toThrow();
  });
});

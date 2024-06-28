const logEvents = require("./logEvents.js");
const {EventEmitter} = require("events");

class MyEmitter extends EventEmitter {}

// initalize the object
const myEmitter = new MyEmitter();

// listen for the event
myEmitter.on("log", (msg) => {
    logEvents(msg);
});

// emit the event
myEmitter.emit("log", "This is a log message");

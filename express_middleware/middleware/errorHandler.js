const {logEvents} = require("./logEvents");

// format the error message for logging and console output
const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, "errLog.txt");
    console.error(err.stack);
    res.status(500).send(err.message);
};

// Export the errorHandler function so that it can be used in server.js
module.exports = errorHandler;

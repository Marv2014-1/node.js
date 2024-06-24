// How does note differ from vanilla JS?
// 1) Node runs on the server, not the browser
// 2) The console in in the terminal, not the browser console

console.log("Hello, World!");

// 3) global object instead of window object
// console.log(global);

// 4) has common core modules
// 5) CommonJS modules instead of ES6 modules
// 6) some APIs are different such as fetch

// #region can get system info
const os = require("os");

console.log("Type: " + os.type());
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("CPUs: " + os.cpus().length);
console.log("Uptime: " + os.uptime());
console.log("User Info: " + os.userInfo());
console.log("Total Memory: " + os.totalmem());
console.log("Free Memory: " + os.freemem());
console.log("Home Dir: " + os.homedir());
console.log("Host Name: " + os.hostname());
console.log("Network Interfaces: " + os.networkInterfaces());
console.log("Release: " + os.release());
console.log("Temp Dir: " + os.tmpdir());
console.log("Endianness: " + os.endianness());
console.log("Load Average: " + os.loadavg());

// filename within path module
const path = require("path");
console.log("\nPath Module: \n");
// get the filepath to the current file
console.log("Filename: " + path.dirname(__filename));
// get the filename of the current file
console.log("Filename: " + path.basename(__filename));
// get the extension of the current file
console.log("Extension: " + path.extname(__filename));

// parse and log the object
console.log("Parse: " + path.parse(__filename));

//#endregion

// #region File System Module
const math = require("./math");

console.log("\nMath Module: \n");

console.log(math.add(1, 2));
console.log(math.subtract(1, 2));
console.log(math.multiply(1, 2));
console.log(math.divide(1, 2));

// #endregion

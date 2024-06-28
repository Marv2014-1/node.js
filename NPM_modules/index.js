// NPM modules are installed in the node_modules folder, these are installed globaly and can be used in any project.

// npm install nodemon -g allows you to run the server without having to restart it every time you make a change.

console.log("Hello World");

// npm init -y creates a package.json file with default settings.
// This init will allow us to quickly install packages on another machine that
//are saved in the project.

// Run npm init -y to create a package.json file with default settings. This command will allow us to quickly install packages on another machine that are saved in the project.

// npm instal date-fns installs the date-fns package as a dependancy in the
// package.json file. Depenancies that we add can have other dependencies.

// npm install will install all the dependencies in the package.json file.

const {format} = require("date-fns/format");
const result = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
console.log(result);

// we can define scripts in the package.json file to run commands. We can run the script with npm run scriptName.

// npm install uuid installs the uuid package.
const {v4: uuid} = require("uuid");

console.log(uuid());

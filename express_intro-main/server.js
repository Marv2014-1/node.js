const express = require("express");
// Create an Express application
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// app.get("/", (req, res) => {
//     // send() can send a string, buffer, JSON object, or an array
//     res.send("Hello World!");
// });

// regex - must begin with a slash or have index.html (.html being optional)
app.get("^/$|/index(.html)?", (req, res) => {
    // res.sendFile("./views/index.html", {root: __dirname});
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    // use this to redirect from a noneexistent page
    res.redirect(301, "/new-page"); // 302 by defult
});

// app.get("/*", (req, res) => {
//     // this is a catch all that do not exist
//     res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
// });

// example of handlers

const one = (req, res, next) => {
    console.log("Middleware 1");
    next();
};

const two = (req, res, next) => {
    console.log("Middleware 2");
    next();
};

const three = (req, res) => {
    console.log("Middleware 3");
    res.send("Hello World!");
};

// route handlers allows us to execute a sequence of functions
app.get("/middleware", one, two, three);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import the middleware and necessary libraries
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// currly braces indicate that more then one property is being imported
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
// the logger must come first so that it can log the request before it is handled by other middleware
app.use(logger);

// Cross Origin Resource Sharing
// CPRS is a security feature implemented in browsers to restrict web pages from making requests to a different domain, we must enable CORS to allow requests from different domains
const whitelist = ["https://www.google.com", "http://localhost:3500"];
// fetch("http://localhost:3500/");
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
    //res.sendFile('./views/index.html', { root: __dirname });
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
    res.redirect(301, "/new-page.html"); //302 by default
});

// Route handlers
app.get(
    "/hello(.html)?",
    (req, res, next) => {
        console.log("attempted to load hello.html");
        next();
    },
    (req, res) => {
        res.send("Hello World!");
    }
);

// chaining route handlers
const one = (req, res, next) => {
    console.log("one");
    next();
};

const two = (req, res, next) => {
    console.log("two");
    next();
};

const three = (req, res) => {
    console.log("three");
    res.send("Finished!");
};
// chain middleware sequence
app.get("/chain(.html)?", [one, two, three]);

// return 404 for all other routes
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({error: "404 Not Found"});
    } else {
        res.type("txt").send("404 Not Found");
    }
});

// error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server functionality dependencies
const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;

// event logger dependencies
const logEvents = require("./logEvents.js");
const {EventEmitter} = require("events");
class Emitter extends EventEmitter {}

// initalize the object
const myEmitter = new Emitter();

// create the server and define the server port
const PORT = process.env.PORT || 3000;

// if everything is ok, the server will respond with the requested file
const serveFile = async (filePath, contentType, responce) => {
    try {
        const rawdata = await fsPromises.readFile(
            filePath,
            !contentType.includes("image") ? "utf8" : ""
        );
        const data =
            contentType === "application/json" ? JSON.parse(rawdata) : rawdata;

        responce.writeHead(200, {"Content-Type": contentType});

        console.log(JSON.stringify(data));

        responce.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        responce.statusCode = 500;
        responce.end(`Server Error: ${error}`);
    }
};

// create the server and handle requests
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} received. ${req.method} method.`);

    // handle the request
    const extention = path.extname(req.url);

    let contentType;

    // try to determine the content type
    switch (extention) {
        case ".html":
            contentType = "text/html";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".jpg":
            contentType = "image/jpg";
            break;
        default:
            contentType = "text/plain";
    }

    // dynamically determine the file path
    let filePath;

    if (req.url === "/") {
        // Serve index.html for root requests
        filePath = path.join(__dirname, "views", "index.html");
        console.log("Serving index.html for root request");
    } else if (req.url.slice(-1) === "/") {
        // Append index.html for directory requests
        filePath = path.join(__dirname, "views", req.url, "index.html");
        console.log("Serving index.html for directory request");
    } else {
        // Serve file as is for other requests
        filePath = path.join(__dirname, "views", req.url);
        console.log("Serving file based on direct request");
    }

    // Extract the extension from the URL, if any
    const urlParts = req.url.split(".");
    const extension = urlParts.length > 1 ? urlParts[urlParts.length - 1] : "";

    // If the extension was not included in the file path and the URL does not end with a slash
    if (!extension && req.url.slice(-1) !== "/") {
        filePath = path.join(__dirname, "views", req.url + ".html");
        contentType = "text/html"; // we assume the file is an HTML file
        console.log("Serving file based on extension-less request");
    }
    // check if the file exists
    const fileExists = fs.existsSync(filePath);

    // if the file exists, serve it, otherwise serve a 404 page
    if (fileExists) {
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case "old-page.html":
                res.writeHead(301, {Location: "/new-page.html"});
                res.end();
                break;
            case "www-page.html":
                res.writeHead(301, {Location: "/index.html"});
                res.end();
                break;
            case "data.json":
                serveFile(
                    path.join(__dirname, "data", "data.json"),
                    "application/json",
                    res
                );
                break;
            case "OIP.img":
                serveFile(
                    path.join(__dirname, "img", "OIP.img"),
                    "image/png",
                    res
                );
                break;
            default:
                serveFile(
                    path.join(__dirname, "views", "404.html"),
                    "text/html",
                    res
                );
        }
    }
});

// listening for requests
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Read and write

// allows us to work with the path on our computer
const path = require("path");
// allows us to work with the file system on our computer
const fs = require("fs");
// Allows us to use promises with the file system module
const fsPromises = require("fs").promises;

// #region File System Module
fs.readFile(__dirname + "/files/starter.txt", (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log(data.toString());
    }
});

// read file synchronous
console.log("this should be second");

// exit on uncaught exception
process.on("uncaughtException", (err) => {
    console.error(err);
    process.exit(1);
});
// #endregion

// #region using the path module

// this avoids hardcoding the path
fs.readFile(
    path.join(__dirname, "files", "starter.txt"),
    "utf8",
    (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data + " using path module");
        }
    }
);

//#endregion

// #region writing to a file
fs.writeFile(
    path.join(__dirname, "files", "reply.txt"),
    "Hello World",
    (err) => {
        if (err) {
            throw err;
        } else {
            console.log("File written to... __dirname/files/reply.txt");
        }
    }
);

//#endregion

// #region appending to a file
fs.appendFile(
    path.join(__dirname, "files", "test.txt"),
    "Appending to the file",
    (err) => {
        if (err) {
            throw err;
        } else {
            console.log("File appended to... __dirname/files/reply.txt");
        }
    }
);

//#endregion

// #region accounting for async operations

// This is a method of acounting for async operations as the otermost function will occur first and then the inntermost functions will occur. However, this is not the best way to do this as it can get very messy very quickly. (similar to callback hell)

fs.writeFile(
    path.join(__dirname, "files", "async.txt"),
    "creating a file",
    (err) => {
        if (err) throw err;
        console.log("file created");

        fs.appendFile(
            path.join(__dirname, "files", "async.txt"),
            "appending",
            (err) => {
                if (err) throw err;
                console.log("file appended");

                fs.rename(
                    path.join(__dirname, "files", "async.txt"),
                    path.join(__dirname, "files", "async_renamed.txt"),
                    (err) => {
                        if (err) throw err;
                        console.log("file renamed");
                    }
                );
            }
        );
    }
);

//#endregion

// #region using promises

// this method accounts for the async problem but in a much cleaner way. This is done by using promises. This is a much cleaner way to account for async operations.

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(
            path.join(__dirname, "files", "starter.txt"),
            "utf8"
        );
        console.log("-------------------Using Promises-------------------");
        console.log(data + " using promises");

        await fsPromises.writeFile(
            path.join(__dirname, "files", "promiseWrite.txt"),
            "this is a promise write"
        );
        await fsPromises.appendFile(
            path.join(__dirname, "files", "promiseWrite.txt"),
            " this is a promise append"
        );

        await fsPromises.rename(
            path.join(__dirname, "files", "promiseWrite.txt"),
            path.join(__dirname, "files", "promiseWriteRenamed.txt")
        );

        console.log("-----------------------------------------------------");
    } catch (error) {
        console.error(error);
    }
};

fileOps();

//#endregion

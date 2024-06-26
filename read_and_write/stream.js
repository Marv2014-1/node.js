// streams are objects that let you read data from a source or write data to a destination in continuous fashion

const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
    encoding: "utf8",
});

const ws = fs.createWriteStream(path.join(__dirname, "files", "new-lorem.txt"));

rs.on("data", (chunk) => {
    console.log("---- NEW CHUNK ----");
    console.log(chunk);
    ws.write("\n---- NEW CHUNK ----\n");
    ws.write(chunk);
});

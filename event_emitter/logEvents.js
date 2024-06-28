const {format} = require("date-fns");
const {v4: uuid} = require("uuid");

const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");

// this method logs the date and time of an event along with generating a unique id for the event.
const logEvents = async (messages) => {
    const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    const id = uuid();
    const log = `${date}\t[${id}]\t${messages}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "logs"));
        }
        await fsPromises.appendFile(
            path.join(__dirname, "logs", "eventLog.txt"),
            log
        );
    } catch (error) {
        console.error(error);
    }
};

// export the logEvents function
module.exports = logEvents;

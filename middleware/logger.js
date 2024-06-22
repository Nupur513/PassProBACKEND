const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid'); // Correct import statement

const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');

const logevents = async (message, logfilename) => {
    const datetime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logitem = `${datetime}\t${uuidv4()}\t${message}\n`; // Correct usage

    try {
        const logDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(logDir)) {
            await fspromises.mkdir(logDir);
        }
        await fspromises.appendFile(path.join(logDir, logfilename), logitem);
    } catch (error) {
        console.log(error);
    }
};

const logger = (req, res, next) => {
    logevents(`${req.method} ${req.url} ${req.headers.origin}`, 'reqlog.log'); // Corrected template string
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logevents, logger };

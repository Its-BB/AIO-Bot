const fs = require('fs');
const path = require('path');

function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}\n`;
    console.log(logMessage);
    fs.appendFileSync(path.join(__dirname, '../logs.txt'), logMessage);
}

module.exports = { log };
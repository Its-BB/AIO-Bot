const fs = require('fs');
const path = require('path');

function initDatabase(db) {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    db.exec(schema, (err) => {
        if (err) console.error('Database initialization error:', err);
        else console.log('Database schema initialized');
    });
}

module.exports = { initDatabase };
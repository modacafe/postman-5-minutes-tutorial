const jsonfile = require('jsonfile');
const path = require('path');
const DB_PATH = path.join(__dirname, '../tasks.json');

function render(res, error, message) {
    if (error === 404) {
        res.status(404).send('Not Found')
        return;
    }

    jsonfile.readFile(DB_PATH, function (err, db) {
        if (err) {
            console.error(err);
        } else {
            if (typeof message !== 'string') {
                res.json(message)
            } else {
                res.status(200).send(message);
            }

            
        }
    });
}

module.exports = render;
const jsonfile = require('jsonfile');
const path = require('path');
const DB_PATH = path.join(__dirname, '../tasks.json');

function render(res, error, message) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            res.render('index', {
                tasks: db.tasks,
                error: error,
                message: message
            });
        }
    });
}

module.exports = render;
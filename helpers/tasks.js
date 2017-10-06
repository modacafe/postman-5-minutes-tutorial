const jsonfile = require('jsonfile');
const path = require('path');
const DB_PATH = path.join(__dirname, '../tasks.json');

function getTask(id, callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        try {
            if (err) {
                console.error(err);
                callback(err);
                process.exit(1);
            } else {
                const task = db.tasks[id];
                if (task) {
                    callback(task);
                } else {
                    callback(404);
                }
            }
        } catch (error) {
            callback(404);
        }
    });
}

function createTask(data, callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        if (err) {
            console.error(err);
            callback(err);
            process.exit(1);
        } else {
            const task = {
                title: data.title,
                body: data.body,
                done: data.done
            };
            db.tasks.push(task);
            jsonfile.writeFile(DB_PATH, db, function (err) {
                if (err) {
                    console.error(err);
                    callback(err);
                    process.exit(1);
                } else {
                    callback(task);
                }
            });
        }
    });
}

function updateTask(data, callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        try {
            if (err) {
                console.error(err);
                callback(err);
                process.exit(1);
            } else {
                if (db.tasks[data.id]) {
                    const updatedTask = {
                        title: data.title.trim() || db.tasks[id].title,
                        body: data.body.trim() || db.tasks[id].body,
                        done: !!data.done
                    };
                    db.tasks[data.id] = updatedTask;
                    jsonfile.writeFile(DB_PATH, db, function (err) {
                        if (err) {
                            console.error(err);
                            callback(err);
                            process.exit(1);
                        } else {
                            callback(db.tasks[data.id]);
                        }
                    });
                } else {
                    callback(404);
                }
            }
        } catch (error) {
            callback(404);
        }
    });
}

function deleteTask(data, callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        try {
            if (err) {
                console.error(err);
                callback(err);
                process.exit(1);
            } else {
                if (db.tasks[data.id]) {
                    db.tasks.splice(data.id, 1);
                    jsonfile.writeFile(DB_PATH, db, function (err) {
                        if (err) {
                            console.error(err);
                            callback(err);
                            process.exit(1);
                        } else {
                            callback(200);
                        }
                    });
                } else {
                    callback(404);
                }
            }
        } catch (error) {
            callback(404);
        }
    });
}

module.exports = {
    get: getTask,
    create: createTask,
    update: updateTask,
    delete: deleteTask,
}
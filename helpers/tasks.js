const jsonfile = require('jsonfile');
const path = require('path');
const DB_PATH = path.join(__dirname, '../tasks.json');

function getTasks(callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        try {
            if (err) {
                console.error(err);
                callback(err);
                process.exit(1);
            } else {
                let tasks = db.tasks;
                tasks = tasks.map((task, index) => {
                    task.id = index + 1;
                    return task
                })
                if (tasks) {
                    callback(tasks);
                } else {
                    callback(404);
                }
            }
        } catch (error) {
            callback(404);
        }
    });
}

function getTask(id, callback) {
    jsonfile.readFile(DB_PATH, function (err, db) {
        try {
            if (err) {
                console.error(err);
                callback(err);
                process.exit(1);
            } else {
                const task = db.tasks.find(task => task.id === id);
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
                id: db.tasks.length,
                title: data.title,
                description: data.description,
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
                const task = db.tasks.find(task => task.id === data.id);
                if (task) {
                    const updatedTask = {
                        id: task.id,
                        title: data.title.trim() || task.title,
                        description: data.description || task.description,
                        done: !!data.done
                    };
                    db.tasks = db.tasks.map(task => {
                        if (task.id === updatedTask.id) {
                            return updatedTask
                        }
                        return task;
                    })
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
                const task = db.tasks.find(task => task.id == data.id);
                if (task) {
                    db.tasks = db.tasks.filter(task => task.id !== data.id)
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
    getTasks: getTasks,
    create: createTask,
    update: updateTask,
    delete: deleteTask,
}
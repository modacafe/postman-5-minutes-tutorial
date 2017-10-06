const path = require('path');
const express = require('express');
const renderTasks = require('../helpers/renderTasks.js');
const tasks = require('../helpers/tasks.js');
const router = express.Router();

/* if we want to add a new verion it would be easy to create a enw path with /api/v2/task */
const API_V1_PATH = '/v1/';
const TASK_PATH = API_V1_PATH + 'task';

/* READ api task. */
router.get(TASK_PATH, function(req, res) {
  const id = parseInt(req.query.taskId, 10);
  if (id >= 0) {
    tasks.get(id, function (item) {
      if (item === 404) {
        renderTasks(res, 'Task Not Found');
      } else {
        renderTasks(res, null, `
          Task received 
          Task ID: ${id}
          Task Title: ${item.title}
          Task Body: ${item.body}
          Task Done: ${item.body ? 'Yes' : 'No'}
        `);
      }
    });
  } else {
    renderTasks(res, 'ID is required');
  }
});

/* CREATE api task. */
router.post(TASK_PATH + '/create', function(req, res) {
  const title = req.body.title;
  const body = req.body.body;
  const done = req.body.done === 'on';

  if (title && title.trim().length && body && body.trim().length) {
    tasks.create({
      title,
      body,
      done
    }, function(item) {
      renderTasks(res, null, 'Task Created');
    });
  } else {
    renderTasks(res, 'Title and Body are required');
  }
});

/* UPDATE api task. */
router.post(TASK_PATH + '/update', function (req, res) {
  const id = parseInt(req.body.taskId, 10);
  const title = req.body.title;
  const body = req.body.body;
  const done = req.body.done === 'on';
  if (id >= 0) {
    tasks.update({
      id,
      title,
      body,
      done
    }, function (item) {
      if (item === 404) {
        renderTasks(res, 'Task Not Found');
      } else {
        renderTasks(res, null, 'Task Updated');
      }
    });
  } else {
    renderTasks(res, 'ID and either Title or Body are required');
  }
});

/* DELETE api task. */
router.post(TASK_PATH + '/delete', function (req, res) {
  const id = parseInt(req.body.taskId, 10);
  if (id >= 0) {
    tasks.delete({
      id
    }, function (item) {
      if (item === 404) {
        renderTasks(res, 'Task Not Found');
      } else {
        renderTasks(res, null, 'Task Deleted');
      }
    });
  } else {
    renderTasks(res, 'ID is required');
  }
});

module.exports = router;

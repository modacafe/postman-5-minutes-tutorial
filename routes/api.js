const path = require('path');
const express = require('express');
const renderTasks = require('../helpers/renderTasks.js');
const tasks = require('../helpers/tasks.js');
const router = express.Router();

/* if we want to add a new verion it would be easy to create a enw path with /api/v2/task */
const API_V1_PATH = '/v1/';
const TASK_PATH = API_V1_PATH + 'tasks';

router.get(`${TASK_PATH}`, function(req, res) {
  tasks.getTasks(function (allTasks) {
    renderTasks(res, null, allTasks)
  })
});

/* READ api task. */
router.get(`${TASK_PATH}/:id`, function(req, res) {
  const id = parseInt(req.params.id, 10);
  if (id >= 0) {
    tasks.get(id, function (item) {
      if (item === 404) {
        renderTasks(res, 404);
      } else {
        renderTasks(res, null, {
          id: item.id,
          title: item.title,
          description: item.description,
          done: item.done,
        });
      }
    });
  } else {
    renderTasks(res, 'ID is required');
  }
});

/* CREATE api task. */
router.post(TASK_PATH, function(req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done;

  if (title && title.trim().length && description && description.trim().length) {
    tasks.create({
      title,
      description,
      done
    }, function(item) {
      renderTasks(res, null, 'Task Created');
    });
  } else {
    renderTasks(res, 'Title and Body are required');
  }
});

/* UPDATE api task. */
router.put(`${TASK_PATH}/:id`, function (req, res) {
  const id = parseInt(req.params.id, 10);
  const title = req.body.title;
  const description = req.body.description;
  const done = req.body.done === 'on';
  if (id >= 0) {
    tasks.update({
      id,
      title,
      description,
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
router.delete(`${TASK_PATH}/:id`, function (req, res) {
  const id = parseInt(req.params.id, 10);
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

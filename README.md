# visi
A Node.js REST JSON API with Express

run `yarn` to install dependencies
and then run `yarn start` and go to [http://localhost:3000/](http://localhost:3000/) in your browser

API V1:
To read a task by id
GET `/api/v1/task?taskId=<Task ID>`

To create a task
POST `/api/v1/task/create`
```body: {
  title: String Required!,
  body: String Required!,
  done: Boolean,
}```

To update a task by id
POST `/api/v1/task/update`
```body: {
  taskId: Number Required!,
  title: String,
  body: String,
  done: Boolean,
}```

To delete a task by id
POST `/api/v1/task/delete`
```body: {
  taskId: Number Required!,
}```

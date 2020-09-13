run `yarn` to install dependencies
and then run `yarn start` and go to [http://localhost:3000/](http://localhost:3000/) in your browser

API V1:
To read a task by id
GET `/api/v1/tasks/:id`

To create a task
POST `/api/v1/tasks`
```
body: {
  title: String Required!,
  description: String Required!,
  done: Boolean,
}
```

To update a task by id
PUT `/api/v1/tasks/:id`
```
body: {
  id: Number Required!,
  title: String,
  description: String,
  done: Boolean,
}
```

To delete a task by id
DELETE `/api/v1/tasks/1`
```
body: {
  id: Number Required!,
}
```

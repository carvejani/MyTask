'use strict';

const express = require('express');
const mongoose = require('./db/mongoose');
const bodyParser = require('body-parser');
const { List, Task } = require('./db/models');
const app = express();

//Carregar Model
const list = require('./models/list');

//Carregar Rota
const listRoute = require('./routes/list-route');

app.use('/list', listRoute);

module.exports = app;





//======================================================================


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/lists', (req, res) => {
  List.find({})
    .then(lists => {
      res.send(lists);
    })
    .catch(e => {
      res.send(e);
    });
});

app.post('/lists', (req, res) => {
  let title = req.body.title;
  let newList = new List({
    title
  });
  newList.save().then(listDoc => {
    res.send(listDoc);
  });
});

app.patch('/lists/:id', (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: req.body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/lists/:id', (req, res) => {
  List.findOneAndRemove({
    _id: req.params.id
  }).then(removeListDoc => {
    res.send(removeListDoc);
  });
});

app.post('/lists/:listId/tasks', (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId
  });
  newTask.save().then(newTaskDoc => {
    res.send(newTaskDoc);
  });
});

app.get('/lists/:listId/tasks', (req, res) => {
  Task.find({
    _listId: req.params.listId
  }).then(tasks => {
    res.send(tasks);
  });
});

app.get('/lists/:listId/tasks/:tasksId', (req, res) => {
  Task.findOne({
    _id: req.params.tasksId,
    _listId: req.params.listId
  }).then(task => {
    res.send(task);
  });
});

app.patch('/lists/:listId/tasks/:tasksId', (req, res) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.tasksId,
      _listId: req.params.listId
    },
    {
      $set: req.body
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete('/lists/:listId/tasks/:tasksId', (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.tasksId,
    _listId: req.params.listId
  }).then(removedTaskDoc => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

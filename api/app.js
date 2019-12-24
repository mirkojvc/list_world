import { ApolloServer, AuthenticationError } from 'apollo-server-express';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const jwt = require("jsonwebtoken")
const mongoose =  require('mongoose');


import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/User';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testDBRouter = require('./routes/testDB');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testDB', testDBRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = null;//await getUser(req);

      return {
        me,
        models: {
          userModel
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5000, () => {
  mongoose.connect('mongodb://mongodb:27017/graphql');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

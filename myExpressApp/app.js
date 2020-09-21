// // this file was given to me upon the creation of the Express installation in the terminal
// // as instructed per visual studio code online setup https://code.visualstudio.com/docs/nodejs/nodejs-tutorial
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();
// app.get('/', function(req, res)
// {
//   res.send('GOAT IS HERE');
// });
// app.listen(3000, function () { // Set callback action fcn on network port.
//   console.log('app.js listening on port 3000!');
// });

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

// console.log("You're GOATED");

// File: app.js
// Load the Express builder functions
const express = require('express');
const path = require('path');

// Init an Express object
const app = express();

// Load View Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set page-gen fcn for URL root request
app.get('/', function (request, response) 
{ 
  let articles = [
    {
      id: 1, 
      title: 'Article One',
      author: "Deron Washington II",
      body: 'This is article one'
    },
    {
      id: 2, 
      title: 'Article Two',
      author: "DGOAT",
      body: 'This is article two'
    },
    {
      id: 3, 
      title: 'Article Three',
      author: "DFAT",
      body: 'This is article three'
    }
  ];

    response.render('index', {
      title: 'TeamDJ Version Control System (v1.0.0)',
      articles: articles
    });
});

// Add Route
app.get('/articles/add', function (req, res){
  res.render('add_article', {
    title: 'add OTIS'
  });
});

// Start Server
app.listen(3000, function (req, res) 
{ 
  console.log('app.js listening on port 3000!');
}); // https://discord.com/channels/738205874929270815/738205874929270818/756227895478845556 

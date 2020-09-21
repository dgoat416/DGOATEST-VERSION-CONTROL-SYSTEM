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
// const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser')
var fs = require('fs');
const { raw } = require('express');

// // Init an Express object
// const app = express();

// Load View Engine 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(bodyParser.urlencoded({extended : true}));

// // Set page-gen fcn for URL root request
// app.get('/', function (request, response) 
// { 
//    return response.render('index', {
//       title: 'TeamDJ Version Control System (v1.0.0)'
//     });
// });


// app.get('/submit-repo-info', function(request, response){

// navigate to a new page
// response.render('submit-repo-info', {
//   result: 'Your repository has been created from ' + currentProjectDir + ' and stored '
//   + newRepositoryDir + ' and named ' + 'myFirstRepo'
// });

// });


// app.use(express.static('/'));
// // handle a client side action request
// app.get('/get-form-text', function(request, response){
//   // gives me the current project directory to take snapshot from
//   var currentProjectDir = request.query.currProjectDir;

//   // gives me the directory where the repository will be stored
//   var newRepositoryDir = request.query.newRepoDir;

//   // output our text to the console
//   console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
  
//   // send our text back to the client side within this form
//   response.send('Your Text: ' + currentProjectDir + ' for ' + newRepositoryDir);


//   // create the repository
// var files = fs.readdirSync(currentProjectDir);
// console.log(files);
//   // path.resolve()

// });

// Add Route
// app.get('/articles/add', function (req, res){
//   res.render('add_article', {
//     title: 'add OTIS'
//   });
// });

// // Start Server
// app.listen(3000, function (req, res) 
// { 
//   console.log('app.js listening on port 3000!');
// }); // https://discord.com/channels/738205874929270815/738205874929270818/756227895478845556 












/*
Method to take a snapshot of a directory
@param source = source directory to copy from
@param dest   = destination directory to copy source to
@param callback = callback method
*/
function snapshot(source, dest, callback)
{
  // import recursive-copy package
  var copy = require('recursive-copy');

  // perform a copy of the source directory
  // copy(source, destination, callback)
  copy(source, dest, function(error, results) {
      if (error) {
          console.error('Copy failed: ' + error);
      } else {
          console.log(results);
          console.info('Copied ' + results.length - 1 + ' files');
      }
  });
}


var currPath = 'C:\\Users\\HP\\Documents\\Current Classes\\PSY 150'//'C:\\Users\\HP\\Documents\\JS Test Folder';
var repoPath = 'C:\\Users\\HP\\Documents\\Repos\\Repo1';

// create the repository  
snapshot(currPath, repoPath);

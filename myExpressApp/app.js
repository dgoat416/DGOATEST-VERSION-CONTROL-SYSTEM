// File: app.js
// Load the Express builder functions
const path = require('path');
const express = require('express');

// Init an Express object
const app = express();

//Load View Engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set page-gen fcn for URL root request
app.get('/', function (request, response) 
{ 
   return response.render('index', {
      title: 'TeamDJ Version Control System (v1.0.0)'
    });
});


// app.get('/submit-repo-info', function(request, response){

// // navigate to a new page
// response.render('submit-repo-info', {
//   result: 'Your repository has been created from ' + currentProjectDir + ' and stored '
//   + newRepositoryDir + ' and named ' + 'myFirstRepo'
// });
// });


// app.use(express.static('/'));
// handle a client side action request
app.get('/get-form-text', function(request, response){
    response.render('get-form-text');

  // gives me the current project directory to take snapshot from
  var currentProjectDir = request.query.currProjectDir;

  // gives me the directory where the repository will be stored
  var newRepositoryDir = request.query.newRepoDir;

  // output our text to the console
  console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
  
  // send our text back to the client side within this form
  response.send('Your repository has been created from ' + currentProjectDir + ' and stored '
  + newRepositoryDir + ' and named ' + 'myFirstRepo');

  // create the repository  
snapshot(currentProjectDir, newRepositoryDir);
console.log('Repository created from ' + currentProjectDir + '  for `{newRepositoryDir}`');

});


// Start Server
app.listen(3000, function (req, res) 
{ 
  console.log('app.js listening on port 3000!');
}); // https://discord.com/channels/738205874929270815/738205874929270818/756227895478845556 













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


// var currPath = 'C:\\Users\\HP\\Documents\\Current Classes\\PSY 150'//'C:\\Users\\HP\\Documents\\JS Test Folder';
// var repoPath = 'C:\\Users\\HP\\Documents\\Repos\\Repo1';

// create the repository  
// snapshot(currPath, repoPath);

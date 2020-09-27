// File: app.js
// Load the Express builder functions
const path = require('path');
const express = require('express');
const fs = require('fs');

// Init an Express object
const app = express();

// //Load View Engine 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// // Set page-gen fcn for URL root request
// app.get('/', function (request, response) 
// { 
//    return response.render('index', {
//       title: 'TeamDJ Version Control System (v1.0.0)'
//     });
// });


// // app.get('/submit-repo-info', function(request, response){

// // // navigate to a new page
// // response.render('submit-repo-info', {
// //   result: 'Your repository has been created from ' + currentProjectDir + ' and stored '
// //   + newRepositoryDir + ' and named ' + 'myFirstRepo'
// // });
// // });


// // app.use(express.static('/'));
// // handle a client side action request
// var output_msg = "YOOO";

// app.get('/get-form-text', function(request, response){
//     // gives me the current project directory to take snapshot from
//     var currentProjectDir = request.query.currProjectDir;
  
//     // gives me the directory where the repository will be stored
//     var newRepositoryDir = request.query.newRepoDir;
  
//     // output our text to the console
//     console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
    
//     // send our text back to the client side within this form
//     // response.send('Your repository has been created from ' + currentProjectDir + ' and stored '
//     // + newRepositoryDir + ' and named ' + 'myFirstRepo');
    
    
  
//     // create the repository  
//     created = snapshot(currentProjectDir, newRepositoryDir);
  
//     if (created == true)
//     {
//       output_msg = 'Your repository has been created from ' + currentProjectDir + ' and stored '
//        + newRepositoryDir + ' and named ' + 'myFirstRepo';
//     }
//     else
//       output_msg = "The repository couldn't be created. This is most likely because it already exists at this repo.";
  
//     console.log(output_msg);

//   response.render('get-form-text', {
//   output: output_msg
// });

// });


// // Start Server
// app.listen(3000, function (req, res) 
// { 
//   console.log('app.js listening on port 3000!');
// }); // https://discord.com/channels/738205874929270815/738205874929270818/756227895478845556 













/** 
Method to take a snapshot of a directory
@param source = source directory to copy from
@param dest   = destination directory to copy source to
@param callback = callback method
*/
function snapshot(source, dest, callback)
{

  var allFiles = getFiles(source);
  copyFiles(source, dest, allFiles);

//   // import recursive-copy package
//   // var copy = require('recursive-copy');
//   if (source[source.length - 1] != "\\")
//     source += "\\";

//  var fileList = [];
//  var dir = [];
// //  files.push(fs.readdirSync(source));
// //  //files.push(fs.readFileSync(source));
// //  console.log(files);
// // List all files in a directory in Node.js recursively in a synchronous fashion

// // get all files (or folders) from directory
// fileList = fs.readdirSync(source);

// // loop through the folder and find the directories 
// for (var i = 0; i < fileList.length; i++)
// {
//   // is directory?
//   if(fs.statSync(path.join(source, fileList[i])).isDirectory())
//   {
//     // add to directory list and get every file in the directory
//     // dir.push(fileList[i]);

//     // remove the directory element
//     if (dir.length == 0)
//       dir = fileList.splice(i, 1);
//     else
//       dir = dir.concat(fileList.splice(i, 1));

//     // account for change in size
//     if (i > 0)
//       i -= 1;

//   //   // add all the extra files from dir
//   //  fileList = fileList.concat(snapshot(path.join(source, dir[0]), dest));
    
//   //   // remove from directory
//   //   dir = [];

//     // // break the loop
//     // break;
//   }
// }

//   // add all the extra files from dir
//   for (var i = 0; i < dir.length; i++)
//     fileList = fileList.concat(snapshot(path.join(source, dir[i]), dest));

// return fileList;
//   // var path = path || require('path');
//   // var fs = fs || require('fs'),
//       // files = fs.readdirSync(dir);
//   // filelist = filelist || [];
//   // files.forEach(function(file) {
//   //   if (fs.statSync(path.join(dir, file)).isDirectory()) {
//   //     filelist.push(snapshot(path.join(dir, file), filelist));
//   //   }
//   //   else {
//   //     filelist.push(files);
//   //   }
//   // });
//   // return filelist;

// // console.log(filelist);



//   //while



//   //perform a copy of the source directory
//   // copy(source, destination, callback)
// //  var created_ =  copy(source, dest, function(error, results) {
// //       if (error) {
// //           console.error('Copy failed: ' + error);
// //           return callback(false);
// //       } else {
// //           console.log(results);
// //           console.info('Copied ' + results.length - 1 + ' files');
// //           return callback(true);
// //       }
// //   });

// //   return created_

//  //return true;
}


/**
 * Method to get all the files from a directory
 * recursively
 * @param source = source directory to copy from 
 * @return 
 *        = a list of all files throught all possible paths of the directory
 */
function getFiles(source)
{
  // will hold all the files in the directory (recursively)
  var fileList = [];

  // will hold all the directories embedded in the source directory
  var dir = [];

  // make sure that source has the last backslash
  if (source[source.length - 1] != "\\")
    source += "\\";

// get all files (or embedded directories) from source directory
fileList = fs.readdirSync(source);

// loop through the new files/embedded directories list and find all the directories 
for (var i = 0; i < fileList.length; i++)
{
  // is directory?
  if(fs.statSync(path.join(source, fileList[i])).isDirectory())
  {
    // remove the directory element 
    // takes into account the special rules for splice function
    // and rules for adding based off the size of the array
    if (dir.length == 0)
      dir = fileList.splice(i, 1);
    else
      dir = dir.concat(fileList.splice(i, 1));

    // account for change in size of the files list above
    if (i > 0)
      i -= 1;
  }
}

  // add all the extra files from dir
  for (var i = 0; i < dir.length; i++)
    fileList = fileList.concat(getFiles(path.join(source, dir[i])));

  
  return fileList;  
}

/**
 * Method to copy all the files from listOfFiles
 * and put in a new directory
 * @param source = source directory to copy from
 * @param dest   = destination directory to copy source to
 * @param listOfFiles = array of file names (and their extensions)
 */
function copyFiles(source, dest, listOfFiles)
{
  // directory doesn't exist?
  if (!fs.existsSync(dest))
    fs.mkdirSync(dest);

  // make sure the directories are formatted correctly
  // make sure that source and has the last backslash
  if (source[source.length - 1] != "\\")
    source += "\\";
  
  // make sure that dest and has the last backslash
  if (dest[dest.length - 1] != "\\")
    dest += "\\";

  // copy and move each file in listOfFiles 
  for (var i = 0; i < listOfFiles.length; i++)
  {
      try {
      fs.copyFileSync(path.join(source, listOfFiles[i]), path.join(dest, listOfFiles[i]));
    } catch(err) {
      console.log("Failed the copy and move of " + listOfFiles[i] + " !");
      throw err;
    }
  } 
}

var currPath = 'C:\\Users\\HP\\Documents\\Current Classes\\PSY 150';//'C:\\Users\\HP\\Documents\\Current Classes\\CECS 343\\Project 1' //'C:\\Users\\HP\\Documents\\JS Test Folder';
var repoPath = 'C:\\Users\\HP\\Documents\\Repos\\TEAMDJ';

//create the repository  
// var allFiles = getFiles(currPath);

// for (i = 0; i < allFiles.length; i++)
// {
//   console.log(allFiles[i]);
// }

snapshot(currPath, repoPath);
console.log("WORKS!");



// previous callback for get-form-text
// function(){
//   // gives me the current project directory to take snapshot from
//   var currentProjectDir = request.query.currProjectDir;

//   // gives me the directory where the repository will be stored
//   var newRepositoryDir = request.query.newRepoDir;

//   // output our text to the console
//   console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
  
//   // send our text back to the client side within this form
//   // response.send('Your repository has been created from ' + currentProjectDir + ' and stored '
//   // + newRepositoryDir + ' and named ' + 'myFirstRepo');
  
//   output_msg = "The repository couldn't be created. This is most likely because it already exists at this repo.";

//   // create the repository  
//   created = snapshot(currentProjectDir, newRepositoryDir);

//   if (created)
//   {
//     output_msg = 'Your repository has been created from ' + currentProjectDir + ' and stored '
//      + newRepositoryDir + ' and named ' + 'myFirstRepo';
//   }

//   console.log(output_msg);
// };
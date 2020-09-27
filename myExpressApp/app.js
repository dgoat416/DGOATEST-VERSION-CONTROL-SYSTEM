// File: app.js
// Load the Express builder functions
const path = require('path');
const express = require('express');
const fs = require('fs');
const { getegid } = require('process');

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
  // get all files (recursively), make copies and store in dest
  var allFiles = getFiles(source);
  copyFiles(source, dest, allFiles);
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

  // get all files (or embedded directories) from source directory & ignore unnecessary ones
  fileList = ignoreFiles(fs.readdirSync(source));


  // loop through the new files/embedded directories list and find all the directories 
  for (var i = 0; i < fileList.length; i++)
  {
    // convert files list to full path 
    fileList[i] = path.join(source, fileList[i]);
    
    // is directory?
    if(fs.statSync(fileList[i]).isDirectory())
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
    // fileList = fileList.concat(getFiles(path.join(source, dir[i])));
    fileList = fileList.concat(getFiles(dir[i]));

  // return all the files
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
      fs.copyFileSync(listOfFiles[i], path.join(dest, path.basename(listOfFiles[i])));
    } catch(err) {
      console.log("Failed the copy and move of " + listOfFiles[i] + " !");
      throw err;
    }
  } 
}


/**
 * Method to ignore files in a list
 * by deleting them from the list
 * @param listOfFiles = list of files to delete from
 * *** possibly add a ignoreFilesList to make it more robust
 * (which would require creating a binary search tree for all the files
 * and searching through the binary search tree and once I find it 
 * delete it from the tree) ***
 */
function ignoreFiles(listOfFiles)
{
    for (var i = 0; i < listOfFiles.length; i++) 
      if(listOfFiles[i][0] == ".")
        {
          listOfFiles.splice(i, 1);
          i -=1;
        }

  return listOfFiles;
}


/**
 * Method to create the checksum for a string 
 * input variable. The checksum will be generated by 
 * taking each character in a string and multiplying
 * each char by 1, 3, 7, and, 11 in a “loop”
 * Ex. stringInput = "HELLO WORLD" results in the checksum:
 * 4086 = 1*H +3*E +7 *L +11*L + 1*O +3*' ' 
 *        + 7*W + 11*O + 1*R + 3*L +7*D
 * @param {string} stringInput 
 */
function multiplier(stringInput){

  var sum = 0;
  var multiplier = 1;
  for(i = 0; i < stringInput.length; i++){
    switch (multiplier)
    {
      case 1: sum += multiplier * stringInput.charCodeAt(i); 
              multiplier = 3; break;
      case 3: sum += multiplier * stringInput.charCodeAt(i);
              multiplier = 7; break;
      case 7: sum += multiplier * stringInput.charCodeAt(i); 
              multiplier = 11; break;
      case 11: sum += multiplier * stringInput.charCodeAt(i);
              multiplier = 1; break;
    }
  }   

  return sum;
}



var currPath = 'C:\\Users\\HP\\Documents\\Current Classes\\PSY 150';//'C:\\Users\\HP\\Documents\\Current Classes\\CECS 343\\Project 1' //'C:\\Users\\HP\\Documents\\JS Test Folder';
var repoPath = 'C:\\Users\\HP\\Documents\\Repos\\TEAMDJ';

//create the repository  
snapshot(currPath, repoPath);
console.log("WORKS!");

//// testing ignoring dot files
//console.log(getFiles('C:\\Users\\HP\\Documents\\DGOAT WEBSITE'));



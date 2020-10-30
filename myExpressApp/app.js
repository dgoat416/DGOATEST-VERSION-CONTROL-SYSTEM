// /**
//  * Purpose: Create a Version Control System on the web
//  * using JavaScript (Node w/Express), HTML (Jade/Pug), CSS
//  * 
//  * Author: Deron Washington II
//  * Email : Deron.Washington@student.csulb.edu
//  * Last Edit Date: 9/27/20
//  * Version: v.1.0.0 released 9/27/20
//  * 
//  */
// // Load the project requirements
// const path = require('path');
// const express = require('express');
// const fs = require('fs');
// const glob = require('glob');

// // Init an Express object
// const app = express();

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


// // handle a client side action request
// app.get('/get-form-text', function(request, response){
//   // variable declaration for displaying output
//   var output_msg = "YOOO";
//   var created = false;

//   // we can make these jquery action event ---------------------------------------------------------------------
//   // DETERMINE WHICH COMMAND IS BEING EXECUTED
//   // CREATE REPO COMMAND
//   if (request.query.crCurrProjectDir) {
    
//       // gives me the current project directory to take snapshot from
//       var currentProjectDir = request.query.crCurrProjectDir;
    
//       // gives me the directory where the repository will be stored
//       var newRepositoryDir = request.query.crNewRepoDir;
    
//       // output our text to the console
//       console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
      
//       // PERFORM DATA VALIDATION HERE -----------------------
      
//       // create the repository  
//       created = snapshot(currentProjectDir, newRepositoryDir);
    
//       if (created == true)
//       {
//         output_msg = 'Your repository has been created or updated from ' + currentProjectDir + ' and stored here:'
//         + newRepositoryDir;
//       }
//       else
//         output_msg = "The repository couldn't be created. This is most likely because it already exists at this repo.";
    
//       console.log(output_msg);

//       response.render('get-form-text', {
//         output: output_msg
//       });
//   }

  
//   // LABEL COMMAND
//   else if(request.query.clSourceProjectDir)
//   {
//     console.log("I'm here because you clicked the second submit button");
//     // console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1.rc"));

//     // get the new label from the user
//     var newLabel = request.query.clNewLabelName;

//     // get the old manifest/label from the user
//     var oldLabel = request.query.clOldManifestName;

//     var sourceDir = request.query.clSourceProjectDir;

//     // DATA VALIDATION WOULD GO HERE ----------------------------------------------------------

//     //-----------------------------------------------------------------------------------------

//     console.log(labelCommand(newLabel, sourceDir, oldLabel));
//     // console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1"));

//   }

//   // 

// });


// // Start Server
// app.listen(3000, function (req, res) 
// { 
//   console.log('app.js listening on port 3000!');
// });  



// // SERVER SIDE METHODS ------------------------------------------------------------------------------------------------------------
// /** 
// Method to take a snapshot of a directory
// @param source = source directory to copy from
// @param dest   = destination directory to copy source to
// */
// function snapshot(source, dest)
// {
//   // get all files (recursively), make copies and store in dest
//   var allFiles = getFiles(source);
//   copyFiles(source, dest, allFiles);

//   // create manifest file based on how many we already have
//   var manifestNum = glob.sync(path.join(dest, '.man-*.rc')).length + 1;
//   var manifestFileName = `.man-${manifestNum}.rc`; 
//   var manifestPath = path.join(dest, manifestFileName);
    
//   // populate manifest file  
//   populateManifest(source, dest, allFiles, manifestPath);

//   // copy the manifest created in dest to source
//   fs.copyFileSync(manifestPath, path.join(source, manifestFileName));

//   return true;
// }


// /**
//  * Method to get all the files from a directory
//  * recursively
//  * @param source source directory to copy from 
//  * @return 
//  *        a list the fullpath of all files in all possible paths of the source directory
//  */
// function getFiles(source)
// {
//   // will hold all the files in the directory (recursively)
//   var fileList = [];

//   // will hold all the directories embedded in the source directory
//   var dir = [];

//   // make sure that source has the last backslash
//   if (source[source.length - 1] != "\\")
//     source += "\\";

//   // get all files (or embedded directories) from source directory & ignore unnecessary ones
//   fileList = ignoreFiles(fs.readdirSync(source));


//   // loop through the new files/embedded directories list and find all the directories 
//   for (var i = 0; i < fileList.length; i++)
//   {
//     // convert files list to full path 
//     fileList[i] = path.join(source, fileList[i]);
    
//     // is directory?
//     if(fs.statSync(fileList[i]).isDirectory())
//     {
//       // remove the directory element 
//       // takes into account the special rules for splice function
//       // and rules for adding based off the size of the array
//       if (dir.length == 0)
//         dir = fileList.splice(i, 1);
//       else
//         dir = dir.concat(fileList.splice(i, 1));

//       // account for change in size of the files list above
//       if (i >= 0)
//         i -= 1;
//     }
//   }

//   // add all the extra files from dir
//   for (var i = 0; i < dir.length; i++)
//     // fileList = fileList.concat(getFiles(path.join(source, dir[i])));
//     fileList = fileList.concat(getFiles(dir[i]));

//   // return all the files
//   return fileList;  
// }

// /**
//  * Method to copy all the files from listOfFiles
//  * and put in a new directory
//  * @param source source directory to copy from
//  * @param dest destination directory to copy source to
//  * @param listOfFiles array of file names (and their extensions)
//  */
// function copyFiles(source, dest, listOfFiles)
// {
//   // directory doesn't exist?
//   if (!fs.existsSync(dest))
//     fs.mkdirSync(dest);

//   // make sure the directories are formatted correctly
//   // make sure that source and has the last backslash
//   if (source[source.length - 1] != "\\")
//     source += "\\";
  
//   // make sure that dest and has the last backslash
//   if (dest[dest.length - 1] != "\\")
//     dest += "\\";

//   // copy and move each file in listOfFiles 
//   for (var i = 0; i < listOfFiles.length; i++)
//   {
//       try {
//       fs.copyFileSync(listOfFiles[i], path.join(dest, path.basename(listOfFiles[i])));
//     } catch(err) {
//       console.log("Failed the copy and move of " + listOfFiles[i] + " !");
//       throw err;
//     }
//   } 
// }


// /**
//  * Method to ignore files in a list
//  * by deleting them from the list
//  * @param listOfFiles list of files to delete from
//  * *** possibly add a ignoreFilesList to make it more robust
//  * (which would require creating a binary search tree for all the files
//  * and searching through the binary search tree and once I find it 
//  * delete it from the tree) 
//  * OR USE GLOB.sync {ignore: files to ignore}
//  */
// function ignoreFiles(listOfFiles)
// {
//     for (var i = 0; i < listOfFiles.length; i++) 
//       if(listOfFiles[i][0] == ".")
//         {
//           listOfFiles.splice(i, 1);
//           i -=1;
//         }

//   return listOfFiles;
// }


// /**
//  * Method to create the checksum for a string 
//  * input variable. The checksum will be generated by 
//  * taking each character in a string and multiplying
//  * each char by 1, 3, 7, and, 11 in a “loop”
//  * Ex. stringInput = "HELLO WORLD" results in the checksum:
//  * 4086 = 1*H +3*E +7 *L +11*L + 1*O +3*' ' 
//  *        + 7*W + 11*O + 1*R + 3*L +7*D
//  * @param {string} stringInput input to generate a checksum for
//  */
// function multiplier(stringInput){

//   var sum = 0;
//   var multiplier = 1;

//   for(i = 0; i < stringInput.length; i++){
//     switch (multiplier)
//     {
//       case 1: sum += multiplier * stringInput.charCodeAt(i); 
//               multiplier = 3; break;
//       case 3: sum += multiplier * stringInput.charCodeAt(i);
//               multiplier = 7; break;
//       case 7: sum += multiplier * stringInput.charCodeAt(i); 
//               multiplier = 11; break;
//       case 11: sum += multiplier * stringInput.charCodeAt(i);
//               multiplier = 1; break;
//     }
//   }   

//   return sum % 10000;
// }


// /**
//  * Method to create an Artifact ID to uniquely identify the file
//  * based on it's path, name, and content
//  * @param {string} absolutePath absolute path of the file to create artId for 
//  * @param {}       source source directory of the project that has been copied
//  *                          needed to get the relative path
//  *  @returns 
//  *            an Artifact ID of the form "Pa-Lb-Cc" + "<original file extension"
//  *            a = checksum of file contents created by multiplying each char in a 
//  *                loop by 1, 3, 7, 11 (each char only multiplied by one of these numbers)
//  *            b = number of bytes (characters) of the file contents
//  *            c = checksum of relative path of the file
//  *            Ex. of <original file extension> = ".txt" or ".pdf"
//  */
// function convertToArtID(source, absolutePath){

//   // get the contents of the file
//   var fileContents = fs.readFileSync(absolutePath,
//                                     {encoding: 'utf8', flag: 'r'}); 
  
//   // represents a in the Artifact ID format (see method docs)
//   var a = multiplier(fileContents);
  
//   // represents b in the Artifact ID format (length of fileContents)
//   var b = fileContents.length % 10000;
  
//   // represents c in the Artifact ID format (see method docs)
// 	var c = multiplier(path.relative(source, absolutePath));

//   // get the original file extension
//   var fileExt = path.extname(absolutePath);
  
//   // get the new path name created from the above operations
//   var newPathName = ('P' + a + '-L' + b + '-C' + c + fileExt);
  
//   // store copy directory
//   var copyDir = path.join(source, path.basename(absolutePath));
  
//   // copy file to its new destination and rename it file 
//   fs.copyFileSync(absolutePath, copyDir);
//   fs.renameSync(copyDir, path.join(source, newPathName));
  
//   return newPathName;
// }

// /**
//  * Method to populate the manifest file in this format:
//  * create C:\\projs\\mypt\ C:\\repo\\p1  | <command source dest>
//  * 2020-09-08 11:27:46                   | <date-time object>
//  * P4086-L11-C3201.txt @ bot\\a\\b\\     | <ArtId named file in dest> 
//  * ^^^^ (need one of these for each file in dest) ^^^^
//  * In the future bring in the command from the input screen on website as param
//  * @param {string} source original input of project home (fullpath)
//  * @param {string} dest where the repo was created (fullpath)
//  * @param {}       allFiles a list of fullpath strings pointing to the files in source
//  * @param {string} manifestPath fullpath to the manifest file
//  */
// function populateManifest(source, dest, allFiles, manifestPath)
// {
//   // keeps track of position in allFiles
//   var j = 0;

//   // get timezone offset in milliseconds
//   var date = new Date(); 

//   for (var i = 0; i < 2 + allFiles.length; i++)
//   // if file doesn't exist create it and write message to file
//     switch(i)
//   {
//     case 0: fs.writeFileSync(manifestPath, `create ${source} ${dest}\n`); break;
//     case 1: fs.appendFileSync(manifestPath, (new Date(date.getTime() - (date.getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace("T", " ")+ "\n"); break;
//     default: 
//           {
//             let dest_file = convertToArtID(dest, allFiles[j]);
//             fs.appendFileSync(manifestPath, dest_file + " @ " + path.relative(source, allFiles[j]) + "\n");
//             j++;
//           }
//   } 
// }

// // /**
// //  * Method to associate a label with a manifest file to help the user rename a snapshot
// //  * @param {string} newLabel new label name to associate with the snapshot (only alphanumeric characters)
// //  * @param {pathLike} source VCS repository directory 
// //  * @param {string} existingName target manifest's filename or existing label
// //  *                              already associated with manifest
// //  * @return true if the label is added to an existing manifest file
// //  */
// // function labelCommand(newLabel, source, existingName){
// //   // 1. search for the existing name
// //   // 2. if we don't find it then we return a message (error) FRILL
// //   //    if we do find the file then we can add the label to the back of the manifest file in the format "_newLabel"

// //    // directory doesn't exist?
// //    if (!fs.existsSync(source))
// //       {
// //         console.log("The directory doesn't exist");
// //         return false;
// //       }

// //   // replace invalid characters FRILL(display output message to the user/prompt for more input if newLabel is ever empty)
// //   var newLabel = newLabel.replace(/[^a-z0-9]/gi,'');

// //   // open the source up and get all the manifest files (if no manifest file return a message - error FRILL)
// //   var files = glob.sync(path.join(source, '.man-*.rc'));

// //   // get only the file names 
// //   files.forEach(function(file, i, files){
// //     files[i] = path.relative(source, file);
// //   });

// //   // FRILL - error message
// //   if (files.length === 0)
// //   {
// //     console.log("This is not a VCS. There is no .man file");
// //     return false;
// //   }
  
// //   // for each file split the name by '_' character (Place everything in a hashmap with the key being
// //   // the manifest file name (or we could store this info in a database) FRILL
// //   for(var i = 0; i < files.length; i++) 
// //   {
// //     // original file name
// //     files[i] = files[i].replace(".rc", '');

// //     // split each file by '_' to get all the corresponding labels
// //     let labels = files[i].split("_");

// //     for (var j = 0; j < labels.length; j++) 
// //     {
// //       if ( labels[j] === existingName) 
// //       {
// //         // found it so add the new label and rename the file
// //           let newFileName = files[i] + "_" + newLabel + ".rc";
// //           fs.renameSync(path.join(source, files[i] + ".rc"), path.join(source, newFileName));          
// //           return true;
// //       }
// //     }    

// //   }
    
// //   return false;
// // }

// /**
//  * Method to associate a label with a manifest file to help the user rename a snapshot
//  * @param {string} newLabel new label name to associate with the snapshot (only alphanumeric characters)
//  * @param {pathLike} source VCS repository directory 
//  * @param {string} existingName target manifest's filename or existing label
//  *                              already associated with manifest
//  * @return true if the label is added to an existing manifest file
//  */
// function labelCommand(newLabel, source, existingName){
//   // 1. search for the existing name
//   // 2. if we don't find it then we return a message (error) FRILL
//   //    if we do find the file then we can add the label to the back of the manifest file in the format "_newLabel"

//   var allFilesAndAliases = listFiles(source);
  
//   // replace invalid characters FRILL(display output message to the user/prompt for more input if newLabel is ever empty)
//   var newLabel = newLabel.replace(/[^a-z0-9]/gi,'');

//   // search the list of files and aliases for the existingName of the file
//   for (var i = 0; i < allFilesAndAliases.length; i++) {
//       var labels = allFilesAndAliases[i];
//         for (var j = 0; j < labels.length; j++) 
//         {
//           if ( labels[j] === existingName) 
//           {
//             // found it so add the new label 
//               let newFileName = allFilesAndAliases[i].join('_') + "_" + newLabel + ".rc";
              
//               // add new label to the manifest file name
//               fs.renameSync(path.join(source, allFilesAndAliases[i].join('_') + ".rc"),
//                  path.join(source, newFileName));          
//               return true;
//           }
//         } 
//     }   

    
//   return false;
// }

// /**
//  * Method to get a list of all the files and aliases in a Version Control System directory
//  * (we can tell if it is in a VCS directory based off if we can find a manifest file or not)
//  * @param {pathLike} source VCS repository directory
//  * 
//  * @return the list of all files and aliases names in a 2d array format 
//  *        (rows correspond to different manifest files and columns correspond to labels)
//  *        OTHERWISE it returns FALSE
//  */
// function listFiles(source)
// {
//     // directory doesn't exist?
//     if (!fs.existsSync(source))
//     {
//       console.log("The directory doesn't exist");
//       return false;
//     }
//     // open the source up and get all the manifest files (if no manifest file return a message - error FRILL)
//     var files = glob.sync(path.join(source, '.man-*.rc'));

//     // get only the file names 
//     files.forEach(function(file, i, files){
//     files[i] = path.relative(source, file);
//     });

//     // FRILL - error message
//     if (files.length === 0)
//     {
//     console.log("This is not a VCS. There is no .man file");
//     return false;
//     }

//     var allFilesAndAliases = [];

//     // for each file split the name by '_' character (Place everything in a hashmap with the key being
//     // the manifest file name (or we could store this info in a database) FRILL
//     for(var i = 0; i < files.length; i++) 
//     {
//       // original file name
//       files[i] = files[i].replace(".rc", '');

//       // split each file by '_' to get all the corresponding labels
//       let labels = files[i].split("_");

//       allFilesAndAliases.push(labels);
//     }

//     return allFilesAndAliases;
// }

// /**
//  * Method to perform a Github-clone of a VCS project directory that maintains the project
//  * structure from when the repo was originally checked-in/created
//  * (this is specified by the manifest file)
//  * @param {*} existingName = target manifest's filename (which specifies the version or snapshot number)
//  *                           or an existing label already associated with the manifest
//  * @param {*} source = VCS project directory to clone
//  * @param {*} dest = empty target directory to store the repository at
//  */
// function checkOut(existingName, source, dest)
// {
//   /* This is the plan:
//   * Read the manifest file and start with keeping track of the initial repo source (first directory of first line)
//   * Then from there skip down to the files and for each file till we reach EOF:
//   * 1. Grab the file that corresponds to the manifest file and then everything after the @ symbol is the directory 
//   *    in terms of the initial repo source that we kept track of already (stored it in a variable)
//   * 2. Join the initial repo source with the directory after the @ symbol
//   * 3. Store the file in the directory (minus the last file name in the directory after the @ symbol) and rename to 
//   *    the file to the file name in the directory (last one)
//   */
// }

// /**
//  * Method to update the repository with a new snapshot of a project tree
//  * (only copy the files that have been changed since the last check in/creation)
//  * (we will know if a file is the same or not based on if it's artID has changed or not)
//  * This will result in the creation of a check in manifest file which will use a copy
//  * of the old manifest file but will update the command at the top, update the date
//  * and the artIds of the files that have been changed
//  * @param {pathLike} repoDir = VCS directory
//  * @param {pathLike} workingDir = working directory of the project represented by the VCS
//  */
// function checkIn(repoDir, workingDir)
// {
//   /*
//   * This is the plan:
//   * 1. Copy the code from the snapshot method and after you get all the files compare manifest files
//   *    the ones that don't have matches for manifest have changed so keep track of the paths to these files
//   * 2. The paths to the files mentioned above are the only lines that we will have to change
//   * 3. Update the date at the top, the command, and the directories
//   */
// }

// // QUESTION ON THE CHECK IN COMMAND:
// // - Do we update the paths at the top of the check in manifest as well
// //   do we just use the same manifest as previously but just add/update the files that have been added or 
// //   edited, update the date and the paths at the top
// // - Is the name of the manifest file still in the same format?


// // testing the label command
// // console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TEAMDJ", "DGOAT"));
// console.log(labelCommandY("DGOATEST123456", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1"));
// console.log(list("C:\\Users\\HP\\Documents\\Repos\\TestRepo")); 
// // $()

// // file names for practice:
// //.man-1_DGOAT_GREAT_ME
// //.man-2_LOVE_JOY_PEACE_PATIENCE_KINDNESS_GENTLENESS_FAITHFULNESS_SELFCONTROL
// //.man-3_CHICKFILA_CANES_ALLAT_CSULB_MYAPARTMENT_YERRRRRR













// ------------------------------------------ TRYING TO GET IT TO WORK FOR HTML
/**
 * Purpose: Create a Version Control System on the web
 * using JavaScript (Node w/Express), HTML (Jade/Pug), CSS
 * 
 * Author: Deron Washington II
 * Email : Deron.Washington@student.csulb.edu
 * Last Edit Date: 9/27/20
 * Version: v.1.0.0 released 9/27/20
 * 
 */
// Load the project requirements
const path = require('path');
const express = require('express');
const fs = require('fs');
const glob = require('glob');
var favicon = require('serve-favicon')
// const $ = require('jquery');
var $ = require('jquery');
var jsdom = require('jsdom');
const { domain } = require('process');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

// Init an Express object
const app = express();

//Load View Engine 
app.set('views', path.join(__dirname, 'views'));
const htmlPath = path.join(__dirname, 'viewsHTML');

// Upload favicon!
app.use(favicon(path.join(__dirname, 'favicon.ico')));


// Set page-gen fcn for URL root request
app.get('/', function (request, response) 
{ 
  response.sendFile(htmlPath + '/index.html', 
    {
      title: 'TeamDJ Version Control System (v1.0.0)'
    });
});

// Set page-gen fcn for URL root request
app.post('/', function (request, response) 
{ 
  response.sendFile(htmlPath + '/index.html', 
    {
      title: 'TeamDJ Version Control System (v1.0.0)'
    });
});

// handle a client side action request
app.get('/get-form-text', function(request, response){
  // variable declaration for displaying output
  var output_msg = "YOOO";
  var created = false;

  // we can make these jquery action event ---------------------------------------------------------------------
  // DETERMINE WHICH COMMAND IS BEING EXECUTED
  // CREATE REPO COMMAND
  if (request.query.crCurrProjectDir) {
    
      // gives me the current project directory to take snapshot from
      var currentProjectDir = request.query.crCurrProjectDir;
    
      // gives me the directory where the repository will be stored
      var newRepositoryDir = request.query.crNewRepoDir;
    
      // output our text to the console
      console.log('app.js received = ' + currentProjectDir + ' for ' + newRepositoryDir);
      
      // PERFORM DATA VALIDATION HERE -----------------------
      
      // create the repository  
      created = snapshot(currentProjectDir, newRepositoryDir);
    
      if (created == true)
      {
        output_msg = 'Your repository has been created or updated from ' + currentProjectDir + ' and stored here:'
        + newRepositoryDir;
      }
      else 
        output_msg = "The repository couldn't be created. This is most likely because it already exists at this repo.";
    
      console.log(output_msg);

      // document.createElement()
      $("#outputMsg").val(output_msg);
      response.sendFile(htmlPath + '/get-form-text.html');
  }

  
  // LABEL COMMAND
  else if(request.query.clSourceProjectDir)
  {
    console.log("I'm here because you clicked the second submit button");
    // console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1.rc"));

    // get the new label from the user
    var newLabel = request.query.clNewLabelName;

    // get the old manifest/label from the user
    var oldLabel = request.query.clOldManifestName;

    var sourceDir = request.query.clSourceProjectDir;

    // DATA VALIDATION WOULD GO HERE ----------------------------------------------------------

    //-----------------------------------------------------------------------------------------

    console.log(labelCommand(newLabel, sourceDir, oldLabel));
    // console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1"));

  }

  // 

});


// Start Server
app.listen(3000, function (req, res) 
{ 
  console.log('app.js listening on port 3000!');
});  



// SERVER SIDE METHODS ------------------------------------------------------------------------------------------------------------
/** 
Method to take a snapshot of a directory
@param source = source directory to copy from
@param dest   = destination directory to copy source to
*/
function snapshot(source, dest)
{
  // get all files (recursively), make copies and store in dest
  var allFiles = getFiles(source);
  copyFiles(source, dest, allFiles);

  // create manifest file based on how many we already have
  var manifestNum = glob.sync(path.join(dest, '.man-*.rc')).length + 1;
  var manifestFileName = `.man-${manifestNum}.rc`; 
  var manifestPath = path.join(dest, manifestFileName);
    
  // populate manifest file  
  populateManifest(source, dest, allFiles, manifestPath);

  // copy the manifest created in dest to source
  fs.copyFileSync(manifestPath, path.join(source, manifestFileName));

  return true;
}


/**
 * Method to get all the files from a directory
 * recursively
 * @param source source directory to copy from 
 * @return 
 *        a list the fullpath of all files in all possible paths of the source directory
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
      if (i >= 0)
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
 * @param source source directory to copy from
 * @param dest destination directory to copy source to
 * @param listOfFiles array of file names (and their extensions)
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
 * @param listOfFiles list of files to delete from
 * *** possibly add a ignoreFilesList to make it more robust
 * (which would require creating a binary search tree for all the files
 * and searching through the binary search tree and once I find it 
 * delete it from the tree) 
 * OR USE GLOB.sync {ignore: files to ignore}
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
 * @param {string} stringInput input to generate a checksum for
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

  return sum % 10000;
}


/**
 * Method to create an Artifact ID to uniquely identify the file
 * based on it's path, name, and content
 * @param {string} absolutePath absolute path of the file to create artId for 
 * @param {}       source source directory of the project that has been copied
 *                          needed to get the relative path
 *  @returns 
 *            an Artifact ID of the form "Pa-Lb-Cc" + "<original file extension"
 *            a = checksum of file contents created by multiplying each char in a 
 *                loop by 1, 3, 7, 11 (each char only multiplied by one of these numbers)
 *            b = number of bytes (characters) of the file contents
 *            c = checksum of relative path of the file
 *            Ex. of <original file extension> = ".txt" or ".pdf"
 */
function convertToArtID(source, absolutePath){

  // get the contents of the file
  var fileContents = fs.readFileSync(absolutePath,
                                    {encoding: 'utf8', flag: 'r'}); 
  
  // represents a in the Artifact ID format (see method docs)
  var a = multiplier(fileContents);
  
  // represents b in the Artifact ID format (length of fileContents)
  var b = fileContents.length % 10000;
  
  // represents c in the Artifact ID format (see method docs)
	var c = multiplier(path.relative(source, absolutePath));

  // get the original file extension
  var fileExt = path.extname(absolutePath);
  
  // get the new path name created from the above operations
  var newPathName = ('P' + a + '-L' + b + '-C' + c + fileExt);
  
  // store copy directory
  var copyDir = path.join(source, path.basename(absolutePath));
  
  // copy file to its new destination and rename it file 
  fs.copyFileSync(absolutePath, copyDir);
  fs.renameSync(copyDir, path.join(source, newPathName));
  
  return newPathName;
}

/**
 * Method to populate the manifest file in this format:
 * create C:\\projs\\mypt\ C:\\repo\\p1  | <command source dest>
 * 2020-09-08 11:27:46                   | <date-time object>
 * P4086-L11-C3201.txt @ bot\\a\\b\\     | <ArtId named file in dest> 
 * ^^^^ (need one of these for each file in dest) ^^^^
 * In the future bring in the command from the input screen on website as param
 * @param {string} source original input of project home (fullpath)
 * @param {string} dest where the repo was created (fullpath)
 * @param {}       allFiles a list of fullpath strings pointing to the files in source
 * @param {string} manifestPath fullpath to the manifest file
 */
function populateManifest(source, dest, allFiles, manifestPath)
{
  // keeps track of position in allFiles
  var j = 0;

  // get timezone offset in milliseconds
  var date = new Date(); 

  for (var i = 0; i < 2 + allFiles.length; i++)
  // if file doesn't exist create it and write message to file
    switch(i)
  {
    case 0: fs.writeFileSync(manifestPath, `create ${source} ${dest}\n`); break;
    case 1: fs.appendFileSync(manifestPath, (new Date(date.getTime() - (date.getTimezoneOffset() * 60000))).toISOString().slice(0, 19).replace("T", " ")+ "\n"); break;
    default: 
          {
            let dest_file = convertToArtID(dest, allFiles[j]);
            fs.appendFileSync(manifestPath, dest_file + " @ " + path.relative(source, allFiles[j]) + "\n");
            j++;
          }
  } 
}

/**
 * Method to associate a label with a manifest file to help the user rename a snapshot
 * @param {string} newLabel new label name to associate with the snapshot (only alphanumeric characters)
 * @param {pathLike} source VCS repository directory 
 * @param {string} existingName target manifest's filename or existing label
 *                              already associated with manifest
 * @return true if the label is added to an existing manifest file
 */
function labelCommand(newLabel, source, existingName){
  // 1. search for the existing name
  // 2. if we don't find it then we return a message (error) FRILL
  //    if we do find the file then we can add the label to the back of the manifest file in the format "_newLabel"

  var allFilesAndAliases = listFiles(source);
  
  // replace invalid characters FRILL(display output message to the user/prompt for more input if newLabel is ever empty)
  var newLabel = newLabel.replace(/[^a-z0-9]/gi,'');

  // search the list of files and aliases for the existingName of the file
  for (var i = 0; i < allFilesAndAliases.length; i++) {
      var labels = allFilesAndAliases[i];
        for (var j = 0; j < labels.length; j++) 
        {
          if ( labels[j] === existingName) 
          {
            // found it so add the new label 
              let newFileName = allFilesAndAliases[i].join('_') + "_" + newLabel + ".rc";
              
              // add new label to the manifest file name
              fs.renameSync(path.join(source, allFilesAndAliases[i].join('_') + ".rc"),
                 path.join(source, newFileName));          
              return true;
          }
        } 
    }   

    
  return false;
}

/**
 * Method to get a list of all the files and aliases in a Version Control System directory
 * (we can tell if it is in a VCS directory based off if we can find a manifest file or not)
 * @param {pathLike} source VCS repository directory
 * 
 * @return the list of all files and aliases names in a 2d array format 
 *        (rows correspond to different manifest files and columns correspond to labels)
 *        OTHERWISE it returns FALSE
 */
function listFiles(source)
{
    // directory doesn't exist?
    if (!fs.existsSync(source))
    {
      console.log("The directory doesn't exist");
      return false;
    }
    // open the source up and get all the manifest files (if no manifest file return a message - error FRILL)
    var files = glob.sync(path.join(source, '.man-*.rc'));

    // get only the file names 
    files.forEach(function(file, i, files){
    files[i] = path.relative(source, file);
    });

    // FRILL - error message
    if (files.length === 0)
    {
    console.log("This is not a VCS. There is no .man file");
    return false;
    }

    var allFilesAndAliases = [];

    // for each file split the name by '_' character (Place everything in a hashmap with the key being
    // the manifest file name (or we could store this info in a database) FRILL
    for(var i = 0; i < files.length; i++) 
    {
      // original file name
      files[i] = files[i].replace(".rc", '');

      // split each file by '_' to get all the corresponding labels
      let labels = files[i].split("_");

      allFilesAndAliases.push(labels);
    }

    return allFilesAndAliases;
}

/**
 * Method to perform a Github-clone of a VCS project directory that maintains the project
 * structure from when the repo was originally checked-in/created
 * (this is specified by the manifest file)
 * @param {*} existingName = target manifest's filename (which specifies the version or snapshot number)
 *                           or an existing label already associated with the manifest
 * @param {*} source = VCS project directory to clone
 * @param {*} dest = empty target directory to store the repository at
 */
function checkOut(existingName, source, dest)
{
  /* This is the plan:
  * Read the manifest file and start with keeping track of the initial repo source (first directory of first line)
  * Then from there skip down to the files and for each file till we reach EOF:
  * 1. Grab the file that corresponds to the manifest file and then everything after the @ symbol is the directory 
  *    in terms of the initial repo source that we kept track of already (stored it in a variable)
  * 2. Join the initial repo source with the directory after the @ symbol
  * 3. Store the file in the directory (minus the last file name in the directory after the @ symbol) and rename to 
  *    the file to the file name in the directory (last one)
  */
}

/**
 * Method to update the repository with a new snapshot of a project tree
 * (only copy the files that have been changed since the last check in/creation)
 * (we will know if a file is the same or not based on if it's artID has changed or not)
 * This will result in the creation of a check in manifest file which will use a copy
 * of the old manifest file but will update the command at the top, update the date
 * and the artIds of the files that have been changed
 * @param {pathLike} repoDir = VCS directory
 * @param {pathLike} workingDir = working directory of the project represented by the VCS
 */
function checkIn(repoDir, workingDir)
{
  /*
  * This is the plan:
  * 1. Copy the code from the snapshot method and after you get all the files compare manifest files
  *    the ones that don't have matches for manifest have changed so keep track of the paths to these files
  * 2. The paths to the files mentioned above are the only lines that we will have to change
  * 3. Update the date at the top, the command, and the directories
  */
}

// QUESTION ON THE CHECK IN COMMAND:
// - Do we update the paths at the top of the check in manifest as well
//   do we just use the same manifest as previously but just add/update the files that have been added or 
//   edited, update the date and the paths at the top
// - Is the name of the manifest file still in the same format?


// LEAVING OFF HERE --------------------
// Need to get jquery to work
// Reformat project so routes has a folder etc. (best practices)


// testing the label command
// console.log(labelCommand("DGOATEST", "C:\\Users\\HP\\Documents\\Repos\\TEAMDJ", "DGOAT"));
// console.log(labelCommand("DGOATEST123456", "C:\\Users\\HP\\Documents\\Repos\\TestRepo", ".man-1"));
// console.log(listFiles("C:\\Users\\HP\\Documents\\Repos\\TestRepo")); 
// $()

// file names for practice:
//.man-1_DGOAT_GREAT_ME
//.man-2_LOVE_JOY_PEACE_PATIENCE_KINDNESS_GENTLENESS_FAITHFULNESS_SELFCONTROL
//.man-3_CHICKFILA_CANES_ALLAT_CSULB_MYAPARTMENT_YERRRRRR

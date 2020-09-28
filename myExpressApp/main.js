/**
 * Purpose: Create a Version Control System on the web
 * using JavaScript (Node w/Express), HTML (Jade/Pug), CSS
 * 
 * Author: Deron Washington II
 * Last Edit Date: 9/27/20
 * Version: v.1.0.0 released 9/27/20
 * 
 */
// Load the project requirements
const path = require('path');
const express = require('express');
const fs = require('fs');
const glob = require('glob');

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


// handle a client side action request
app.get('/get-form-text', function(request, response){
  // variable declaration for displaying output
  var output_msg = "YOOO";
  var created = false;

    // gives me the current project directory to take snapshot from
    var currentProjectDir = request.query.currProjectDir;
  
    // gives me the directory where the repository will be stored
    var newRepositoryDir = request.query.newRepoDir;
  
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

  response.render('get-form-text', {
  output: output_msg
});

});


// Start Server
app.listen(3000, function (req, res) 
{ 
  console.log('app.js listening on port 3000!');
}); // https://discord.com/channels/738205874929270815/738205874929270818/756227895478845556 



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
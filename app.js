
const fs = require('fs');
var express = require('express'); //load the express builder fcn
const { privateDecrypt } = require('crypto');
var app = express();//init an express object

// app.use(express.static('/'));
// app.get(				//handle a client side action request
// 	'/get_form_text', 	//for this URL subtag action
// 	function(request,response){	//runb this function
// 	var myText = request.query.my_input_box_text; 		//get the text from the URL request packet
// 	console.log('app.js received = ' + myText + '.'); 	//returns on CLI what was typed in browser
// 	response.send('Repo created @ location: ' + myText); 				//reply to the client GUI using that text
//     //createRepo();                                       //create repo function
//     console.log('once done i will diplay confirmation here');
// });

// app.get('/', function (request, response){//set page-gen function for URL root request
// 	//res.send('Hello World! & modified string code yeah boi!!');//send webpage containint "Hello World!"
// 	//response.sendFile('C:\\Users\\josej\\Desktop\\ex 0903\\assets\\js-1.html'); //need absolute path, drive location
//     response.sendFile('C:\\Users\\josej\\Desktop\\GitHub\\VCS323\\js-1.html');
// });

// app.listen(3000, function(){//set callback action fcn on network port 
// 	console.log('app.js listening on port 3000!'); //message will pop when starting node
	
// });

// console.log(__dirname);  //give current folder absolute path



function multiplier(stringInput){

    var sum = 0;
    var multiplier = 1;
    for(i = 0; i < stringInput.length; i++){
        
        if(multiplier == 1){
			sum += (multiplier * stringInput.charCodeAt(i));
            multiplier = 3;
        }else if(multiplier == 7){
			sum += (multiplier * stringInput.charCodeAt(i));
            multiplier = 11;
        }else if(multiplier == 3){
			sum += (multiplier * stringInput.charCodeAt(i));
            multiplier = 7;
        }else{
			sum += (multiplier * stringInput.charCodeAt(i));
            multiplier = 1;
        }
	}//end for loop
	
	return sum;
}//end multiplier

//artID------------------------------------------------------------------
var newPathName;
var arrayIds = [];
function convertToArtID(absolutePath){

	// //counts number of files in the directory
	// fs.readdir(absolutePath, (err, files)=> {
	// 	console.log('total numner of files is ' + files.length);
	// });

	var readMe = fs.readFileSync(absolutePath, 'utf8'); //reads content inside file	
	var checksum = multiplier(readMe);
	var length = readMe.length;
	var path = multiplier(absolutePath);

	newPathName = ('P' + checksum + '-L' + length + '-C' + path + '.txt');
	arrayIds [0] = newPathName;
	fs.renameSync(absolutePath, newPathName); //renames file
}

//create manifest file <man-num.txt>--------------------------------------------
var count = 1;
function manifest(){ 
	
	fs.writeFileSync('manifest' + count + '.rc', arrayIds[0]);
	fs.appendFile('manifest' + count + '.rc', '\n' + getDateTime(), (err)=>{
		if(err) throw err;
		//console.log('it passed');
	});

	count++;
}


//YYYY-MM-DD HH:MM:SS----------------------------------------------------------
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;

}

//TEST--------------------------------------------------------------
//path = 'C:\\Users\\josej\\Desktop\\GitHub\\VCS323\\readMe.txt';
path = 'C:\\Users\\josej\\Desktop\\GitHub\\VCS323';
convertToArtID(path);

//manifest();
//manifest();




// var readMe = fs.readFileSync(path, 'utf8'); //reads content inside file



//fs.renameSync('file.JPG', 'file2.JPG'); //renames file
	
// //code that will give file size
// fs.stat("./file.jpg", (err, fileStats) => { //stat(path,callback with error handling)
// 	if(err){
// 		console.log(err)
// 	}else{
// 		fileSize = fileStats.size; //stores file size in variable
// 	}
// })








 

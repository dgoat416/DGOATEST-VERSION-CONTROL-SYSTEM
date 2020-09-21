
var express = require('express'); //load the express builder fcn
var app = express();//init an express object

app.use(express.static('/'));
app.get(				//handle a client side action request
	'/get_form_text', 	//for this URL subtag action
	function(request,response){	//runb this function
	var myText = request.query.my_input_box_text; 			//get the text from the URL request packet
	console.log('app.js received = ' + myText + '.'); 	//returns on CLI what was typed in browser
	response.send('Your Text: ' + myText); 					//reply to the client GUI using that text
	});

app.get('/', function (request, response){//set page-gen function for URL root request
	//res.send('Hello World! & modified string code yeah boi!!');//send webpage containint "Hello World!"
	response.sendFile('C:\\Users\\josej\\Desktop\\ex 0903\\assets\\js-1.html'); //need absolute path, drive location
});

app.listen(3000, function(){//set callback action fcn on network port 
	console.log('app.js listening on port 3000!'); //message will pop when starting node
	console.log(__dirname);  //give current folder absolute path
});

 function artId(){
	 
 }
 
 function manifest(){
	 
 }
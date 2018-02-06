/*var fs = require('fs');

fs.readFile('try.txt','utf-8',function(error,data) {
	console.log(data);													//fs node js .. taking up only .txt files
});
*/

var textract = require('textract');

textract.fromFileWithPath('Assignment.docx', function( error, text ) {			//able to take wprd files
	if(error){
		console.log("Shut it");
	}
	else
		console.log(text);
});
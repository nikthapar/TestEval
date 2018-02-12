
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var WordPOS = require('wordpos'),
wordpos = new WordPOS();

var evalDocument = fs.readFileSync('eCss.txt','utf-8');
var standardDocument = fs.readFileSync('sCss.txt','utf-8');


var standardTokens = tokenizer.tokenize(standardDocument);
var evalTokens = tokenizer.tokenize(evalDocument);

var range = (standardTokens.length*20)/100

var standardLength = standardTokens.length;
var evalLength = evalTokens.length;

if(evalLength <= standardLength-range || evalLength >= standardLength+range){
  console.log("Document size invalid");
  return;
}

var evalNouns;
var standardNouns;
var similarNouns = [];

wordpos.getNouns(evalDocument, function(result){
  evalNouns = result;
  
  wordpos.getNouns(standardDocument, function(output){
    standardNouns = output;
    compare();
    })
});


function compare(){
  var corpus = standardNouns;
  var spellcheck = new natural.Spellcheck(corpus);

  for(let i = 0; i < evalNouns.length; i++){
	if(spellcheck.isCorrect(evalNouns[i])){
		similarNouns.push(evalNouns[i]);
	}
}   
    nik();
} 


 function nik(){
    var result = {
      Standard : 
        {
          wordCount : standardLength,
          nouns : standardNouns.length
        }, 

      Eval : 
        {
          wordCount : evalLength,
          nouns : evalNouns.length,
          commonNouns : similarNouns.length
        }
    }

  var json = JSON.stringify(result, null, 2);

  fs.writeFileSync('data.json',json)
 }

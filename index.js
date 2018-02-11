//fs node js .. taking up only .txt files and natural
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
var WordPOS = require('wordpos'),
wordpos = new WordPOS();

//document to be evaluated
var evalDocument = fs.readFileSync('./documents/EvalDocument.txt','utf-8');
//standard document
var standardDocument = fs.readFileSync('./documents/StandardDocument.txt','utf-8');

//tokenizing to get the word count
//length of standard document
var standardTokens = tokenizer.tokenize(standardDocument);
var evalTokens = tokenizer.tokenize(evalDocument);
//twenty percent length relaxation
var range = (standardTokens.length*20)/100
//lengths of respective documents
var standardLength = standardTokens.length;
var evalLength = evalTokens.length;

if(evalLength <= standardLength-range || evalLength >= standardLength+range){
  console.log("Document size invalid");
  return;
}

//global variables
var evalNouns;
var standardNouns;
var similarNouns = [];
//calculating nouns back to back and calling json file creation function in end
wordpos.getNouns(evalDocument, function(result){
  evalNouns = result;
  
  wordpos.getNouns(standardDocument, function(output){
    standardNouns = output;
    compare();
    })
});

//comparing nouns of both documents and calculating noun percentage
function compare(){
  var corpus = standardNouns;
  var spellcheck = new natural.Spellcheck(corpus);
  //comparing each noun of evalDoc with corpus
  for(let i = 0; i < evalNouns.length; i++){
	if(spellcheck.isCorrect(evalNouns[i])){
		similarNouns.push(evalNouns[i]);
	}
}   
    console.log(similarNouns)
    end();
} 

//json file -- to be executed in the end
 function end(){
    var score = {
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
      //object to string
  var json = JSON.stringify(score, null, 2);
  //storing it in .json file
  fs.writeFileSync('output.json',json)
 }
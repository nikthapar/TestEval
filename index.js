//fs node js .. taking up only .txt files and natural
var fs = require('fs');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
//document to be evaluated
var EvalDocument = fs.readFileSync('./documents/EvalDocument.txt','utf-8');
//standard document
var StandardDocument = fs.readFileSync('./documents/StandardDocument.txt','utf-8');
//tokenizing to get the word count
//length of standard document
var StandardTokens = tokenizer.tokenize(StandardDocument);
var EvalTokens = tokenizer.tokenize(EvalDocument);
//twenty percent length relaxation
var range = (StandardTokens.length*20)/100
//lengths of respective documents
var StandardLength = StandardTokens.length;
var EvalLength = EvalTokens.length;

if(EvalLength <= StandardLength-range || EvalLength >= StandardLength+range){
  console.log("Document size invalid");
  return;
}

//insert code here


//json file
let score = {
  Standard : 
    {
      wordCount : StandardLength
    }, 
  
  Eval : 
    {
      wordCount : EvalLength
    }
}
//object to string
var json = JSON.stringify(score, null, 3);
//storing it in .json file
fs.writeFileSync('output.json',json)

/*console.log(wordpos.getNouns(StandardDocument));*/

/*
var token_keyWords = tokenizer.tokenize(keyWords);

//gives the number of words
var length = token_document.length;
console.log("Document contains "+length+"words.");


if(length>=1000 && length<=4000)
	console.log("Word Check Complete : It's valid")

else {
	console.log("Invalid number of words.");
	return;
}

var marks = 0;
var correctWords = [];
var spellcheck = new natural.Spellcheck(token_document);

for(i in token_keyWords){
	if(spellcheck.isCorrect(token_keyWords[i])){
		marks++;
		correctWords.push(token_keyWords[i]);
	}
}

 
console.log("These are the concepts that you have covered : \n"+correctWords+"\n and you get these marks for that :"+marks);
console.log(correctWords);
console.log("You get these many marks : "+marks);


//dictionary and its tokenization
var dictionary = fs.readFileSync('dictionary.txt','utf-8');
var token_dictionary = tokenizer.tokenize(dictionary);

//checking spellings
var spellcheck1 = new natural.Spellcheck(token_dictionary);
var mistakes = 0;
var incorrectWords = [];

for(i in token_document){
	if(!spellcheck1.isCorrect(token_document[i].toLowerCase())){
		mistakes++;
		incorrectWords.push(token_document[i]);
	}
}

console.log("These are the spelling mistakes you had : \n"+incorrectWords+"and you have these many mistakes \n: "+mistakes);

//now will make a json object




*/

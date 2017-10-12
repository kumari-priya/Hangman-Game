
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var words = ["red","green","blue","pink"];
    var word =""
    var userGuess;
    var guessedLetter;


    //Declare variables for win loss draw
    var win = 0;
    var loss = 0;
    var life = 10;
    var reset = false;

function getRandom(list)
{
  return (list[Math.floor(Math.random() * list.length)]);
}

function generateSpace(id)
{
var maskedText = document.getElementById(id);
word = getRandom(words);
maskedText.textContent = "";
for (var i = 0; i < word.length; i++) {
  maskedText.textContent  += "_";
  console.log(word);
  console.log(maskedText.textContent);
  console.log(maskedText.textContent.length);
}
}

function resetGame(word, guessedWord)
{
  if(word == guessedWord){
    win++;
    document.getElementById('win').textContent = win;
  }
  else{
    loss++;
      document.getElementById('loss').textContent = loss;
  }
   generateSpace('randomWord');
   document.getElementById('guessedLetters').textContent = "";
   console.log()
    life = 10;
    reset = true;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
function setCharAtZero(str,index,chr) {
      return chr + str.substr(1,str.length-1);
}


function updateDOM(userGuess,word)
{
  if(life > 0)
  {
  var tempString = document.getElementById('randomWord').textContent;
  console.log("Masked Text" + tempString);
  console.log("Word "+word);
    if((word.indexOf(userGuess) >= 0) && (tempString.indexOf(userGuess) < 0))
    {
      for (var i = 0; i < word.length; i++) {
        if(word.charAt(i) == userGuess){
          if(i==0){
          tempString = setCharAtZero(tempString,i,userGuess);
          }
          else{
            tempString = setCharAt(tempString,i,userGuess);
          }
          document.getElementById('randomWord').textContent = tempString;
        }
      }
      if(word == tempString){
          resetGame(word,tempString);
      }
    }

// Update guessedLetter every time new letter is pressed
var guessString = document.getElementById('guessedLetters');
if(guessString.textContent.indexOf(userGuess)< 0)
{
  if(guessString.textContent.length > 0){
    guessString.textContent += ", "+ userGuess;
  }
  else{
    guessString.textContent =  userGuess;
  }

}

    //Update life
    life--;
    document.getElementById('life').textContent = life;
  }
  else {
    resetGame(word,document.getElementById('randomWord').textContent);
  }
}

//This function will run once when page is loaded
window.onload = function(event)
{
  generateSpace('randomWord');
  //document.getElementById('randomWord').textContent = getRandom(words);
  document.getElementById('life').textContent = life;
  document.getElementById('win').textContent = win;
  document.getElementById('loss').textContent = loss;

}

    // This function is run whenever the user presses a key.
document.onkeyup = function(event) {
var userGuess = event.key;
updateDOM(userGuess,word);
    };

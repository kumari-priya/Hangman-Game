
    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var words = ["camel","dog","elephant","monkey","tiger","wolf"];
    var word =""
    var userGuess;
    var wordsSrc = ["assets/images/camel.jpg","assets/images/dog.jpg","assets/images/elephant.jpg","assets/images/monkey.jpg","assets/images/tiger.jpeg","assets/images/wolf.jpg"];
    var guessedLetter;

    var soundSrc = ["assets/sound/camel.mp3,assets/sound/dog.mp3,assets/sound/elephant.mp3,assets/sound/monkey.mp3,assets/sound/tiger.mp3,assets/sound/wolf.mp3"];

    //Declare variables for win loss draw
    var win = 0;
    var loss = 0;
    var life = 10;
    var reset = false;
    function hideStatusDiv(){
      document.getElementById("success-div").style.display = "none";
      document.getElementById("danger-div").style.display = "none";
      document.getElementById("info-div").style.display = "none";
    }

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
  document.getElementById('guessedLetters').textContent = "";
  document.getElementById("imgAnimal").src = wordsSrc[words.indexOf(word)];
  //document.getElementById("animalSound").src = soundSrc[words.indexOf(word)];
  document.getElementById("animalSound").src = `assets/sound/${word}.mp3`

}

function resetGame(word, guessedWord)
{
  hideStatusDiv();
  if(word == guessedWord){
    win++;
    document.getElementById('win').textContent = win;
    //show success status message
    document.getElementById("success-div").style.display = "block";
    reset = true;
    var audio = document.getElementById("soundDiv");
    audio.load();
    audio.play();
    console.log("playing sound");
  }
  else{
    loss++;
      document.getElementById('loss').textContent = loss;
      //show danger status message
      document.getElementById("danger-div").style.display = "block";
      reset = true;
  }
  if(reset == false)
  {
    var soundDiv = document.getElementById("soundDiv");
    soundDiv.pause();
    generateSpace('randomWord');
    document.getElementById('guessedLetters').textContent = "";
    console.log("inside reset false" +document.getElementById('guessedLetters').textContent );
     life = 10;
     reset = true;
  }
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
  document.getElementById('life').textContent = life;
  document.getElementById('win').textContent = win;
  document.getElementById('loss').textContent = loss;
  //hide all status message
  hideStatusDiv();
  //show info status message
  document.getElementById("info-div").style.display = "block";

}

    // This function is run whenever the user presses a key.
document.onkeyup = function(event) {
  if(reset == true)
  {
    generateSpace('randomWord');

    life = 10;
    document.getElementById('life').textContent = 10;
    //hide all status message
    hideStatusDiv();
    //show info status message
    document.getElementById("info-div").style.display = "block";
    reset = false;
  }
  else{
    console.log("reset true;")
    var userGuess = event.key;
    updateDOM(userGuess,word);
  }};

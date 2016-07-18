var prompt = require("prompt");
prompt.start();

var Word = require("./word.js");

var game = {
  wordBank: ["guitar","saxophone","piano","drums"],
  guessesRemaining : 10,
  currentWrd : null,
  startGame : function(wrd){
    var randomWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
    console.log(randomWord); // Comment out after testing
    this.currentWrd = new Word(randomWord);
    this.currentWrd.getLets();
    this.keepPrompting(); 
  },

  keepPrompting: function() {
    var self = this;
    prompt.get(["guessLetter"], function(err, result) {
      console.log("The Letter or space you guessed is : "+result.guessLetter);
      var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);

      console.log("Guess"+findHowManyOfUserGuess);
      
      if(findHowManyOfUserGuess === 0) {
        console.log("Your Guess Wro is wrong!");
        self.guessesRemaining -= 1;        
      } else {
        console.log("You're'right!");
        if (self.currentWrd.didWeFindTheWord()) {
          console.log("You Won!");
          return 1;
        }else {
          console.log("Guesses remaining:"+ self.guessesRemaining);
          console.log(self.currentWrd.wordRender());
          if (self.guessesRemaining > 0 && self.currentWrd.found === false){
            self.keepPrompting();
          } else {
            if (self.guessesRemaining === 0){
              console.log("Game Over Bro"); 
              console.log("The word you were guessing was:"+self.randomWord);
            }else {
              console.log(self.currentWrd.wordRender());
            }
          }
        }
      }
    });
  }
}
game.startGame();
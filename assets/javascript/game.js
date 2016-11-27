
var game = {
	characters: "abcdefghijklmnopqrstuvwxyz",
	missedLetters :[],
	wins : 0,
	losses : 0,
	chances: 9,

	pickRandomCharacter : function(){
	return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
	},

	updateWins : function(guess){
		getEl('status').innerHTML = 
		"You Win! \'" + guess + "\'' is right! Play again!";
		getEl('status').style.color ="green";
		getEl('wins').innerHTML = ++this.wins;
	},

	updateLosses : function(){
		getEl('status').innerHTML = "You Lost! Play again!";
		getEl('status').style.color = "red";
		getEl('losses').innerHTML = ++this.losses;
	},

	updateChances : function(){
		getEl('chances').innerHTML = --this.chances;
	},

	updateGuesses: function(guess){

		if(this.missedLetters.includes(guess))
		{
			getEl('status').innerHTML = 
			"You have already guessed \'" + guess + "\'! Try again!" ;
			getEl('status').style.color = "red";	
			this.resetStatus();
		}
		else{
			var appendPicks = getEl("guesses");
			appendPicks.appendChild(document.createTextNode(guess + ", "));

			this.missedLetters.push(guess);
			this.updateChances();
		}

	},

	resetStatus: function(){
		setTimeout('getEl("status").innerHTML = \"Guess a letter between (a-z)!\"', 3000);
		setTimeout('getEl("status").style.color= \"#ffffff\"', 3000);

	},

	resetGame : function(){
		this.chances = 9;
		this.missedLetters=[];

		this.resetStatus();

		// document.getElementById("games").innerHTML = ++this.numberOfGames;
		getEl("chances").innerHTML = this.chances;
		getEl("guesses").innerHTML = "";
	}
};

function getEl(id){
	return document.getElementById(id);
}


document.onkeyup = function(event){
	
	//capture player key value
	var playerGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// event.key;

	//computer picks a random letter
	var computerGuess=	game.pickRandomCharacter();

	console.log("PlayerGuess : " + playerGuess + ", ComputerGuess : " + computerGuess);

	var numOfChances = game.chances;
	// console.log("Number of chances left: " + numOfChances);

	if(computerGuess == playerGuess){
		console.log("You win! Resetting....");
		game.updateWins(playerGuess);
		game.resetGame();

	}else if(numOfChances <=1){
		console.log("You lost! Resetting.......");
		game.updateLosses();
		game.resetGame();

	}else {
		game.updateGuesses(playerGuess);
		
	}

}

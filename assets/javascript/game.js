var game = {
	characters: "abcdefghijklmnopqrstuvwxyz",
	numberOfGames : 0,
	missedLetters :[],
	wins : 0,
	losses : 0,
	chances: 9,
	pickRandomCharacter : function(){
	return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
	},
	updateWins : function(guess){
		document.getElementById('status').innerHTML = 
		"You Win! \'" + guess + "\'' is right! Play again!";
		document.getElementById('status').style.color = "green";
		document.getElementById('wins').innerHTML = ++this.wins;
	},
	updateLosses : function(){
		document.getElementById('status').innerHTML = "You Lost! Play again!";
		document.getElementById('status').style.color = "red";
		document.getElementById('losses').innerHTML = ++this.losses;
	},
	updateChances : function(){
		document.getElementById('chances').innerHTML = --this.chances;
	},
	updateGuesses: function(guess){

		if(this.missedLetters.includes(guess))
		{
			document.getElementById('status').innerHTML = 
			"You have already guessed \'" + guess + "\'! Try again!" ;
			document.getElementById('status').style.color = "red";	

			setTimeout('document.getElementById("status").innerHTML = \"Guess a letter between (a-z)!\"', 3000);
			setTimeout('document.getElementById("status").style.color= \"#ffffff\"', 3000);
		}
		else{
			var appendPicks = document.getElementById("guesses");
			appendPicks.appendChild(document.createTextNode(guess + ", "));
			// console.log(appendPicks.innerHTML);

			this.missedLetters.push(guess);
			this.updateChances();

		}

	},
	resetGame : function(){
		this.chances = 9;
		this.missedLetters=[];
		setTimeout('document.getElementById("status").innerHTML = \"Guess a letter between (a-z)!\"', 3000);
		setTimeout('document.getElementById("status").style.color= \"#ffffff\"', 3000);

		// document.getElementById("games").innerHTML = ++this.numberOfGames;
		document.getElementById("chances").innerHTML = this.chances;
		document.getElementById("guesses").innerHTML = "";
	}
}


document.onkeyup = function(event){

	
	//capture player key value
	var playerGuess = String.fromCharCode(event.keyCode).toLowerCase();
	// event.key;

	//computer picks a random letter
	var computerGuess=	game.pickRandomCharacter();

	console.log("PlayerGuess : " + playerGuess + ", ComputerGuess : " + computerGuess);

	var numOfChances = game.chances;
	console.log("Number of chances left: " + numOfChances);

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




/*-----'Working' code below without using object notation.-----*/

// document.onkeyup = function(event){

// 	var wins = document.getElementById("wins").innerHTML;
// 	var losses = document.getElementById("losses").innerHTML;;
// 	var chances = document.getElementById("chances").innerHTML;
// 	// console.log("Wins="+wins + ",Losses=" + losses + ",Chances left=" + chances);
	
// 	//capture player key value
// 	var playerPick = event.key;

// 	//Append to the letters picked earlier and display
// 	var appendPicks = document.getElementById("guesses");
// 	var content = document.createTextNode(playerPick + ", ");
// 	appendPicks.appendChild(content);
// 	// console.log(appendPicks.innerHTML);
	

// 	//computer picks a random letter
// 	var chars = "abcdefghijklmnopqrstuvwxyz";
// 	var computerPick =	chars.charAt(Math.floor(Math.random() * chars.length));

// 	console.log("Player : " + playerPick + ", Computer : " + computerPick);

// 	if(computerPick == playerPick){
// 		console.log("You win!" + "Resetting....");
// 		wins++;
// 		document.getElementById("wins").innerHTML = wins;
// 		document.getElementById("chances").innerHTML = 9;
// 		document.getElementById("guesses").innerHTML="";
// 	}else if(chances == 0){
// 		console.log("Resetting.......");
// 		losses++;
// 		document.getElementById("chances").innerHTML = 9;
// 		document.getElementById("losses").innerHTML = losses;
// 		document.getElementById("guesses").innerHTML= "";
// 	}else {
// 		// console.log("You picked different letters");
// 		chances--;
// 		document.getElementById("chances").innerHTML = chances;
// 	}

// }




// the app randomly picks a letter, and the user has to guess which letter the app chose. Put the following text on your page: -->
// Guess what letter I'm thinking of

// Wins: (# of times the user has guessed the letter correctly)

// Losses: (# of times the user has failed to guess the letter correctly after exhausting all guesses)

// Guesses Left: (# of guesses left. This will update)

// Your Guesses So Far: (the specific letters that the user typed. Display these until the user either wins or loses.) --> 

// When the player wins, increase the Wins counter and start the game over again (without refreshing the page). -->

// When the player loses, increase the Losses counter and restart the game without a page refresh (just like when the user wins).

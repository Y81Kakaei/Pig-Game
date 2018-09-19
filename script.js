///////////////Creating app variables///////////

var finalScores, roundScore, activePlayer, gamePlaying;
//gamePlaying is the state variable which decide to no play when a player is winner
gamePlaying = true;

init();
// console.log(dice);

///////////////////DOM manipulation////////////

/////////Rolling dice function//////////////////

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. generate a random number
    var dice = Math.floor(Math.random() * 6 + 1); //this one creates random number between 1 and 6
    //2.display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. Update the round scoreif the rolled dice is not equal to 1

    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

/////////Hold button function//////////////////

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Add current score to final score
    finalScores[activePlayer] += roundScore;
    //2. Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      finalScores[activePlayer];

    //3. Check which one is the winner

    if (finalScores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //4. change the player
      nextPlayer();
    }
  }
});

///next player function which changes the active player/////
function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //reset the current score
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //changing the active player class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //removing dice when player changes
  document.querySelector(".dice").style.display = "none";
}

////Creating a functionality for New Game button//////////////////

document.querySelector(".btn-new").addEventListener("click", init);

////This functions turns back everything to zero level///////
function init() {
  finalScores = [0, 0]; //the scores that each person get finally
  roundScore = 0; //this is the score that each person gets in every dice roll
  /* 0 is the first player and 1 is the second one 
wwith these cvalues you can access the first and second elements of
finalScores
*/
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";

  ////////The original value of scores, both current and final scores
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //Bring back the player name and remove winner title

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  //Removing the winner class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}

// var x = document.querySelector("#score-0").textContent;
// console.log(x);

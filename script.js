///////////////Creating app variables///////////

var finalScores, roundScore, activePlayer, gamePlaying, twoSix, winningScore;
//gamePlaying is the state variable which decide to no play when a player is winner
gamePlaying = true;



init();


/*********************DOM manipulation********************/





/////////Rolling dice function//////////////////

document.querySelector(".btn-roll").addEventListener("click", function () {

  if (gamePlaying) {

    //1. generate two random numbers
    var dice = Math.floor(Math.random() * 6 + 1);
    // var dice2 = Math.floor(Math.random() * 6 + 1);
    //2.display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //display the result of second dice
    // var diceDOM2 = document.querySelector(".dice2");
    // diceDOM2.style.display = "block";
    // diceDOM2.src = "dice-" + dice2 + ".png";


    //Check if users rolls two 6s in one row which remove the whole score 

    if (dice === 6) {
      twoSix++;
      // console.log(`${activePlayer} : ${twoSix}`);
      if (twoSix >= 2) {
        finalScores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent =
          finalScores[activePlayer];
        nextPlayer();
      }

    }



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

///////////////Creating a functionality for Set The Winning Number button//////////////////
document.querySelector('.btn-set').addEventListener('click', setWinNumber);
document.getElementById('input').value = 0;

function setWinNumber() {
  winningScore = document.getElementById('input').value;
  console.log(winningScore);
  if (winningScore >= 0) {
    gamePlaying = true;
  } else {
    gamePlaying = false;
  }

  init();

}

/////////Hold button function//////////////////

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Add current score to final score
    finalScores[activePlayer] += roundScore;
    //2. Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      finalScores[activePlayer];

    //3. Check which one is the winner

    if (finalScores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      //second dice
      // document.querySelector(".dice2").style.display = "none";
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
  //when the nextplayer shoul start, this is another row and the socre of twoSix should gets back to zero
  twoSix = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //changing the active player class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //removing dice when player changes
  document.querySelector(".dice").style.display = "none";
  //second dice
  // document.querySelector(".dice2").style.display = "none";
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
  twoSix = 0;
  activePlayer = 0;

  document.querySelector(".dice").style.display = "none";
  //second dice
  // document.querySelector(".dice2").style.display = "none";
  // document.getElementById('input').value = 0;

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
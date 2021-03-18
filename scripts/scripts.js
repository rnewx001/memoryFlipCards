class MeMEMEmory {
  constructor(timeLimit, playingCards) {
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
    this.cardArray = playingCards;
    this.timerElement = document.getElementById("remainingTime");
    this.flipsElement = document.getElementById("totalFlips");
    this.comboElement = document.getElementById("comboCount");
    this.scoreElement = document.getElementById("currentScore");
    this.cardHand = [];

    /*
    this.userName;
    this.userKey;*/
    /*this.audioController = new this.audioController();*/
  }

  gameStart() {
    this.flipsElement.innerHTML = "0";
    this.totalFlips = 0;
    this.comboElement.innerText = "0";
    this.maxCombo = 0;
    this.scoreElement.innerText = "0";
    this.currentScore = 0;
    this.lastMatched = false;
    this.visibleCardsCount = 0;
    this.flipFlag = true;
    this.busy = true; /*why?*/

    this.timerElement.innerHTML = this.timeRemaining; //set the html element to the passed limit
    setTimeout(() => {
      this.countdown = this.updateTime();
      this.busy = false;
    }, 500); /* Wait half a second, then execute the preceeding actions */
  }

  /* -------------------- Flip Count Tracking -------------------- */
  updateFlips() {
    this.flipsElement.innerHTML = parseInt(this.flipsElement.innerHTML) + 1;
  }

  /* -------------------- Combo Counter Update -------------------- */
  updateCombos(param) {
    //if param = 0 => clear; if param = 1 => increment the combo in UI
    if (param == 1) {
      let newComboCount = parseInt(this.comboElement.innerHTML) + 1;
      this.comboElement.innerHTML = newComboCount;
      if (newComboCount > this.maxCombo) {
        this.maxCombo = newComboCount;
      }
    } else if (param == 0) {
      this.comboElement.innerHTML = "0";
    }
  }

  /* -------------------- Timer Tracking -------------------- */
  updateTime() {
    return setInterval(() => {
      this.timeRemaining -= 1;
      this.timerElement.innerHTML = this.timeRemaining;
      if (this.timeRemaining == 0) {
        this.timerElement.innerHTML = "TIMES UP";
        this.gameOver();
      }
    }, 1001); /* run updateTime() every 1001ms or 1.001sec */
  }

  flipCard(playingCard) {
    /* first test that the card is 'flippable' */
    if (this.canFlip(playingCard)) {
      //if a card is face down...
      this.updateFlips(); //update the flip count
      this.changeFace(playingCard); //make the card face visible
      this.cardHand.push(playingCard); //push the new card into the array
      this.checkCardMatch(playingCard); //begin "match processing"
    }
  }
  canFlip(playingCard) {
    if (
      playingCard
        .getElementsByClassName("cardFront")[0]
        .classList.contains("visible") ||
      this.flipFlag == false
    ) {
      return false;
    } else {
      return true;
    }
  }

  /* -------------------- change card face to visible -------------------- */
  changeFace(playingCard) {
    playingCard.getElementsByClassName("cardFront")[0].classList.add("visible");
  }

  /* -------------------- change card face to hidden -------------------- */
  hideCards(cardHand) {
    //For each of the two cards in the cardHand array, remove the visible class name after 0.9secs
    this.cardHand.forEach((playingCard) => {
      setTimeout(() => {
        playingCard
          .getElementsByClassName("cardFront")[0]
          .classList.remove("visible");
      }, 900);
    });
  }

  /* -------------------- check cards for a match -------------------- */
  checkCardMatch(playingCard) {
    if (this.cardHand.length >= 2) {
      //if we have a pair...

      if (
        //if we have a match
        playingCard.getElementsByClassName("cardFrontIcon")[0].src ==
        this.cardHand[0].getElementsByClassName("cardFrontIcon")[0].src
      ) {
        this.matchFound();
        /*
        console.log("Match");
        //check if the last match was true, then increment combo
        if (this.lastMatched == true) {
          this.updateCombos(1); //param = 1; increment combo by 1
        } else {
          //else set last match to true for next play
          this.lastMatched = true;
        }
        //update the visible card count by 2
        this.visibleCardsCount += 2;
        //update the score
        this.updateScore(this.scorePlay());
        //check to see if all cards are matched
        //if all are visible, gameover()

        if (this.visibleCardsCount == this.getTotalCardCount()) {
          console.log("ALL ", this.getTotalCardCount(), " ARE VISIBLE");
          this.gameOver();
        }*/
      } else {
        this.mismatchFound();
        /*
        //no match
        console.log("NO Match");

        this.lastMatched = false; //set last match to false
        this.hideCards(this.cardHand); //hide the cards
        this.updateCombos(0); //param = 0; clear combo
        console.log(this.cardHand.length);*/
      }
      this.cardHand = []; //clear the array
      console.log("cardHand length: ", this.cardHand.length);
    } else {
      console.log("cardHand length: ", this.cardHand.length);
    }
  }

  matchFound() {
    console.log("Match");
    //check if the last match was true, then increment combo
    if (this.lastMatched == true) {
      this.updateCombos(1); //param = 1; increment combo by 1
    } else {
      //else set last match to true for next play
      this.lastMatched = true;
    }
    //update the visible card count by 2
    this.visibleCardsCount += 2;
    //update the score
    this.updateScore(this.scorePlay());
    //check to see if all cards are matched
    //if all are visible, gameover()

    if (this.visibleCardsCount == this.getTotalCardCount()) {
      console.log("ALL ", this.getTotalCardCount(), " ARE VISIBLE");
      this.gameOver();
    }
  }

  mismatchFound() {
    //no match
    this.flipFlag = false;
    console.log("NO Match");

    this.lastMatched = false; //set last match to false
    this.hideCards(this.cardHand); //hide the cards
    this.updateCombos(0); //param = 0; clear combo
    console.log(this.cardHand.length);

    setTimeout(() => {
      this.flipFlag = true;
    }, 900);
  }

  /* -------------------- returns total count of all playingCards on board -------------------- */

  getTotalCardCount() {
    return document.getElementsByClassName("playingCard").length;
  }

  /* -------------------- get the current score from UI -------------------- */
  getScore() {
    this.currentScore = parseInt(this.scoreElement.innerText);
    return this.currentScore;
  }
  /* -------------------- update score -------------------- */
  scorePlay() {
    let currScore = this.getScore();

    //Base bonus for making a match
    currScore += 10;

    //Bonus multiplier for current combo count
    let currComboCountMultiplier = parseInt(this.comboElement.innerHTML);
    currScore += currScore * currComboCountMultiplier;

    //Bonus multiplier for max combo count
    /*currScore += currScore * this.maxCombo;*/

    return currScore;
  }

  /* -------------------- update score w/ bonus -------------------- */
  scoreBonus() {
    let currScore = this.getScore();
    console.log("end score: ", currScore);
    if (currScore == 0) {
      //handles the case where player hits play but doesn't accumulate any score
      return 0;
    }

    //Bonus multiplier for max combo count
    currScore += currScore * this.maxCombo;
    console.log("after combo bonus, end score: ", currScore);

    //Bonus muliplier for Time Remaining
    let timeMult = parseInt(this.timerElement.innerText);
    currScore += currScore * timeMult;
    console.log("after time bonus, end score: ", currScore);

    //Bonus multiplier for Flips
    //get the number of cards and that gives us the perfect flip bonus
    //anything beyond this perfect number results in less multiplication
    let perfectFlipCount = this.getTotalCardCount();
    console.log("perfect flip count: ", perfectFlipCount);

    let maxFlipBonusMultiplier = perfectFlipCount;
    let flipBonusCountDiff = this.flipsElement.innerText - perfectFlipCount;
    if (flipBonusCountDiff >= 0) {
      currScore +=
        currScore * Math.abs(maxFlipBonusMultiplier - flipBonusCountDiff);
    }

    console.log("after flip bonus, end score: ", currScore);

    return currScore;
  }

  /* -------------------- update the current score to UI -------------------- */
  updateScore(currScore) {
    this.scoreElement.innerText = currScore;
  }

  /* -------------------- game over -------------------- */
  gameOver() {
    console.log("GAME OVER");
    clearInterval(this.countdown);
    this.flipFlag = false;
    this.updateScore(this.scoreBonus());
  }
} /* End of CLASS */

/*---------------------------------------- SECTION ----------------------------------------
/                                     NON-CLASS METHODS 
/------------------------------------------------------------------------------------------*/

/* -------------------- Describes methods to detect when DOM is loaded -------------------- */
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", load);
} else {
  load();
}

function load() {
  let titleScreen = document.getElementById("titleScreen");
  let playingCards = Array.from(document.getElementsByClassName("playingCard"));
  let game = new MeMEMEmory(100, playingCards);
  /*console.log(playingCards);*/
  /*playingCards.forEach((playingCards) => console.log(playingCards));*/
  /*let game = new MixOrMatch(100, cards);*/

  /* Remove the titlescreen and reveal the board when the start button is clicked */
  titleScreen.addEventListener("click", () => {
    document.getElementById("titleScreen").classList.add("invisible");
    document.getElementById("titleScreen").classList.add("hidden");
    document.getElementById("playerBoard").classList.add("visible");
    game.gameStart();
  });

  /*overlays.forEach(overlay => {
      overlay.addEventListener('click', () => {
          overlay.classList.remove('visible');
          game.startGame();
      });
  });*/

  /* Probably need to put the shuffle function here */

  playingCards.forEach((playingCards) => {
    playingCards.addEventListener("click", () => {
      game.flipCard(playingCards);
    });
  });
}

/* -------------------- -------------------- */
/*
function start() {
  document.getElementById("titleScreen").classList.add("invisible");
  document.getElementById("titleScreen").classList.add("hidden");
  document.getElementById("playerBoard").classList.add("visible");
}*/

/* -------------------- Timer Functions -------------------- */

/*
Every 1 second:
  Run a function that updates the RemainingTime count by -1

If the timer == ZERO, stop running the function
*/
/*
var d = new Date();

myVar = setInterval(
  updateTime,
  1001
); 

function updateTime() {
  const limit = 100;
  let e = new Date();
  let diff = Math.floor((e - d) / 1000);
  let z = limit - diff;



  document.getElementById("remainingTime").innerText = z;

  if (diff > limit) {
    
    document.getElementById("remainingTime").innerText = "TIMES UP";

    clearInterval(myVar);
  }
}*/

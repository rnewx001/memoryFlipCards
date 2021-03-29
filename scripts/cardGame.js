class AudioController {
  constructor() {
    this.bgMusic = new Audio("audio/Avengers.mp3");
    this.flipSound = new Audio("audio/flip.wav");
    this.matchSound = new Audio("audio/match.wav");
    this.victorySound = new Audio("audio/victory.wav");
    this.gameOverSound = new Audio("audio/gameOver.wav");
    this.bgMusic.volume = 0.3;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

class Memory {
  constructor(timeLimit, playingCards) {
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
    this.cardArray = playingCards;
    this.timerElement = document.getElementById("remainingTime");
    this.comboElement = document.getElementById("comboCount");
    this.scoreElement = document.getElementById("currentScore");
    this.endScoreElement = document.getElementById("endScore");
    this.cardHand = [];
    this.audioController = new AudioController();
  }

  //Initialize variables
  //Shuffle cards
  //Kick off timer
  //Start game
  gameStart() {
    this.comboElement.innerText = "0";
    this.maxCombo = 0;
    this.scoreElement.innerText = "0";
    this.currentScore = 0;
    this.currentCombo = 0;
    this.lastMatched = false;
    this.visibleCardsCount = 0;
    this.cardDelay = 800; //800ms => should be the same as "" selector in CSS
    this.flipFlag = true;
    this.matchBonus = 100;
    this.comboBaseBonus = 1000;
    this.timeMultBonus = 10000;
    this.flipCountBonus = 100000;
    this.busy = true;

    this.audioController.startMusic();
    this.timerElement.innerHTML = this.timeRemaining; //set the html element to the passed limit
    setTimeout(() => {
      this.shuffleCards(this.cardArray);
      this.countdown = this.updateTime();
      this.busy = false;
    }, 500); /* Wait half a second, then execute the preceeding actions */
  }

  //Fisher-Yates Shuffle Algorithm
  shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * i);
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }

  //Decrement the Timer by 1 second every 1.001 sec
  updateTime() {
    return setInterval(() => {
      this.timeRemaining -= 1;
      this.timerElement.innerHTML = this.timeRemaining;
      if (this.timeRemaining === 0) {
        this.timerElement.innerHTML = "TIMES UP";
        this.gameOver("lose");
      }
    }, 1001); /* run updateTime() every 1001ms or 1.001sec */
  }

  //Function that flips the clicked card
  flipCard(playingCard) {
    if (this.canFlip(playingCard)) {
      //test to see if card is flippable
      this.audioController.flip();
      this.changeFace(playingCard); //make the card face visible
      this.cardHand.push(playingCard); //push the new card into the card hand array
      this.checkCardMatch(playingCard); //begin "match processing"
    }
  }

  //Function that tests if a card can be flipped
  canFlip(playingCard) {
    if (
      playingCard.querySelector(".cardFront").classList.contains("visible") ||
      this.flipFlag === false
    ) {
      return false;
    }
    return true;
  }

  //Function that changes card face to visible
  changeFace(playingCard) {
    playingCard.querySelector(".cardFront").classList.add("visible");
  }

  //Function checks cards in card hand for a match
  checkCardMatch(playingCard) {
    if (this.cardHand.length >= 2) {
      //if we have a pair in our hand...
      if (
        playingCard.querySelector(".cardFrontIcon").src ===
        this.cardHand[0].querySelector(".cardFrontIcon").src
      ) {
        //if we have a match
        this.matchFound();
      } else {
        this.mismatchFound();
      }
      this.cardHand = []; //clear the array
    }
  }

  //Function handles card-match condition
  matchFound() {
    if (this.lastMatched === true) {
      this.updateCombos(1); //param = 1; increment combo by 1
    } else {
      this.lastMatched = true;
    }
    //update the score
    this.updateScore(this.scorePlay());
    this.audioController.match();

    //update the visible card count by 2
    this.visibleCardsCount += 2;
    //if ALL cards have been turned over
    if (this.visibleCardsCount === this.getTotalCardCount()) {
      this.gameOver("win");
    }
  }

  //Function handles card-mismatch condition
  mismatchFound() {
    this.flipFlag = false; //set flag to prevent user from flipping additional cards during mismatch
    this.lastMatched = false; //set last match to false
    this.hideCards(this.cardHand); //hide the cards
    this.updateCombos(0); //param = 0; clear combo

    //this block ensures the player can't uncover more than 2 cards at a time
    //after 800ms (this.cardDelay), reset flipFlag to true
    //800ms should give the card flip animation time to complete
    setTimeout(() => {
      this.flipFlag = true;
    }, this.cardDelay);
  }

  //Function updates the current combo count in the UI and updates maxCombo
  updateCombos(param) {
    //if param = 0 => clear; if param = 1 => increment the combo in UI
    if (param == 1) {
      this.currentCombo += 1;
      this.comboElement.innerHTML = this.currentCombo;

      if (this.currentCombo > this.maxCombo) {
        this.maxCombo = this.currentCombo;
      }
    } else if (param == 0) {
      this.currentCombo = 0;
      this.comboElement.innerHTML = this.currentCombo;
    }
  }

  //Function that hides the cards in the passed card array
  hideCards(cardArray) {
    //For each card in the array, remove the visible class name after time set in this.cardDelay
    cardArray.forEach((playingCard) => {
      setTimeout(() => {
        playingCard.querySelector(".cardFront").classList.remove("visible");
      }, this.cardDelay);
    });
  }

  //Function updates the UI with the current score
  updateScore(currScore) {
    this.scoreElement.innerText = currScore;
  }

  //Function updates score member variable
  scorePlay() {
    //Base bonus for making a match
    this.currentScore += this.matchBonus;

    //Bonus multiplier for current combo count
    this.currentScore += this.comboBaseBonus * this.currentCombo;

    return this.currentScore;
  }

  //Function returns total count of all playingCards on board
  getTotalCardCount() {
    return document.getElementsByClassName("playingCard").length;
  }

  //Function updates the score with bonuses
  scoreBonus() {
    if (this.currentScore === 0) {
      //handles case if player doesn't accumulate any score
      return 0;
    }
    //Bonus muliplier for Time Remaining
    let timeMult = parseInt(this.timerElement.innerText);
    if (!isNaN(timeMult)) {
      //test to ensure the multiplier doesn't use "TIMES UP"
      timeMult = Math.floor(timeMult / 10);
      this.currentScore += this.timeMultBonus * timeMult;
    }

    return this.currentScore;
  }

  //Function handles game over states
  gameOver(endState) {
    clearInterval(this.countdown); //kill the timer
    this.flipFlag = false; //set all cards to unflippable
    this.updateScore(this.scoreBonus());

    if (endState == "win") {
      this.audioController.victory();
    } else {
      this.audioController.gameOver();
    }

    setTimeout(() => {
      document.querySelector("#GameOverScreen").classList.remove("hidden");
      document.querySelector("#playerBoard").classList.add("blur");
    }, 500);

    this.endScoreElement.innerText = this.currentScore;
  }
}

export default Memory;

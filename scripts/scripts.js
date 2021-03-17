class MeMEMEmory {
  constructor(timeLimit, playingCards) {
    this.timeLimit = timeLimit;
    this.timeRemaining = timeLimit;
    this.cardArray = playingCards;
    this.timerElement = document.getElementById("remainingTime");
    this.flipsElement = document.getElementById("totalFlips");
    this.comboElement = document.getElementById("comboCount");
    this.scoreElement = document.getElementById("currentScore");

    /*
    this.userName;
    this.userKey;*/
    /*this.audioController = new this.audioController();*/
  }

  gameStart() {
    this.flipsElement.innerHTML = "0";
    this.totalFlips = 0;
    this.comboElement.innerText = "0";
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
      this.updateFlips();
      this.changeFace(playingCard);
    }
  }
  canFlip(playingCard) {
    if (
      playingCard
        .getElementsByClassName("cardFront")[0]
        .classList.contains("visible")
    ) {
      return false;
    } else {
      return true;
    }
  }

  /* -------------------- change card face to visible-------------------- */
  changeFace(playingCard) {
    playingCard.getElementsByClassName("cardFront")[0].classList.add("visible");
  }

  /* -------------------- game over -------------------- */
  gameOver() {
    console.log("GAME OVER");
    clearInterval(this.countdown);
  }
} /* End of CLASS */

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

  playingCards.forEach((playingCards) => {
    playingCards.addEventListener("click", () => {
      game.flipCard(playingCards);
    });
  });
}

/* -------------------- Combo Counter Update -------------------- */

var lastMatched = false;

function isMatch() {
  if (cardA == cardB) {
    lastMatched = true;
  }
}

function updateCombos(lastMatched) {
  if (lastMatched == true) {
    let comboCount = parseInt(document.getElementById("comboCount").innerText);
    document.getElementById("comboCount").innerText = comboCount + 1;
  } else {
    document.getElementById("comboCount").innerText = 0;
  }
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

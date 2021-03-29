import Memory from "./cardGame.js"; //import card game class as Memory

/*  Add an event listener for page loading
    call load() if the DOM is loaded */
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", load);
} else {
  load();
}

/* Gather all cards into an array
    Create a new instance of Memory ( passing 60 sec time limit and card array)
    Start game */
function load() {
  let playingCards = Array.from(document.querySelectorAll(".playingCard"));
  let game = new Memory(1, playingCards);
  let titleScreen = document.querySelector("#titleScreen button");

  /*  Remove the titlescreen 
      Reveal the board when the start button is clicked */
  titleScreen.addEventListener("click", () => {
    document.querySelector("#titleScreen").classList.add("invisible");
    document.querySelector("#titleScreen").classList.add("hidden");
    document.querySelector("#titleBar").classList.add("visible");
    document.querySelector("#playerBoard").classList.add("visible");
    document.body.classList.add("blur");
    game.gameStart();
  });

  /*  Add a "click" event listener for each of the playingCard objects
      Calls flipCard() on any card clicked */
  playingCards.forEach((playingCards) => {
    playingCards.addEventListener("click", () => {
      game.flipCard(playingCards);
    });
  });
}

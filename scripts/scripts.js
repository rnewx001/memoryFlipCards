/* -------------------- Flip Count Tracking -------------------- */

/* global var so far to track the total # of flips */
var flips = 0;

function updateFlips() {
  flips += 1;
  document.getElementById("totalFlips").innerText = flips;
}

/* -------------------- Combo Counter Update -------------------- */

var lastMatched = false;

function updateCombos(lastMatched) {
  if (lastMatched == true) {
    let comboCount = parseInt(document.getElementById("comboCount").innerText);
    document.getElementById("comboCount").innerText = comboCount + 1;
  } else {
    document.getElementById("comboCount").innerText = 0;
  }
}

/* -------------------- -------------------- */

function start() {
  document.getElementById("titleScreen").classList.add("invisible");
  document.getElementById("titleScreen").classList.add("hidden");
  document.getElementById("playerBoard").classList.add("visible");
}

/* -------------------- -------------------- */

function changeFace(element) {
  console.log(element.nextElementSibling.classList.add("visible"));
  element.nextElementSibling.classList.add("visible");
}

/* -------------------- Timer Functions -------------------- */

/*
Every 1 second:
  Run a function that updates the RemainingTime count by -1

If the timer == ZERO, stop running the function
*/

var d = new Date();

myVar = setInterval(
  updateTime,
  1001
); /* run updateTime() every 1000ms or 1sec */

function updateTime() {
  const limit = 100;
  let e = new Date();
  let diff = Math.floor((e - d) / 1000);
  let z = limit - diff;

  /*console.log(diff);*/

  document.getElementById("remainingTime").innerText = z;

  if (diff > limit) {
    /*console.log("TIME UP");*/
    document.getElementById("remainingTime").innerText = "TIMES UP";

    clearInterval(myVar);
  }
}

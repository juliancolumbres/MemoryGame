// global constants
const initialClueHoldTime = 500;
const cluePauseTime = 250; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var clueHoldTime; //how long to hold each clue's light/sound
var pattern = []; // empty pattern, fill when game starts
var patternLength = 5;
var buttonCount = 4;
var strikes = 0;
var guessCounter = 0;
var timerIsOn = true;
var timePerGuess = 4;
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.3; //must be between 0.0 and 1.0

function createPattern() {
  // ensure pattern is empty
  pattern = [];
  // populate pattern with random values between 1 and the buttonCount
  for (var i = 0; i < patternLength; i++) {
    pattern.push(Math.floor(Math.random() * buttonCount) + 1);
  }
}

function setButtonCount(newCount) {
  // if newCount is less than buttonCount, hide all buttons after newCount
  if (newCount < buttonCount) {
    for (var i = newCount + 1; i <= buttonCount; i++) {
      document.getElementById("button" + i).classList.add("hidden");
    }
    buttonCount = newCount;
    // otherwise newCount is more than current buttonCount, show the hidden button(s)
  } else {
    for (var i = buttonCount; i <= newCount; i++) {
      document.getElementById("button" + i).classList.remove("hidden");
    }
    buttonCount = newCount;
  }
}

function setTimePerGuess(time) {
  timePerGuess = time;
  document.getElementById("time").innerHTML = time;
}

function setDifficulty(difficulty) {
  document.getElementById("currentMove").innerHTML = 1;
  if (difficulty == 1) {
    // easy
    setButtonCount(4);
    setTimePerGuess(4);
    patternLength = 5;
  } else if (difficulty == 2) {
    // medium
    setButtonCount(5);
    setTimePerGuess(3);
    patternLength = 8;
  } else {
    // hard
    setButtonCount(6);
    setTimePerGuess(2);
    patternLength = 10;
  }
}

function displayVariables() {
  document.getElementById("time").innerHTML = 3;
  document.getElementById("currentMove").innerHTML = 1;
}

function startGame() {
  //initialize game variables
  strikes = 0;
  clueHoldTime = initialClueHoldTime;
  createPattern();
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  gamePlaying = false;
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  // speed up, unless clueHoldTime is less than 150 ms
  if (clueHoldTime > 150) {
    clueHoldTime -= 50;
  }
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
  stopCount();
  setTimeout(startCount, delay - cluePauseTime);
}

function lostGame(reason) {
  stopGame();
  if (reason == strikes) {
    alert("You ran out of strikes! Game over.");
  } else {
    alert("Times up! Game over.");
  }
  document.getElementById("currentMove").innerHTML = 1;
}

function wonGame() {
  stopGame();
  alert("Game Over. You won!");
}

function guess(btn) {
  stopCount();
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }

  // add game logic here
  if (btn == pattern[guessCounter]) {
    if (guessCounter == progress) {
      if (progress == pattern.length - 1) {
        wonGame();
      } else {
        progress++;
        document.getElementById("currentMove").innerHTML = progress + 1;
        playClueSequence();
      }
    } else {
      guessCounter++;
      setTimeout(startCount, 250);
    }
  } else {
    if (strikes == 2) {
      lostGame("strikes");
    } else {
      strikes++;
      alert("Strike " + strikes + "! You have " + (3 - strikes) + " left.");
      clueHoldTime += 50;
      playClueSequence();
    }
  }
}
var timer;
var timeLeft = timePerGuess;
function timedCount() {
  if (!gamePlaying) {
    return;
  }
  if (timeLeft == 0) {
    document.getElementById("time").innerHTML = 0;
    clearTimeout(timer);
    timerIsOn = false;
    lostGame("time");
  }
  document.getElementById("time").innerHTML = timeLeft;
  timeLeft--;
  timer = setTimeout(timedCount, 1000);
}

function startCount() {
  timeLeft = timePerGuess;
  if (!timerIsOn) {
    timerIsOn = false;
    timedCount();
  }
}

function stopCount() {
  timeLeft = timePerGuess;
  document.getElementById("time").innerHTML = timeLeft;
  clearTimeout(timer);
  timerIsOn = false;
}

// Sound Synthesis Functions
const freqMap = {
  1: 50,
  2: 100,
  3: 150,
  4: 200,
  5: 250,
  6: 300
};

function playTone(btn, len) {
  console.log(o1.frequency.value);
  o1.frequency.value = freqMap[btn];
  o2.frequency.value = freqMap[btn] + 100;
  o3.frequency.value = freqMap[btn] + 200;
  g1.gain.setTargetAtTime(volume, context1.currentTime + 0.05, 0.025);
  g2.gain.setTargetAtTime(volume, context2.currentTime + 0.05, 0.025);
  g3.gain.setTargetAtTime(volume, context3.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}

function stopTone() {
  g1.gain.setTargetAtTime(0, context1.currentTime + 0.05, 0.025);
  g2.gain.setTargetAtTime(0, context2.currentTime + 0.05, 0.025);
  g3.gain.setTargetAtTime(0, context3.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

function startChord(btn) {
  if (!tonePlaying) {
    o1.frequency.value = freqMap[btn];
    o2.frequency.value = freqMap[btn] + 100;
    o3.frequency.value = freqMap[btn] + 200;
    g1.gain.setTargetAtTime(volume, context1.currentTime + 0.05, 0.025);
    g2.gain.setTargetAtTime(volume, context2.currentTime + 0.2, 0.025);
    g3.gain.setTargetAtTime(volume, context3.currentTime + 0.35, 0.025);
    tonePlaying = true;
  }
}

function stopChord() {
  g1.gain.setTargetAtTime(0, context1.currentTime + 0.05, 0.025);
  g2.gain.setTargetAtTime(0, context2.currentTime + 0.2, 0.025);
  g3.gain.setTargetAtTime(0, context3.currentTime + 0.35, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context1 = new AudioContext();
var o1 = context1.createOscillator();
o1.type = "sine";
o1.frequency.value = 100;
var g1 = context1.createGain();
g1.connect(context1.destination);
g1.gain.setValueAtTime(0, context1.currentTime);
o1.connect(g1);
o1.start(0);

var context2 = new AudioContext();
var o2 = context2.createOscillator();
o2.type = "sine";
o2.frequency.value = 100;
var g2 = context2.createGain();
g2.connect(context2.destination);
g2.gain.setValueAtTime(0, context2.currentTime);
o2.connect(g2);
o2.start(0);

var context3 = new AudioContext();
var o3 = context3.createOscillator();
o3.type = "sine";
o3.frequency.value = 100;
var g3 = context3.createGain();
g3.connect(context3.destination);
g3.gain.setValueAtTime(0, context3.currentTime);
o3.connect(g3);
o3.start(0);

function enableSound() {
  context1.resume();
  context2.resume();
  context3.resume();
}

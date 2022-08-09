
var labelMinutes   = document.getElementById('min')
var labelSeconds   = document.getElementById('sec')
var labelSeparator = document.getElementById('sep')
var progressBar    = document.getElementById('progress')
var backgroundColors = [ 'white', 'green', 'yellow', 'red' ];
var backgroundTreshholds = [0, 5*60, 3*60, 60];
var timerMin = 15;
var timerSec = 00;
var timerTime = timerMin * 60 + timerSec;
var timerStartTime = timerTime;
var timerActive = false;
var lastInput = "15:00";

function sanitizeNumber(val) {
    return val >= 10 ? "" + val : "0" + val;
}

function updateBackground() {
    for ( var i = backgroundTreshholds.length; i > 0; --i ) {
        if ( timerTime <= backgroundTreshholds[i] )
        {
            document.body.style.backgroundColor = backgroundColors[i];
            return;
        }
    }
    document.body.style.backgroundColor = backgroundColors[0];
}

function setTime(min, sec) {
    timerTime = min * 60 + sec;
    timerMin = min;
    timerSec = sec;
    labelMinutes.innerText = sanitizeNumber(min);
    labelSeconds.innerText = sanitizeNumber(sec);
    progressBar.value = timerStartTime > 0 ? 100.0 * (timerTime / timerStartTime) : 0;
    updateBackground();
}

function handleStartPause() {
    timerActive = !timerActive;
}

function handleSetTimer() {
    timerActive = false;
    msgInvalidInput = "The input is invalid!";
    lastInputTemp = prompt("Enter the time [MM:SS]:", lastInput);
    if ( ( lastInputTemp.length < 3 ) || ( lastInputTemp.length > 5 ) || ( lastInputTemp.indexOf(':') <= 0 ) || ( lastInputTemp.indexOf(':') == lastInputTemp.length - 1 )  ) {
        alert(msgInvalidInput);
        return;
    }
    valMin = parseInt(lastInputTemp.substr(0, lastInputTemp.indexOf(':')));
    valSec = parseInt(lastInputTemp.substr(lastInputTemp.indexOf(':') + 1));
    if ( isNaN(valMin) || isNaN(valSec) || valSec > 59 || valMin > 99 || valSec < 0 || valMin < 0 ) {
        alert(msgInvalidInput);
        return;
    }
    timerTime = valMin * 60 + valSec;
    timerStartTime = timerTime;
    lastInput = lastInputTemp;
    setTime(valMin, valSec);
}

function handleResetTimer() {
    timerActive = false;
    setTime(Math.floor(timerStartTime / 60), timerStartTime % 60);
}

function intervalHandler() {
    if ( ( !timerActive ) || ( timerTime <= 0 ) ) {
        timerActive = false;
        return;
    }
    timerTime--;
    setTime(Math.floor(timerTime / 60), timerTime % 60);
}

function inputHandler(e) {
    if (e.keyCode === 32) 
    {
        // spacebar
        handleStartPause();
    } else if ( e.keyCode == 82 ) {
        // 'R' key
        handleResetTimer();
    } else if ( e.keyCode == 83 ) {
        handleSetTimer();
    }
}

window.addEventListener('keydown', inputHandler);
setInterval(intervalHandler, 1000);
setTime(timerMin, timerSec);

console.log("KCT timer loaded!");

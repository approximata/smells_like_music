let playedCode = '';
const theSoundKeyCodes = [70, 66, 65, 68, 70, 66, 65];
const step = 95 / theSoundKeyCodes.length;
let count = 0;
let status;
let statusCalc;

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function main(e){
  if (!checkStrokes(e)) return;
  addStatusBar(e);
  console.log(status);
  collectStrokesKey(e);
  playSound(e);
}

function checkStrokes(e){
  return theSoundKeyCodes.indexOf(e.keyCode) > -1;
}

function collectStrokesKey(e) {
  const key = e.keyCode;
  playedCode += key.toString();
  playTheSong(playedCode);
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function playTheSong(played) {
  if(status != '95%') return;
  status = '';
  const audio = document.querySelector('.instrumetal');
  audio.currentTime = 0;
  audio.play();
  audio.addEventListener("ended", function(){
    console.log("ended");
    count = 0;
    document.documentElement.style.setProperty(`--width`, 0);
  });
}

function addStatusBar(e) {
  if(theSoundKeyCodes[count] === e.keyCode){
    count++;
    statusCalc = count * step;
    status = statusCalc + '%';
    document.documentElement.style.setProperty(`--width`, status);
  }
}


const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', main);

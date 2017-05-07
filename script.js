let playedCode = '';
const theSoundKeyCodes = [70, 66, 65, 68, 70, 66, 65];
const step = 95 / theSoundKeyCodes.length;
let count = 0;
let status;
let statusCalc;
let clickedValue = {keyCode:0}


function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function main(e){
  let theKeyCode;
  if(typeof e.keyCode === 'string'){
    theKeyCode = parseInt(e.keyCode);
  }
  else{
    theKeyCode = e.keyCode;
  }
  if (!checkStrokes(theKeyCode)) return;
  addStatusBar(theKeyCode);
  collectStrokesKey(theKeyCode);
  playSound(theKeyCode);
}

function checkStrokes(keyCode){
  return theSoundKeyCodes.indexOf(keyCode) > -1;
}

function collectStrokesKey(keyCode) {
  const key = keyCode;
  playedCode += key.toString();
  playTheSong(playedCode);
}

function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`div[data-key="${keyCode}"]`);
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

function addStatusBar(keyCode) {
  if(theSoundKeyCodes[count] === keyCode){
    count++;
    statusCalc = count * step;
    status = statusCalc + '%';
    document.documentElement.style.setProperty(`--width`, status);
  }
}

function getClickedAndPlay(e) {
  e.path.forEach(element => {
    if(element.classList){
      if(element.classList['value'] == 'key'){
        clickedValue.keyCode = element.getAttribute('data-key')
        main(clickedValue);
      }
    }
  });
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', main);
keys.forEach(key => key.style.cursor = 'pointer');
keys.forEach(key => key.addEventListener('click', getClickedAndPlay));

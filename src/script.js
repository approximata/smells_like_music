let playedCode = '';
const theCode = '70666568706665';
const theSoundKeyCodes = [70, 66, 65, 68, 70, 66, 65];
let count = 0;

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function main(e){
  console.log(status);
  if (!checkStrokes(e)) return;
  collectStrokesKey(e);
  playSound(e);
  addStatusBar(e);
}

function checkStrokes(e){
  console.log();
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
  if(played == theCode){
    const audio = document.querySelector('.instrumetal');
    audio.currentTime = 0;
    audio.play();
    audio.addEventListener("ended", function(){
    console.log("ended");
    count = 0;
    document.documentElement.style.setProperty(`--width`, 0);
});
  }
  return;
}

function addStatusBar(e) {

  if(theSoundKeyCodes[count] === e.keyCode){
    count++;
    let tempCalc = count * 13.555;
    let status = tempCalc + '%';
    document.documentElement.style.setProperty(`--width`, status);
  }
}


const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', main);

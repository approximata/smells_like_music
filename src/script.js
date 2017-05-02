function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function collectSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  const key = e.keyCode;
  playedCode += key.toString();
  if (playedCode.length > 34){
    playedCode = []
  }
  playTheSong(playedCode);
}

function playTheSong(played) {
  if(played == theCode){
    const audio = document.querySelector('.instrumetal');
    audio.currentTime = 0;
    audio.play();
  }
  return;
}

let playedCode = '';
const theCode = '70666568706665'
const theSound = [70, 66, 65, 68, 70, 66, 65]
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('keydown', collectSound);

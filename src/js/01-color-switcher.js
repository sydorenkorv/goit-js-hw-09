const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]')
let timerId = null;
stopBtn.disabled = "true"

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', function () {
    stopBtn.removeAttribute('disabled');
    startBtn.disabled = "true"
  timerId = setInterval(() => {
    const colorBg = getRandomHexColor();
    document.body.style.background = colorBg;
  }, 1000);
    
});

stopBtn.addEventListener('click', function () {
  clearInterval(timerId);
    startBtn.removeAttribute('disabled');
    stopBtn.disabled = "true"
});

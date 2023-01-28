const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalID = null;

const getRandomHexColor = function () {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const bodyColorChanger = function () {
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
};

const onStartButtonClick = function () {
  intervalID = setInterval(bodyColorChanger, 1000);
  refs.btnStart.disabled = true;
};

const onStopButtonClick = function () {
  clearInterval(intervalID);
  refs.btnStart.disabled = false;
};

refs.btnStart.addEventListener('click', onStartButtonClick);
refs.btnStop.addEventListener('click', onStopButtonClick);

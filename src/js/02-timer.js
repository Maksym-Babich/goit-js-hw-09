import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
let pickedDate = null;
let startDate = null;
let intervalID = null;
const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
const onDatePickerClose = function (date) {
  const dateNow = Date.now();
  if (date.getTime() > dateNow) {
    pickedDate = date;
    refs.btnStart.disabled = false;
    return;
  }
  refs.btnStart.disabled = true;
  window.alert('Please choose a date in the future');
};

const convertMs = function (ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = function (value) {
  return value.toString().padStart(2, '0');
};

const displayNewTime = function ({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
};

const countMsToDisplay = function (date) {
  const msToDisplay = date.getTime() - Date.now();
  return msToDisplay;
};

const onCountdownStarted = function () {
  if (pickedDate.getTime() < Date.now()) {
    clearInterval(intervalID);
    displayNewTime({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    return;
  }
  displayNewTime(convertMs(countMsToDisplay(pickedDate)));
};

const onStartButtonClick = function () {
  intervalID = setInterval(onCountdownStarted, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDatePickerClose(selectedDates[0]);
  },
};

flatpickr(refs.input, options);
refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', onStartButtonClick);

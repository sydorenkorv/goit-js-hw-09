// Described in documentation
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
// Additional styles import
import 'flatpickr/dist/flatpickr.min.css';


const startBtn = document.querySelector('[data-start]');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');

let timer = null;

startBtn.disabled = 'true';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = 'true';
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

function counterStart() {
  startBtn.disabled = true;
  timer = setInterval(() => {
    const dateNow = new Date().getTime();
    let dateSelected = document.querySelector('input#datetime-picker');
    let dateSelectedMs = new Date(dateSelected.value).getTime();
    const timeLeft = dateSelectedMs - dateNow;
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    d.innerHTML = days < 10 ? addLeadingZero(days) : days;
    h.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
    m.innerHTML = minutes < 10 ? addLeadingZero(minutes) : minutes;
    s.innerHTML = seconds < 10 ? addLeadingZero(seconds) : seconds;

    if (timeLeft < 1000) {
      clearInterval(timer);
      startBtn.disabled = false;
    }
  }, 1000);
}

function addLeadingZero(value) {
  const stringValue = String(value);
  return stringValue.padStart(2, '0');
}

startBtn.addEventListener('click', counterStart);

function convertMs(ms) {
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
}

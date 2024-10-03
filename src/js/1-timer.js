import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = {};
let counterId = 0;

const startBtn = document.querySelector('.start-btn')
const timer = document.querySelectorAll('.value')
const dataField = document.querySelector('#datetime-picker')
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() > Date.now()) {
        userSelectedDate = selectedDates[0];
        
        //стили для активной кнопки Старт
        startBtn.classList.remove('disabled')
        startBtn.classList.add('active')
        startBtn.disabled = false

        //show preview of remaining time
        showRemainingTime(userSelectedDate)
      } else {
        iziToast.show({
          class: 'toast-message',
          title: 'Error',
          titleColor: '#fff',
          message: 'Please choose a date in the future',
          messageColor: '#fff',
          iconUrl: '/goit-js-hw-10/img/error-icon.svg',
          iconColor: '#fff',
          backgroundColor: '#EF4040',
          border: '2px solid #FFBEBE',
          position: 'topRight',
        });

        //стили для неактивной кнопки Старт
        startBtn.classList.remove('active')
        startBtn.classList.add('disabled')
        startBtn.disabled = true
      }
    },
};

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

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', timerStart)
function timerStart() {
    if (startBtn.classList.contains('disabled')) {
        return;
    }
    dataField.classList.add('disabled')
    dataField.disabled = true;
    startBtn.disabled = true;
    startBtn.classList.add('disabled')
    startBtn.classList.remove('active')
    showRemainingTime(userSelectedDate)
    counterId = setInterval(showRemainingTime, 1000, userSelectedDate);
}

function showRemainingTime(date) {
    const remainingMs = date.getTime() - Date.now();
    if (remainingMs <= 0) {
      console.log('its time')
      clearInterval(counterId)
      dataField.classList.remove('disabled')
      dataField.disabled = false
      startBtn.disabled = false
      startBtn.classList.remove('disabled')
      startBtn.classList.add('active')
      return
    }
    
    const remainingTime = new RemainingTime( convertMs(remainingMs) );
    
    timer[0].innerHTML = remainingTime.formatingOutput("days");
    timer[1].innerHTML = remainingTime.formatingOutput("hours");
    timer[2].innerHTML = remainingTime.formatingOutput("minutes");
    timer[3].innerHTML = remainingTime.formatingOutput("seconds"); 
    
    // timer[0].innerHTML = remainingTime.days.padStart(2, '0'); easy way, no need class and method then
    // timer[1].innerHTML = remainingTime.hours.padStart(2, '0'); 
    // timer[2].innerHTML = remainingTime.minutes.padStart(2, '0');
    // timer[3].innerHTML = remainingTime.seconds.padStart(2, '0');
}

class RemainingTime {
  constructor(params) {
    this.days = params.days;
    this.hours = params.hours;
    this.minutes = params.minutes;
    this.seconds = params.seconds;
  }

  formatingOutput(value) {
    if (this[value] < 10) {
      return `0${this[value]}`
    } else {
      return this[value]
    }
  }
};
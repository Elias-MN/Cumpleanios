const monthsElement = document.getElementById('meses');
const daysElement = document.getElementById('dias');
const hoursElement = document.getElementById('horas');
const titleElement = document.getElementById('title');
const countdownElement = document.getElementById('countdown-container');

let currentDate = new Date();
let yearGoal = 2023;
let monthGoal = 3;
let dayGoal = 1;
let hourGoal = 0;
let goalDate = new Date(yearGoal, monthGoal, dayGoal, hourGoal);
let totalSeconds, hours, days, months;

let springSeasonStart = 2;
let summerSeasonStart = 5;
let autumnSeasonStart = 9;
let winterSeasonStart = 11
let currentMonth = currentDate.getMonth();
//currentMonth = 9;

let secondsOfOneHour = 1440000;
let countdownInterval = setInterval(countdown, secondsOfOneHour);

changeSeasonElements();
checkYear();
countdown();

function checkYear() {
  if (goalDate.getTime() < currentDate.getTime()) {
    goalDate.setFullYear(goalDate.getFullYear() + 1);
  }
}


function getTime() {
  totalSeconds = (goalDate - currentDate) / 1000;
  hours = Math.floor(totalSeconds / 3600) % 24;
  days = Math.floor(totalSeconds / 3600 / 24) % 30;
  months = Math.floor(totalSeconds / 3600 / 24 / 30) % 12;
}

function countdown() {
  currentDate = new Date();
  getTime();

  // Condición para comprobar si ha llegado la hora establecida
  if (currentDate.getDate() == goalDate.getDate() &&
    currentDate.getMonth() == goalDate.getMonth()) {
    happyBirthday();
    return;
  } else if (totalSeconds < 0) {
    yearGoal = yearGoal + 1;
    goalDate = new Date(yearGoal, 8, 22, 30);
    getTime();
  }

  monthsElement.innerHTML = months;
  daysElement.innerHTML = days;
  hoursElement.innerHTML = hours;

};

function changeSeasonElements() {
  if (currentMonth >= 2 && currentMonth < 5) {
    document.body.style.backgroundImage = "url('./imagenes/primavera.jpg')";
    document.body.style.color = "rgb(34 203 18)";

  } else if (currentMonth >= 5 && currentMonth < 9) {
    document.body.style.backgroundImage = "url('./imagenes/verano.jpg')";
    document.body.style.color = "rgb(17 112 201)";

  } else if (currentMonth >= 9 && currentMonth < 11) {
    document.body.style.backgroundImage = "url('./imagenes/otoño.jpg')";
    document.body.style.color = "rgb(255 175 42)";

  } else {
    document.body.style.backgroundImage = "url('./imagenes/invierno.jpg')";
    document.body.style.color = "rgb(141 200 202)";

  }
};

function happyBirthday() {
  document.body.style.backgroundImage = "url('./imagenes/cumple.jpg')";
  titleElement.innerText = "¡FELICIDADES!"
  titleElement.style.color = "#e53fca";
  countdownElement.style.display = "none";

  soltarGlobos();

  //Paramos el intervalo que se estaba ejecutando
  clearInterval(countdownInterval);

};

function createBallon() {
  let globo = document.createElement('div');
  globo.classList.add('globo');

  globo.innerText = '🎈';

  globo.style.left = Math.random() * 100 + "vw";
  globo.style.animationDuration = Math.random() * 2 + 3 + "s";

  document.body.appendChild(globo);

  setTimeout(() => {
    globo.remove();
  }, 4000);
}

function soltarGlobos() {
  setInterval(createBallon, 500);
}

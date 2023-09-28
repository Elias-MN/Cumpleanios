const monthsElement = document.getElementById('meses');
const daysElement = document.getElementById('dias');
const hoursElement = document.getElementById('horas');
const titleElement = document.getElementById('title');
const countdownElement = document.getElementById('countdown-container');

let currentDate = new Date();
let yearGoal = 2023;
let monthGoal = 8;
let dayGoal = 27;
let hourGoal = 0;
let goalDate = new Date(yearGoal, monthGoal, dayGoal, hourGoal);
let totalSeconds, hours, days;

let months = 0;

let springSeasonStart = 2;
let summerSeasonStart = 5;
let autumnSeasonStart = 9;
let winterSeasonStart = 11;
let currentMonth = currentDate.getMonth();
currentMonth = 12;

let secondsOfOneHour = 1440000;
let countdownInterval = setInterval(countdown, secondsOfOneHour);

const segundosEnMinuto = 60;
const segundosEnHora = 3600;
const segundosEnDia = 86400;
const segundosEnAnioPromedio = 31556952;

changeSeasonElements();
checkHappened();
countdown();

function checkHappened() {
  if (goalDate.getTime() < currentDate.getTime()) {
    goalDate.setFullYear(currentDate.getFullYear() + 1);
  }
};

function getTime() {
  totalSeconds = (goalDate - currentDate) / 1000;

  let anios = Math.floor(totalSeconds / segundosEnAnioPromedio);
  let segundosRestantes = totalSeconds % segundosEnAnioPromedio;

  let segundosEnMes = segundosEnAnioPromedio / 12;
  months = Math.floor(segundosRestantes / segundosEnMes);
  let segundosRestantesMes = segundosRestantes % segundosEnMes;

  days = Math.floor(segundosRestantesMes / segundosEnDia);
  let segundosRestantesDia = segundosRestantesMes % segundosEnDia;

  hours = Math.floor(segundosRestantesDia / segundosEnHora);

};

function countdown() {
  currentDate = new Date();
  getTime();

  // Condición para comprobar si ha llegado la hora establecida
  if (currentDate.getDate() == goalDate.getDate() &&
    currentDate.getMonth() == goalDate.getMonth()) {
    happyBirthday();
    return;
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
};

function soltarGlobos() {
  setInterval(createBallon, 500);
};

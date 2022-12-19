function updateTemp(response) {
  console.log(response);

  celsuisTemp = response.data.main.temp;

  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#degrees").innerHTML = `${Math.round(
    response.data.main.temp
  )} `;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/hr`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#current-icon")
    .setAttribute(
      "alt",
      `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );

  getForecast(response.data.coord);
}

function searchCity(city) {
  console.log(city);
  let apiKey = `c119ffef35b7245a5e03b6e5724ae961`;
  let unit = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(updateTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#form-control").value;
  searchCity(city);
}

function toggleTempF(event) {
  event.preventDefault();
  document.querySelector("#degrees").innerHTML = Math.round(
    (celsuisTemp * 9) / 5 + 32
  );
  toggleToFTemp.classList.add("active");
  toggleToCTemp.classList.remove("active");
}

function toggleTempC(event) {
  event.preventDefault();
  document.querySelector("#degrees").innerHTML = Math.round(celsuisTemp);
  toggleToCTemp.classList.add("active");
  toggleToFTemp.classList.remove("active");
}

function getPlace(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `c119ffef35b7245a5e03b6e5724ae961`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateTemp);
}

function getCurrent() {
  navigator.geolocation.getCurrentPosition(getPlace);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast-days">`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col text-center">
          <div class="day">
          ${formatForecastDay(forecastDay.dt)}
          </div>
          <img src= "
          http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" width= "50"/>

         <div class="forecast-temp"> 
          <span class="maxTemp"> ${Math.round(forecastDay.temp.max)}° </ span> 
          <span class="minTemp">${Math.round(forecastDay.temp.min)}° </span>
         </div>
          
       
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `b95f179627c8dd37f41e1be6e3250e19`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
`;
  axios.get(apiUrl).then(displayForecast);
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentTime = new Date();
let h2 = document.querySelector("h2");
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hour < 12) {
  h2.innerHTML = `${day}, ${hour}:${minutes} AM`;
} else {
  h2.innerHTML = `${day}, ${hour}:${minutes} PM`;
}

let search = document.querySelector("#change-city");
search.addEventListener("submit", handleSubmit);

let toggleToFTemp = document.querySelector("#farenheit");
toggleToFTemp.addEventListener("click", toggleTempF);

let toggleToCTemp = document.querySelector("#celsius");
toggleToCTemp.addEventListener("click", toggleTempC);

let currentButton = document.querySelector(".current-button");
currentButton.addEventListener("click", getCurrent);

let celsuisTemp = null;

searchCity("Vancouver");

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

function displayForecast() {
  let forecastElemnet = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast-days">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col text-center">
          ${day}
          <div class="forecast-temp"> 10°C</div>
          <i class="fa-solid fa-sun"></i>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElemnet.innerHTML = forecastHTML;
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
displayForecast();

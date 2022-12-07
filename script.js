function updateTemp(response) {
  console.log(response);
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#degrees").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/hr`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#current-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
  let temp = document.querySelector("#degrees");
  temp.innerHTML = `46°F`;
}

function toggleTempC(event) {
  event.preventDefault();
  let temp = document.querySelector("#degrees");
  temp.innerHTML = `8°C`;
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

searchCity("Vancouver");

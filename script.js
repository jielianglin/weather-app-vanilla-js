let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
console.log(day);

let h1 = document.querySelector("#day");
h1.innerHTML = `${day}`;

let hour = now.getHours();
console.log(hour);

let h2 = document.querySelector("#hour");
h2.innerHTML = `${hour}`;

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
console.log(minutes);

let h3 = document.querySelector("#minutes");
h3.innerHTML = `${minutes}`;

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let description = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = `${description}`;
  celsTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsTemp);
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  let windspeed = response.data.wind.speed;
  document.querySelector("#windspeed").innerHTML = `${windspeed}`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = `
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr class="max-min-temp">
        <td><strong>°</strong>°</td>
        <td><strong>°</strong>°</td>
        <td><strong>°</strong>°</td>
        <td><strong>°</strong>°</td>
    <td><strong>°</strong>°</td>
     <td><strong>°</strong>°</td>
    </tbody>
  </table>
`;
}

function search(city) {
  let apiKey = "fa0c9f80c461fd9a23378c08029da98c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = (celsTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsTemp);
}
let celsTemp = 0;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Berlin");

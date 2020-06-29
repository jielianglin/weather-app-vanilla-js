function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

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
  let date = document.querySelector("#day-and-time");
  date.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function displayForecast(response) {
  console.log(response.data.list[0]);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class= "col-2 forecast-hours"> 

    <h7>   
      ${formatHours(forecast.dt * 1000)}
    </h7>    
 <img src = "http://openweathermap.org/img/wn/${
   forecast.weather[0].icon
 }@2x.png" 
  />
        <div class = "forecast-temp">
        <strong> <span id = "forecast-cels-temp"> ${Math.round(
          forecast.main.temp
        )}</span>°  </strong>
        </div> 
        </div> 
 
`;
  }
}

function search(city) {
  let apiKey = "fa0c9f80c461fd9a23378c08029da98c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

function displayFahrenheitConversions(event) {
  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrTemp = (celsTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrTemp);
  }
  displayFahrenheitTemp(event);

  function displayForecastFahrTemp(event) {
    event.preventDefault();
    let forecastTemp = document.querySelectorAll("#forecast-cels-temp");
    forecastTemp.forEach((forecast) => {
      let forecastValue = forecast.innerHTML;
      forecast.innerHTML = Math.round((forecastValue * 9) / 5 + 32);
    });
  }
  displayForecastFahrTemp(event);
  fahrenheitLink.removeEventListener("click", displayFahrenheitConversions);
  celsiusLink.addEventListener("click", displayCelsiusConversions);
}

function displayCelsiusConversions(event) {
  function displayCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperature = document.querySelector("#temperature");
    temperature.innerHTML = Math.round(celsTemp);
  }
  displayCelsiusTemp(event);

  function displayForecastCelsTemp(event) {
    event.preventDefault();
    let forecastTemp = document.querySelectorAll("#forecast-cels-temp");
    forecastTemp.forEach((forecast) => {
      let forecastValue = forecast.innerHTML;
      forecast.innerHTML = Math.round(((forecastValue - 32) * 5) / 9);
    });
  }
  displayForecastCelsTemp(event);
  celsiusLink.removeEventListener("click", displayCelsiusConversions);
  fahrenheitLink.addEventListener("click", displayFahrenheitConversions);
}

let celsTemp = 0;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitConversions);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusConversions);

search("Berlin");

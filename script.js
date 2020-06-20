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

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let description = response.data.weather[0].description;
  document.querySelector("#description").innerHTML = `${description}`;
  let celsTemp = response.data.main.temp;
  document.querySelector("#celsTemp").innerHTML = Math.round(celsTemp);
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

function search(city) {
  let apiKey = "fa0c9f80c461fd9a23378c08029da98c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showWeather);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

search("Berlin");
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

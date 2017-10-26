"use strict";

let city;
let now = Date();

const domString = (weatherData) => {
  let domString = "";
  city = weatherData.name;
  domString +=  `<h2 class="text-center">${weatherData.name}</h2>`;
  domString +=  `<h6 class="text-center">${now}</h6>`;
  domString += `<h3>${weatherData.weather[0].description}<img src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png"></h3>`;
  domString += `<h3>Current Temp is ${weatherData.main.temp}</h3>`;
  domString += `<h3>Air Pressure: ${weatherData.main.pressure}hPa</h3>`;
  domString += `<h3>Wind Speed: ${weatherData.wind.speed}mph</h3>`;

  clearDom();
  printToDom(domString);
};

const domStringForecast = (weatherData, days) => {
  let domString = "";
  days = days * 7;
  for (let i = 0; i <= days ; i ++) {
    if (weatherData[i].dt_txt.split(" ").pop() === "12:00:00") {
      domString += `<div class="border forecast col-xs-4">`;
      domString +=  `<h6 class="text-center">${(weatherData[i].dt_txt).split(" ")[0]}</h6>`;
      domString += `<h3>${weatherData[i].weather[0].description}</h3>`;
      //<img src="http://openweathermap.org/img/w/${weatherData[i].weather[0].icon}.png">
      domString += `<h3>Temp ${weatherData[i].main.temp}</h3>`;
      domString += `<h3>Air Pressure: ${weatherData[i].main.pressure}hPa</h3>`;
      domString += `<h3>Wind Speed: ${weatherData[i].wind.speed}mph</h3>`;
      domString += `</div>`;
      }
    }
  printToDom2(domString);
};

const printToDom = (weatherString) => {
  $('#currentWeather').append(weatherString);
};

const printToDom2 = (weatherString) => {
  $('#forecastWeather').append(weatherString);
};

const clearDom = () => {
  $("#currentWeather").empty();
};

module.exports = {domString, clearDom, domStringForecast};

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

  // Conditions
  clearDom();
  printToDom(domString);
};

const domStringForecast = (weatherData) => {
  let domString = "";
  domString +=  `<h2 class="text-center">${city}</h2>`;
  for (let i = 0; i < weatherData.length ; i ++) {
  //let newString;
  domString +=  `<h6 class="text-center">${weatherData[i].dt_txt}</h6>`;
  domString += `<h3>${weatherData[i].weather[0].description}<img src="http://openweathermap.org/img/w/${weatherData[i].weather[0].icon}.png"></h3>`;
  domString += `<h3>Temp ${weatherData[i].main.temp}</h3>`;
  domString += `<h3>Air Pressure: ${weatherData[i].main.pressure}hPa</h3>`;
  domString += `<h3>Wind Speed: ${weatherData[i].wind.speed}mph</h3>`;
  // Conditions
  //domString += newString;
  }
  clearDom();
  printToDom(domString);
};

const printToDom = (weatherString) => {
  $('#weather').append(weatherString);
};

const clearDom = () => {
  $("#weather").empty();
};

module.exports = {domString, clearDom, domStringForecast};

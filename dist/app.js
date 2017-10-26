(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const owm = require('./owm.js');

const apiKeys = ( ) => {
  return new Promise ((resolve, reject) => {
    $.ajax('./db/apiKeys.json').done((data) => {
      resolve(data.apiKeys);
    }).fail((error) => {
      reject(error);
    });
  });
};

const retrieveKeys = () => {
  apiKeys().then((results) => {
    owm.setKey(results.owm.apiKey);
  }).catch((error) => {
    console.log('error in retrieve keys', error );
  });
};


module.exports = {retrieveKeys};

},{"./owm.js":5}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

let validate = require('./validate');

$("#submit").click(function(event) {
    event.preventDefault();
    submit();
    forecast();
});

const submit = () => {
  let zip = $('#zip').val();
  validate.validate(zip);
};

const forecast = ()  => {
  $('.forecast').removeClass('hidden');
};

$(".forecast").click(function(event) {
  validate.forecast(event);
  $('.forecast').addClass('hidden');
});

},{"./validate":6}],4:[function(require,module,exports){
"use strict";

require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();

},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
"use strict";

const dom = require('./dom');
let owmKey;

const queryweatherData = (zipCode) => {
  return new Promise((resolve, reject) => {
      $.ajax(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${owmKey}&units=imperial`).done((data) => {
        resolve(data);
        dom.domString(data);
      }).fail((error) => {
        reject(error);
      });
    });
  };

const queryForecast = (zipCode, days) => {
  return new Promise((resolve, reject) => {
      $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}&APPID=${owmKey}&units=imperial`).done((data) => {
        resolve(data);
        dom.domStringForecast(data.list, days);
      }).fail((error) => {
        reject(error);
      });
    });
};


const setKey = (apiKey) => {
  owmKey = apiKey;
};

module.exports = {queryweatherData, setKey, queryForecast};

},{"./dom":2}],6:[function(require,module,exports){
"use strict";

let owm = require('./owm');
let zip;

const validate = (zipCode) => {
  let zipRegex = /^\d{5}$/;
  if (!zipRegex.test(zipCode)){
    $("#zip").addClass("alert-danger").popover("show");
  } else {
    $("#zip").removeClass("alert-danger").addClass("alert-success");
    $("#zip").popover("hide");
      zip = zipCode;
      owm.queryweatherData(zipCode);
  }
};

// const keypress = (zipCode) => {
// $('#zip').keypress(() => {
//     validate(zipCode);
//   });
// };

const forecast = (event) => {
  let days = event.target.value;
  owm.queryForecast(zip, days);
};

module.exports = {validate, forecast};

},{"./owm":5}]},{},[4]);

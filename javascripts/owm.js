"use strict";

const dom = require('./dom');
let owmKey;

const queryweatherData = (zipCode) => {
  return new Promise((resolve, reject) => {
      $.ajax('./db/sampleData.json').done((data) => {
        resolve(data);
        dom.domString(data);
      }).fail((error) => {
        reject(error);
      });
    });
  };

const queryForecast = (zipCode, days) => {
  return new Promise((resolve, reject) => {
      $.ajax('./db/sampleDataMult.json').done((data) => {
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
//`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&APPID=${owmKey}&units=imperial`
//`https://api.openweathermap.org/data/2.5/forecast?zip=${zip code}&APPID=${owmKey}&units=imperial`

module.exports = {queryweatherData, setKey, queryForecast};

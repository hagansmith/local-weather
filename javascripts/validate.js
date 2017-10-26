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

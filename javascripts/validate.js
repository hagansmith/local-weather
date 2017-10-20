"use strict";

let owm = require('./owm');
let zip;

const validate = (zipCode) => {
  if (zipCode.length === 5) {
    $("#zip").removeClass("alert-danger").addClass("alert-success");
      zip = zipCode;
      owm.queryweatherData(zipCode);
      } else {
        $("#zip").addClass("alert-danger").popover("toggle");
        $(document).keypress(() => {
          if (zipCode.length === 5) {
            $("#zip").removeClass("alert-danger").addClass("alert-success");
            zip = zipCode;
            owm.queryweatherData(zipCode);
          }
      });
    }
};

const forecast = (event) => {
  let days = event.target.value;
  owm.queryForecast(zip, days);
};

module.exports = {validate, forecast};

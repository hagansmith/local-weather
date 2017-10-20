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

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

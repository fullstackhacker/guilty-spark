'use strict';

const request = require('request');
const moment = require('moment-timezone');

const config = require('./config');
const twilio =  config.twilio;
const sites = config.sites;

const momentDateFormat = "MM/DD/YYYY - hh:mm A";  // month/date/year - hour:minute  [am|pm]

sites.forEach(sites => {
  request(site.url, (err, res, body) => {
    const datetimeStamp = new moment().tz("America/Los_Angeles").format(momentDateFormat);
    const message = `${site.displayName}: ${res.statusCode} ${datetimeStamp}`;
    if (err){
      twilio.sendTextAlerts(message);
    }
    console.log(message);
  });
});

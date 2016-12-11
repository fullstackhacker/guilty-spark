'use strict';

const request = require('request');
const moment = require('moment-timezone');
const _ = require('lodash');

const config = require('./config');
const twilio =  config.twilio;
const sites = config.sites;

const momentDateFormat = "MM/DD/YYYY - hh:mm A";  // month/date/year - hour:minute  [am|pm]

_.each(sites, function(site){
  request(site.url, function(err, res, body){
    const datetimeStamp = new moment().tz("America/Los_Angeles").format(momentDateFormat);
    let message;
    if (err){
      message = `${site.displayName}: ${res.statsuCode} ${datetimeStamp}`;
      twilio.sendTextAlerts(message);
    }
    if (res){
      message = `${site.displayName}: ${res.statusCode} OK ${datetimeStamp}`;
      twilio.sendTextAlerts(message);
    }
    console.log(message);
  });
});

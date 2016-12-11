'use strict';

var cron = require('cron');
var request = require('request');
var cheerio = require('cheerio');
var config = require('./config');
var moment = require('moment');
var _ = require('lodash');

var twilio = config.twilio;
var sites = config.sites;

var workerNumber = 0;

var cronJob = cron.job("0 0 */4 * * *", function(){
    workerNumber += 1;
    _.each(sites, function(site){
        request(site.url, function(err, res, body){
            const worker = workerNumber;
            if(err){
                let message = site.displayName + ": " + err + " " + new moment().format("MM/DD/YYYY - HH:mm");
                twilio.sendTextAlerts(message)
                console.log(worker + ": " + message);
            }
            else{
                var $ = cheerio.load(body);
                
                if($('title').text() === site.title){
                    let message = worker + " " + site.displayName + " UP AT: " +  new moment().format("MM/DD/YYYY - HH:mm");
                    console.log(message);
                }
                else{
                    let message = site.displayName + " DOWN AT: " + new moment().format("MM/DD/YYYY - HH:mm");
                    twilio.sendTextAlerts(message)
                    console.log(worker + ": " + message);
                }
            }
        });
    });
});

cronJob.start();

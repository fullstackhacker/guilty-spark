var twilio = require('twilio');
var contacts = require('./contacts');
var _ = require('lodash');

var TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
var TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

var client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

client.sendTextAlerts = function(message){
    _.each(contacts, function(contact){
        client.sendMessage(
            {
                to: contact.phoneNumber,
                from: TWILIO_PHONE_NUMBER,
                body: contact.name + " " + message
            },
            function(err, res){
                if(err){
                    console.log("----- ERROR --- FAILED TO ALERT: " + contact.name + " -----");
                    console.log(err);
                    return;
                }
                console.log("---- alerted: " + contact.name + " successfully. ----");
                return;
            }
        );
    });
};

module.exports = client;

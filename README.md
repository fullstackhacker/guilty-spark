# Guilty Spark

> "Greetings. I am the Monitor of Installation 04. I am 343 Guilty Spark."<br> - 343 Guilty Spark


Easy, cheap monitoring for your personal sites. Minimal set up.
Uses twilio for messaging.


I am running it through cron every hour.


## Set Up

### Websites and Contacts

There are two files that aren't provided for obvious reasons:

* `websites.json`
* `contacts.json`

`websites.json` should be a list of json objects that represent the website to monitor. A website object has the following properties:

| field       | description                                      | required |
|-------------|--------------------------------------------------|----------|
| url         | url of the website                               | yes      |
| displayName | a display name to reference the website for logs | yes      |

Example `websites.json` file:
``` javascript
[
  {
    "url": "http://mushaheedkapadia.com",
    "displayName": "Mush's Personal Site"
  } //, add as many websites as you want!
]
```

`contacts.json` should be a list of json objects that represent the contacts to text when a site goes down. A contact object has the following properties:

| field       | description                                      | required |
|-------------|--------------------------------------------------|----------|
| name        |  name of the contact                             | yes      |
| phoneNumber |  phone number of the contact                     | yes      |


Example `contact.json` file:
```javascript
[
  {
    "name": "Mush",
    "phoneNumber": "+12223334444"  // use a number that can receive text messages...
  }
]
```

You can store these files anywhere you feel comfortable, just be sure to update the path to the .json file in `config/contacts.js` and config/websites.js`. You can also alternatively just overwrite these two files with your `.json` lists.

### twilio

You'll have to set up your own twilio account since this application is a SaaS product. Once you've set up a twilio account, funded it, and gotten your authoization tokens and what not, you'll want to export these values via your environment variables.

My personal favorite is to create shell script that exports these values. Guilty Spark expects the following environment variables:

| ENV VAR                 | description                                      |
|-------------------------|--------------------------------------------------|
| TWILIO_ACCOUNT_SID      |  the account sid given to you by twilio          |
| TWILIO_AUTH_TOKEN       |  the auth token of your twilio account           |
| TWILIO_PHONE_NUMBER     |  the twilio phone number to send texts from      |


### cron

It took me quite a while to get this setup with cron. I'm not super familiar with it, and you'll probably have an easier time getting it going by following some guides or fumbling your way through it.

Here's an abstracted version of the command:

```
1 */1 * * * [user] ([cd path/to/guilty-spark] && [. path/to/guilty-spark-env] && [path/to/node] guilty.js [>> /var/log/guilty-spark/guilty.spark.log])
```

`NOTE`: `user` is only valid if you throw this in `/etc/crontab` instead of `crontab -e`.


Here are some things I ran into while getting this to work:

* cron and nvm do not play well together naturally

So I'm not sure if this is because I installed nvm retardedly or something, but I was hitting an issue where the app was crashing via cron, but not when I would run the app manually. Turns out that when cron ran the job, it was setting it with minimal environment variables, and so node wasn't being set. I overcame this by running `which node` manually on my user and then dropping that in place for `node` in the cron command. Not sure

* crontab -e vs /etc/crontab

`crontab -e` is for your user (I'm on DigitalOcean running everythin as root #yolo) and /etc/crontab is system-wide. The fun part of `/etc/crontab` is that you can specify a user with whos permissions you want to run the command.

I had a hard time getting it to work, so yolo I'm running it from `/etc/crontab`.

* log file

Don't know why this is happening, but my log file keeps "truncating" and overwriting itself everytime the app runs. I have to look into this still, but I'm all ears if anyone has any feedback.

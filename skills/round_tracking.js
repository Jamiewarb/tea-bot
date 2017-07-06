var config = require('../config.js');
var tracking = require('../shared/tracking.js');

module.exports = function(controller) {

    let drinks = config.drinks;
    let triggers = [];
    for (let drink in drinks) {
        if (!drinks.hasOwnProperty(drink)) continue; //skip if from prototype
        triggers.push('^' + drink);
    }

    controller.hears(triggers, 'direct_mention,mention,ambient', function(bot, message) {
        bot.reply(message, 'I hear ya, I hear ya');
    });
}

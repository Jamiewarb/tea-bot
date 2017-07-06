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
        if (!tracking.channelActive(message.channel)) return;

        let comment = '';
            drink = message.text;
        if (message.text.indexOf(' ') > 0) {
            drink = message.text.substr(0, message.text.indexOf(' '));
            comment = message.text.substr(drink.length + 1);
        }
        tracking.addItem(message.channel, message.user, drink, comment);
        bot.reply(message, {
            'text': '<@' + message.user + '> would like ' + drink
        });
    });
}

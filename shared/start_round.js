var config = require('../config.js');

const startMe = function(controller, bot, message) {
    controller.storage.channels.get(message.channel, function(err, channel) {
        console.log("channel:");
        console.log(channel);
    });

    let attachments = [];
    let drinks = config.drinks;

    for (let drink in drinks) {
        if (!drinks.hasOwnProperty(drink)) continue; //skip if from prototype
        attachments.push({
            'fallback': drinks[drink].option,
            'title': drinks[drink].option,
            'color': drinks[drink].color
        });
    }

    bot.reply(message, {
        'text': 'Okay great, <@' + message.user + '> is doing a round! You\'ve got two minutes to get your orders in by typing the below:',
        'attachments': attachments,
    });
    // and now deliver cheese via tcp/ip...
}

module.exports.startMe = startMe;

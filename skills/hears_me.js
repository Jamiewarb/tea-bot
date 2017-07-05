var config = require('../config.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['me'], 'direct_mention,mention', function(bot, message) {
        confirmMe(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {
        console.log("Confused");
        if (trigger.actions[0].name.match(/^confirm_me$/)) {
            bot.say({
                'text': 'Your answer was ' + trigger.actions[0].value,
                'channel': trigger.channel
            });
            return false;
        }
    });
}

const confirmMe = function(controller, bot, message) {
    bot.reply(message, {
        'text': 'So you\'re going to make a round of tea, are you?',
        'attachments': [
            {
                'fallback': 'Looks like you\'re unable to make tea I\'m afraid',
                'color': '#f8b88b',
                'callback_id': 'me',
                'attachment_type': 'default',
                'actions': [
                    {
                        'name': 'confirm_me',
                        'text': 'Yes',
                        'type': 'button',
                        'value': 'yes'
                    },
                    {
                        'name': 'confirm_me',
                        'text': 'No',
                        'type': 'button',
                        'value': 'no'
                    },
                ]
            }
        ]
    });
}

startMe = function(controller, bot, message) {
    controller.storage.channels.get(message.channel, function(err, channel) {
        console.log("channel:");
        console.log(channel);
    });

    let attachments = [];
    let drinks = config.drinks;

    for (let drink in drinks) {
        attachments.push({
            'fallback': drink.option,
            'title': drink.option,
            'text': 'test',
            'color': drink.color,
        });
    }

    console.log("Drinks");
    console.log(drinks);
    console.log("Attachments")
    console.log(attachments);

    bot.reply(message, {
        'text': 'Okay great, <@' + message.user + '> is doing a round! Get your orders in:',
        'attachments': attachments,
    });
    // and now deliver cheese via tcp/ip...
}

module.exports.confirmMe = confirmMe;
module.exports.startMe = startMe;

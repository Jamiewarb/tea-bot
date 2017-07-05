var config = require('../shared/config.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['me'], 'direct_mention,mention', function(bot, message) {
        console.log(message);
        confirmMe(controller, bot, message);
    });
}

const confirmMe = function(controller, bot, message) {

    bot.createConversation(message, function(err, convo) {

        convo.addMessage({
            text: 'Why you wasting my time fool',
            action: 'stop', // Marks converation as unsuccessful
        },'no_thread');

        convo.addMessage({
            text: 'GRRRR! Was that a `yes` or a `no`?',
        },'bad_response');

        // Create a yes/no question in the default thread...
        convo.ask('So you\'re going to make a round of tea, are you?', [
            {
                pattern:  bot.utterances.yes,
                callback: function(response, convo) {
                    convo.stop();
                    startMe(controller, bot, message);
                },
            },
            {
                pattern:  bot.utterances.no,
                callback: function(response, convo) {
                    convo.gotoThread('no_thread');
                },
            },
            {
                default: true,
                callback: function(response, convo) {
                    convo.gotoThread('bad_response');
                },
            }
        ]);

        convo.activate();

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

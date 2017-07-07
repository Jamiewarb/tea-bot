var round = require('../shared/round.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^random','^brewlette'], 'direct_mention,mention', function(bot, message) {
        startRandom(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^start_random$/)) {
            startRandom(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            }, 'random', 'random');
        }
    });
}

const startRandom = function(controller, bot, message) {
    if (tracking.channelActive(message.channel)) {
        bot.reply(message, '<@' + message.user + '> there\'s already a tea round active in this channel')
        return false;
    }
    round.start(controller, bot, message, 'random');
}

module.exports.startRandom = startRandom;

var round = require('../shared/round.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^random'], 'direct_mention,mention', function(bot, message) {
        round.start(controller, bot, message, 'random');
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^start_random$/)) {
            round.start(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            }, 'random', 'random');
        }
    });
}

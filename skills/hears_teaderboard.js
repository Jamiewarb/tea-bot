var config = require('../config.js');
var statistics = require('./statistics.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^teaderboard$','^leaderboard$'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
        statistics.displayTeaderboard(bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^teaderboard$/)) {
            statistics.displayTeaderboard(bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            });
        }

    });
}

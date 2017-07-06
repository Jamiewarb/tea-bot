var config = require('../config.js');
var statistics = require('./statistics.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^my brews$'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
        showBrews(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^my_brews$/)) {
            showBrews(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            });
        }

    });
}

const showBrews = function(controller, bot, message) {
    var stats = statistics.tellMyStats(bot, message.user);
};

module.exports.showBrews = showBrews;

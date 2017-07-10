var statistics = require('./statistics.js');

module.exports = function(controller) {
    controller.hears(['^displayRatings'], 'direct_message', function(bot, message) {
        statistics.displayRatings(bot, message, message.team);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        let callback_id = trigger.callback_id;
        if (callback_id.startsWith('rating_')) {
            if (callback_id.indexOf('_') > 0) {
                let roundID = callback_id.substr(callback_id.indexOf('_') + 1);
                if (trigger.actions[0].name === 'rateUp') {
                    statistics.rateBrew(bot, trigger.team, trigger.actions[0].value, trigger.user, 'up', roundID);
                }
            }
        }
    });
}

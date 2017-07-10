var statistics = require('./statistics.js');

module.exports = function(controller) {
    controller.on('interactive_message_callback', function(bot, trigger) {

        let callback_id = trigger.callback_id;
        if (callback_id.startsWith('rating_')) {
            console.log("STARTS WITH");
            if (callback_id.indexOf('_') > 0) {
                console.log("INDEX OF");
                let roundID = callback_id.substr(callback_id.indexOf('_') + 1);
                console.log("substr");
                if (trigger.actions[0].name === 'rateUp') {
                    console.log("name");
                    statistics.rateBrew(bot, trigger.team, trigger.actions[0].value, trigger.user, 'up', roundID);
                    console.log("rateBrew");
                }
            }
        }
    });
}

var config = require('../config.js');
var statistics = require('./statistics.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    // controller.hears(['^teaderboard$','^leaderboard$'], 'direct_message,direct_mention,mention,ambient', function(bot, message) {
    //     showTeaderboard(controller, bot, message);
    // });

    // controller.on('interactive_message_callback', function(bot, trigger) {

    //     if (trigger.actions[0].name.match(/^teaderboard$/)) {
    //         showTeaderboard(controller, bot, {
    //             'team': trigger.team,
    //             'user': trigger.user,
    //             'channel': trigger.channel
    //         });
    //     }

    // });
}

const showTeaderboard = function(controller, bot, message) {
    let text = '';
    var getStats = new Promise(function(resolve, reject) {
        let teaderboard = statistics.getTeaderboardData();
        if (teaderboard) {
            resolve(teaderboard);
        } else {
            reject(Error('Could not find teaderboard'));
        }
    });

    getStats.then(function(result) {
        console.log(result);
    });

    bot.reply(message, text);
};

module.exports.showTeaderboard = showTeaderboard;

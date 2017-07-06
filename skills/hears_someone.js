var tracking = require('../shared/tracking.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^someone'], 'direct_mention,mention', function(bot, message) {
        askSomeone(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^start_someone$/)) {
            askSomeone(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            });
        }

    });
}

const askSomeone = function(controller, bot, message) {
    if (tracking.channelActive(message.channel)) {
        bot.reply(message, '<@' + message.user + '> there\'s already a tea round active in this channel')
        return false;
    }
    bot.reply(message, {
        'text': '<@' + message.user + '> would really like someone to make a cup of tea?',
        'attachments': [
            {
                'fallback': 'Looks like you\'re unable to make tea I\'m afraid',
                'color': '#f8b88b',
                'callback_id': 'me',
                'attachment_type': 'default',
                'actions': [
                    {
                        'name': 'start_me',
                        'text': 'I\'ll do it!',
                        'type': 'button',
                        'value': 'yes'
                    },
                ]
            }
        ]
    });
}

module.exports.askSomeone = askSomeone;

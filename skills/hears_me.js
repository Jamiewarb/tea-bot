/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['me'], 'direct_message,direct_mention,mention', function(bot, message) {
        beginMe(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {
        if (trigger.actions[0].name.match(/^confirm_me$/)) {
            bot.reply('Your answer was ' + trigger.actions[0].value);
            return false;
        }
    });
}

const beginMe = function(controller, bot, message) {
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

module.exports.beginMe = beginMe;

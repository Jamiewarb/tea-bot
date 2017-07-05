/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['me'], 'direct_message,direct_mention,mention', function(bot, message) {
        beginMe(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {
        console.log(trigger);
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
                        'name': 'yes',
                        'text': 'Yes',
                        'type': 'button',
                        'value': 'yes'
                    },
                    {
                        'name': 'no',
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

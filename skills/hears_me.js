/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {

    controller.hears(['me'], 'direct_message,direct_mention,mention', function(bot, message) {

        bot.reply(message, {
            'text': 'So you\'re going to make a round of tea, are you?',
            'attachments': [
                {
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "yes",
                            "text": "Yes",
                            "type": "button",
                            "value": "me-yes"
                        },
                        {
                            "name": "no",
                            "text": "No",
                            "type": "button",
                            "value": "me-no"
                        },
                    ]
                }
            ]
        });

    });

}

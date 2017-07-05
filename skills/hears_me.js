var config = require('../config.js');
var startRound = require('../shared/start_round.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^me'], 'direct_mention,mention', function(bot, message) {
        confirmMe(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^confirm_me$/)) {

            let answer = trigger.actions[0].value,
                response = trigger.original_message;

            if (answer !== 'yes') {
                response.attachments = [{
                    'fallback': 'The answer was ' + trigger.actions[0].value,
                    'text': '<@' + trigger.user + '>: No',
                    'color': '#f8b88b',
                }];
                bot.replyInteractive(trigger, response);
                bot.say('I pity the fool that changes his mind!', trigger.channel);
                return false;
            }

            response.attachments = [{
                'fallback': 'The answer was ' + trigger.actions[0].value,
                'text': '<@' + trigger.user + '>: Yes',
                'color': '#f8b88b',
            }];

            bot.replyInteractive(trigger, response);

            startRound.startMe(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            });

        }

    });
}

const confirmMe = function(controller, bot, message) {
    bot.reply(message, {
        'text': '<@' + message.user + '>, you\'re going to make a round of tea, are you?',
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

module.exports.confirmMe = confirmMe;

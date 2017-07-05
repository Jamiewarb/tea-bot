var config = require('../config.js');
var round = require('../shared/round.js');
var tracking = require('../shared/tracking.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^me'], 'direct_mention,mention', function(bot, message) {
        if (tracking.channelActive(message.channel)) {
            bot.reply(message, '<@' + message.user + '> there\'s already a tea round active in this channel')
            return false;
        }
        confirmMe(controller, bot, message);
    });

    controller.on('interactive_message_callback', function(bot, trigger) {

        if (trigger.actions[0].name.match(/^confirm_me$/)) {

            let answer = trigger.actions[0].value,
                response = trigger.original_message,
                outcome = 'start';

            if (answer !== 'yes') outcome = 'cancel';
            if (tracking.channelActive(trigger.channel)) outcome = 'active';

            respondMe(bot, trigger, response, outcome);

            if (outcome !== 'start') return false;

            round.start(controller, bot, {
                'team': trigger.team,
                'user': trigger.user,
                'channel': trigger.channel
            });

        }

    });
}

const respondMe = function(bot, trigger, response, outcome) {
    if (outcome === 'start') {
        response.attachments = [{
            'fallback': 'The answer was ' + trigger.actions[0].value,
            'text': '<@' + trigger.user + '>: Yes',
            'color': '#f8b88b',
        }];
    } else if (outcome === 'active') {
        response.attachments = [{
            'fallback': 'Already in progress',
            'text': 'Round already in progress',
            'color': '#f8b88b',
        }];
        bot.say({
            'text': '<@' + trigger.user + '> there\'s already a tea round active in this channel',
            'channel': trigger.channel
        });
    } else {
        response.attachments = [{
            'fallback': 'The answer was ' + trigger.actions[0].value,
            'text': '<@' + trigger.user + '>: No',
            'color': '#f8b88b',
        }];
        bot.say({
            'text': 'I pity the fool that changes his mind!',
            'channel': trigger.channel
        });
    }
    bot.replyInteractive(trigger, response);
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

module.exports.respondMe = respondMe;
module.exports.confirmMe = confirmMe;

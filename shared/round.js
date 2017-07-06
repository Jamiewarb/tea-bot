var config = require('../config.js');
var tracking = require('./tracking.js');

const start = function(controller, bot, source, type) {

    if (tracking.channelActive(source.channel)) return false;

    tracking.activateChannel(source.channel, type);

    let attachments = [];
    let drinks = config.drinks;

    for (let drink in drinks) {
        if (!drinks.hasOwnProperty(drink)) continue; //skip if from prototype
        let attachment = {
            'fallback': drinks[drink].option,
            'title': drinks[drink].option,
            'color': drinks[drink].color
        };
        if (drink !== 'other') {
            attachment.callback_id = 'choose_drink';
            attachment.attachment_type = 'default';
            attachment.actions = [
                {
                    'name': 'say',
                    'text': drinks[drink].name + ' please',
                    'type': 'button',
                    'value': drink
                }
            ];
        }
        attachments.push(attachment);
    }

    let text = '';
    if (type === 'random') {
        text = '<@channel> - :fire: A random round has been called! Pick your drinks, and one of you will be randomly selected to make them!';
    } else {
        text = '<@channel> - :tada: <@' + source.user + '> is doing a round! You\'ve got two minutes to get your orders in by typing the below or click the buttons:';
    }

    bot.say({
        'text': text,
        'attachments': attachments,
        'channel': source.channel
    });

    setTimeout(function() {
        end(controller, bot, source);
    }, config.settings.timer);

}

const end = function(controller, bot, source) {

    let choices = tracking.getChoices(source.channel),
        type = tracking.getType(source.channel);
    tracking.deactivateChannel(source.channel);

    let results = '',
        countDrinks = {},
        allUsers = [];

    for (let userChoice in choices) {
        if (!choices.hasOwnProperty(userChoice)) continue; //skip if from prototype

        let user = choices[userChoice].user,
            drink = choices[userChoice].drink,
            message = choices[userChoice].message;

        allUsers.push(user);

        results += '<@' + user + '> wants ' + drink;
        if (message.length !== 0) {
            results += ': "_' + message + '_"  ';
        }
        results += '  \n';

        if (countDrinks.hasOwnProperty(drink)) {
            countDrinks[drink] = countDrinks[drink] + 1;
        } else {
            countDrinks[drink] = 1;
        }
    }

    if (results.length === 0) {
        bot.say({
            'text': 'Looks like nobody wants anything to drink!',
            'channel': source.channel
        });
        return;
    }

    results += '\n*Totals*:  \n';

    for (let drink in countDrinks) {
        results += drink + ': ' + countDrinks[drink] + '  \n';
    }

    bot.startConversation(message, function(err, convo) {

        convo.say(results);

        if (type === 'random') {
            convo.say('Now which of you fools is going to make these beverages?');
            convo.say('Looks like it\'s gonna be... <@' + allUsers[Math.floor(Math.random() * allUsers.length)] + '>');
        }

    });

}

module.exports.start = start;
module.exports.end = end;

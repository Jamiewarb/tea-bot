var config = require('../config.js');
var tracking = require('./tracking.js');

const start = function(controller, bot, source) {

    if (tracking.channelActive(source.channel)) return false;

    tracking.activateChannel(source.channel);

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

    bot.say({
        'text': '<@channel> - :tada: <@' + source.user + '> is doing a round! You\'ve got two minutes to get your orders in by typing the below or click the buttons:',
        'attachments': attachments,
        'channel': source.channel
    });

    setTimeout(function() {
        end(controller, bot, source);
    }, 120000);

}

const end = function(controller, bot, source) {

    let choices = tracking.getChoices(source.channel);
    tracking.deactivateChannel(source.channel);

    let results = '';
    let countDrinks = {};

    for (let userChoice in choices) {
        if (!choices.hasOwnProperty(userChoice)) continue; //skip if from prototype

        let user = choices[userChoice].user,
            drink = choices[userChoice].drink,
            message = choices[userChoice].message;

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

    bot.say({
        'text': results,
        'channel': source.channel
    });

}

module.exports.start = start;
module.exports.end = end;

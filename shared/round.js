var config = require('../config.js');
var tracking = require('./tracking.js');
var statistics = require('../skills/statistics.js');

const start = function(controller, bot, source, type, maker) {
    if (tracking.channelActive(source.channel)) return false;

    tracking.activateChannel(source.channel, type);

    if (type !== 'random') tracking.setMaker(source.channel, maker);

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
        text = '<@channel> - :fire: A random round has been called! Pick your drinks, and then in 2 minutes one of you will be randomly selected to make them!';
    } else {
        text = '<@channel> - :tada: <@' + source.user + '> is doing a round! You\'ve got 2 minutes to get your orders in by typing the below or click the buttons:';
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
        type = tracking.getType(source.channel),
        maker = tracking.getMaker(source.channel);

    tracking.deactivateChannel(source.channel);

    let results = '~-=-=-=-=-=-=-~ Beverages ~-=-=-=-=-=-=-~\n\n',
        userResults = '',
        countDrinks = {},
        allUsers = [];

    for (let userChoice in choices) {
        if (!choices.hasOwnProperty(userChoice)) continue; //skip if from prototype

        let user = choices[userChoice].user,
            drink = choices[userChoice].drink,
            message = choices[userChoice].message;

        allUsers.push(user);

        userResults += '<@' + user + '> would like ' + drink;
        if (message && message.length !== 0) {
            userResults += ': "_' + message + '_"  ';
        }
        userResults += '  \n';

        if (countDrinks.hasOwnProperty(drink)) {
            countDrinks[drink] = countDrinks[drink] + 1;
        } else {
            countDrinks[drink] = 1;
        }
    }

    if (userResults.length === 0) {
        bot.say({
            'text': 'Looks like nobody wants anything to drink!',
            'channel': source.channel
        });
        return;
    }

    results += userResults;
    results += '\n>*Totals*:  \n';

    for (let drink in countDrinks) {
        results += '>' + drink + ': ' + countDrinks[drink] + '  \n';
    }

    bot.startConversation(source, function(err, convo) {

        convo.say(results);

        if (type === 'random') {
            let randomUser;
            if (allUsers.length > 1) {
                randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
                convo.say('Now which of you fools is going to make these beverages?');
                convo.say('Looks like it\'s gonna be... <@' + randomUser + '>');
            } else {
                randomUser = allUsers[0];
                convo.say('Guess it\'s gonna have to be <@' + randomUser + '>');
            }
            maker = randomUser;
        }

    });

    let makerMakes = allUsers.length;

    for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i] !== maker) {
            statistics.addDrank(allUsers[i], 1);
        } else {
            makerMakes -= 1; // We don't count drinks made for yourself
        }
    }

    statistics.addMade(maker, makerMakes);

}

module.exports.start = start;
module.exports.end = end;

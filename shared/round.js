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

    let {allUsers, countDrinks, userResults} = collateUserChoices(choices);

    if (userResults.length === 0) {
        bot.say({
            'text': 'Looks like nobody wants anything to drink!',
            'channel': source.channel
        });
        return;
    }

    let finalOutput = '~-=-=-=-=-=-=-~ Beverages ~-=-=-=-=-=-=-~\n\n' +
                      userResults +
                      collateTotals(countDrinks);

    bot.startConversation(source, function(err, convo) {

        convo.say(finalOutput);

        if (type === 'random') {
            let randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
            if (allUsers.length > 1) {
                convo.say('Now which of you fools is going to make these beverages?');
                convo.say('Looks like it\'s gonna be... <@' + randomUser + '>');
            } else {
                convo.say('Guess it\'s gonna have to be <@' + randomUser + '>');
            }
            maker = randomUser;
        }

        if (config.settings.ratings) {

            let curDT = new Date(),
                messageDateTimeString = curDT.getDate() + '/' + (curDT.getMonth() + 1) +
                                        '/' + curDT.getFullYear() + '-' + curDT.getHours() +
                                        ':' + curDT.getMinutes() + ':' + curDT.getSeconds();

            let ratingMessage = {
                'text': 'If you think this was a proper cracking brew, thumb it up!',
                'attachments': [
                    {
                        'fallback': 'Looks like your chat client doesn\'t support rating this brew',
                        'color': config.optionSettings.me.color,
                        'callback_id': 'rating_' + messageDateTimeString,
                        'attachment_type': 'default',
                        'actions': [
                            {
                                'name': 'rateUp',
                                'text': ':thumbsup: Cracking Brew',
                                'type': 'button',
                                'value': maker,
                            }
                        ]
                    }
                ]
            };

            setTimeout(function() {
                bot.reply(source, ratingMessage);
            }, 15000);

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

function collateUserChoices(choices) {
    let results = {
        allUsers: [],
        countDrinks: {},
        userResults: ''
    };

    for (let userChoice in choices) {
        if (!choices.hasOwnProperty(userChoice)) continue; //skip if from prototype

        let user = choices[userChoice].user,
            drink = choices[userChoice].drink,
            message = choices[userChoice].message;

        results.allUsers.push(user);

        results.userResults += '<@' + user + '> would like ' + drink;
        if (message && message.length !== 0) {
            results.userResults += ': "_' + message + '_"  ';
        }
        results.userResults += '  \n';

        if (results.countDrinks.hasOwnProperty(drink)) {
            results.countDrinks[drink] = results.countDrinks[drink] + 1;
        } else {
            results.countDrinks[drink] = 1;
        }
    }

    return results;
}

function collateTotals(countDrinks) {
    let totalsString = '\n>*Totals*:  \n';

    for (let drink in countDrinks) {
        totalsString += '>' + drink + ': ' + countDrinks[drink] + '  \n';
    }

    return totalsString;
}

module.exports.start = start;
module.exports.end = end;

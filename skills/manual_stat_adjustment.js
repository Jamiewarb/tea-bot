var config = require('../config.js');
var tracking = require('../shared/tracking.js');
var statistics = require('./statistics.js');

/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['^getID'], 'direct_message', function(bot, message) {
        if (message.text.indexOf(' ') > 0) {
            let userName = message.text.substr(6);
            bot.api.users.info({user: userName}, (err, response) => {
                if (response.user == null) {
                    bot.reply(message, 'Could not find user with id ' + userName);
                }
                let {id, name} = response.user;
                bot.reply(message, '```' + id + ' : ' + name + '```');
            });
            return;
        }
        bot.reply(message, 'Please provide a username to get the ID of');
    });

    controller.hears(['^getAllIDs'], 'direct_message', function(bot, message) {
        bot.api.users.list({presence: false}, (err, response) => {
            let outputIDs = '',
                membersLength = response.members.length;
            for (let i = 0; i < response.members.length; i++) {
                let {id, name} = response.members[i];
                outputIDs += id + ' : ' + name + '  \n';
            }
            bot.reply(message, '```' + outputIDs + '```');
        });
    });

    controller.hears(['^manualAddMade'], 'direct_message', function(bot, message) {
        parseManual(bot, message, 'addMade');
    });

    controller.hears(['^manualAddDrank'], 'direct_message', function(bot, message) {
        parseManual(bot, message, 'addDrank');
    });

    controller.hears(['^manualAddUser'], 'direct_message', function(bot, message) {
        parseManual(bot, message, 'addUser');
    });

    controller.hears(['^manualRemoveUser'], 'direct_message', function(bot, message) {
        parseManual(bot, message, 'removeUser');
    });

    function parseManual(bot, message, mode) {
        let tokens = message.text.split(' '),
            invalid = false;
        if (tokens[1] !== config.settings.admin) return;
        tokens[3] = parseInt(tokens[3]);
        switch (mode) {
            case 'addMade':
                if (!isValid(tokens)) {
                    bot.reply(message, 'This command must be in the form "manualAddMade" <password> <userID> <amount>');
                    return;
                }
                statistics.addMade(tokens[2], tokens[3]);
                bot.reply(message, 'User <@' + tokens[2] + '> has been added ' + tokens[3] + ' made drinks');
                break;
            case 'addDrank':
                if (!isValid(tokens)) {
                    bot.reply(message, 'This command must be in the form "manualAddDrank" <password> <userID> <amount>');
                    return;
                }
                statistics.addDrank(tokens[2], tokens[3]);
                bot.reply(message, 'User <@' + tokens[2] + '> has been added ' + tokens[3] + ' drank drinks');
                break;
            case 'addUser':
                statistics.addUser(tokens[2]);
                break;
            case 'removeUser':
                statistics.destroyUser(tokens[2]);
                break;
        }
    }

    function isValid(tokens) {
        return (typeof tokens[2] === 'string' && Number.isInteger(tokens[3]));
    }
}

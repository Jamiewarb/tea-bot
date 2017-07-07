var controller = null;

/**
 * UJHAVS7834: {
 *      drinks: {
 *          made: 0,
 *          drank: 0,
 *      }
 *  }
 */

module.exports = function(cont) {
    controller = cont;
}

const addDrank = function(user, amount) {
    controller.storage.users.get(user, function(err, userStorage) {
        userStorage = checkUserExists(user, userStorage);
        userStorage.drinks.drank += amount;
        controller.storage.users.save(userStorage);
    });
}

const addMade = function(user, amount) {
    controller.storage.users.get(user, function(err, userStorage) {
        userStorage = checkUserExists(user, userStorage);
        userStorage.drinks.made += amount;
        controller.storage.users.save(userStorage);
    });
}

const tellMyStats = function(bot, user) {
    controller.storage.users.get(user, function(err, userStorage) {
        userStorage = checkUserExists(user, userStorage);
        bot.startPrivateConversation({ 'user': user }, function(err, dm) {
            dm.say(
                '> You\'ve *made* ' + userStorage.drinks.made + ' drinks for others.  \n' +
                '> You\'ve *drank* ' + userStorage.drinks.drank + ' from others.'
            );
        });
    });
}

const checkUserExists = function(user, userStorage) {
    userStorage = setupUser(user, userStorage);
    return userStorage;
}

const setupUser = function(user, userStorage) {
    if (!userStorage) userStorage = {'id': user};
    if (!userStorage.hasOwnProperty('drinks')) userStorage.drinks = {};
    if (!userStorage.drinks.hasOwnProperty('made')) userStorage.drinks.made = 0;
    if (!userStorage.drinks.hasOwnProperty('drank')) userStorage.drinks.drank = 0;
    return userStorage;
}

const resetUser = function(userStorage) {
    userStorage.drinks = {
        'made': 0,
        'drank': 0,
    };
}

const displayTeaderboard = function(bot, message) {
    controller.storage.users.all(function(err, allUserData) {
        if (allUserData === undefined) {
        } else {
            if (allUserData !== null) {
                let sortedUserIDs = rankTeaderboard(allUserData);
                outputTeaderboard(bot, message, sortedUserIDs);
            } else {
                bot.reply(message, 'Looks like there\'s no teaderboard data yet! Go make some tea!');
            }
        }
    });
}

function outputTeaderboard(bot, message, sortedUserIDs) {
    bot.startConversation(message, function(err, convo) {
        let currentRank = 1,
            maxRankLength = 3,
            maxMadeLength = 5,
            maxReceivedLength = 5,
            maxNameLength = 20,
            titles = {};

        titles.main = '-=-=-=-=-=-=-=- TEADERBOARD -=-=-=-=-=-=-=-';
        titles.rank = 'RANK';
        titles.name = 'NAME';
        titles.made = 'MADE';
        titles.drank = 'RECEIVED';
        titles.separator = '  ';

        let text = '```' + titles.main + '  \n';

        text += titles.rank + pad(maxRankLength - titles.rank.length, ' ') + titles.separator +
                titles.made + pad(maxMadeLength - titles.made.length, ' ') + titles.separator +
                titles.drank + pad(maxReceivedLength - titles.drank.length, ' ') + titles.separator +
                titles.name + '  \n';

        let sortedUserIDsLength = sortedUserIDs.length;
        for (let i = 0; i < sortedUserIDsLength; i++) {
            let rank = formatStat(currentRank.toString(), maxRankLength, 'left'),
                made = formatStat(sortedUserIDs[i].made.toString(), maxMadeLength, 'left'),
                drank = formatStat(sortedUserIDs[i].drank.toString(), maxReceivedLength, 'left'),
                name = formatStat('<@' + sortedUserIDs[i].id + '>', maxNameLength, 'left');

            text += rank + pad(maxRankLength - titles.rank.length, ' ') + titles.separator +
                    made + pad(maxMadeLength - titles.made.length, ' ') + titles.separator +
                    drank + pad(maxReceivedLength - titles.drank.length, ' ') + titles.separator +
                    name +  '  \n';
            currentRank++;
        }

        text += '```';
        convo.say(text);
    });
}

function formatStat(string, length, alignment) {
    if (string.length > length) {
        return string.substr(0, length);
    }
    if (string.length < length) {
        switch (alignment) {
            case 'left':
                return string + pad(length - string.length, ' ');
            case 'right':
                return pad(length - string.length, ' ') + string;
            case 'center':
                let halfLength = (length - string.length) / 2;
                if ((string.length % 2) === 0) {
                    return pad(halfLength, ' ') + string + pad(halfLength, ' ');
                }
                return pad(halfLength - 1, ' ') + string + pad(halfLength, ' ');
        }
    }
    return string;
}

function pad(count, string) {
    if (count < 1) return '';
    return string.repeat(count);
}

function rankTeaderboard(allUserData) {
    let sortedUserIDs = [];
    let userDataLength = allUserData.length;
    for (let i = 0; i < userDataLength; i++) {
        let userData = allUserData[i];
        if (userData.hasOwnProperty('id') && userData.id.length > 0 &&
            userData.hasOwnProperty('drinks') && Object.keys(userData.drinks).length !== 0) {
            sortedUserIDs.push({
                'id': userData.id,
                'made': userData.drinks.made,
                'drank': userData.drinks.drank,
                'score': userData.drinks.made,
                'teaDifference': userData.drinks.made - userData.drinks.drank,
            });
        }
    }
    sortedUserIDs.sort(sortTeaScores);
    return sortedUserIDs;
}

function sortTeaScores(a, b) {
    if (a.score !== b.score) {
        return a.score - b.score;
    } else {
        return a.teaDifference - b.teaDifference;
    }
}

module.exports.addDrank = addDrank;
module.exports.addMade = addMade;
module.exports.tellMyStats = tellMyStats;
module.exports.checkUserExists = checkUserExists;
module.exports.setupUser = setupUser;
module.exports.resetUser = resetUser;
module.exports.displayTeaderboard = displayTeaderboard;

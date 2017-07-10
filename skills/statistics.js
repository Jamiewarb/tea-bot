var controller = null;

/**
 * User Storage
 * UJHAVS7834: {
 *      id: 'UJHAVS7834',
 *      drinks: {
 *          made: 0,
 *          drank: 0,
 *      }
 *  }
 *
 * Team Storage
 * T47563693: {
 *     id: 'U045VRZFT',
 *     brewRatings: {
 *         U045VRZFT: {
 *             100717-190702: { // This is the round identifier, from current date time
 *                 U082YDTST: {
 *                     'up': 0,
 *                     'down': 0,
 *                 }
 *             }
 *         }
 *     }
 * }
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

const rateBrew = function(bot, team, userRatee, userRater, rating, roundID) {
    //if (userRatee === userRater) return;

    controller.storage.teams.get(team, function(err, teamStorage) {
        teamStorage = checkTeamExists(team, teamStorage);

        let confirmationMessage = '';

        if (!teamStorage.brewRatings.hasOwnProperty(userRatee)) {
            teamStorage.brewRatings[userRatee] = {};
        }
        if (!teamStorage.brewRatings[userRatee].hasOwnProperty(roundID)) {
            teamStorage.brewRatings[userRatee][roundID] = {};
        }

        if (teamStorage.brewRatings[userRatee][roundID].hasOwnProperty(userRater)) {
            confirmationMessage = 'You\'ve already voted on this round - you cannot vote multiple times for a round';
        } else {
            if (rating === 'up') {
                teamStorage.brewRatings[userRatee][roundID][userRater] = {'up': 1};
                confirmationMessage = '> Great! You\'ve given <@' + userRatee + '>\'s latest round a thumbs up!';
            } else if (rating === 'down') {
                teamStorage.brewRatings[userRatee][roundID][userRater] = {'down': 1};
                confirmationMessage = '> Ouch! You\'ve given <@' + userRatee + '>\'s latest round a thumbs down!';
            }
            controller.storage.users.save(teamStorage);
        }

        bot.startPrivateConversation({ 'user': userRater }, function(err, dm) {
            dm.say(confirmationMessage);
        });
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

const addUser = function(user) {
    controller.storage.users.get(user, function(err, userStorage) {
        userStorage = checkUserExists(user, userStorage);
        controller.storage.users.save(userStorage);
    });
}

const destroyUser = function(user) {
    controller.storage.users.get(user, function(err, userStorage) {
        if (!userStorage) return;
        delete userStorage.drinks;
        controller.storage.users.save(userStorage);
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

const checkTeamExists = function(team, teamStorage) {
    if (!teamStorage) teamStorage = {'id': team};
    if (!teamStorage.hasOwnProperty('brewRatings')) teamStorage.brewRatings = {};
    return teamStorage;
}

const resetUser = function(userStorage) {
    userStorage.drinks = {
        'made': 0,
        'drank': 0,
    };
}

const displayRatings = function(bot, message, team) {
    controller.storage.teams.get(team, function(err, teamStorage) {
        teamStorage = checkTeamExists(team, teamStorage);
        let ratingMessage = getRatings(teamStorage);
        bot.reply(message, ratingMessage);
    });
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

        titles.main = '-=-=-=-=-=-=- TEADERBOARD -=-=-=-=-=-=-';
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

            text += rank + pad(titles.rank.length - maxRankLength, ' ') + titles.separator +
                    made + pad(titles.made.length - maxMadeLength, ' ') + titles.separator +
                    drank + pad(titles.drank.length - maxReceivedLength, ' ') + titles.separator +
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
        return b.score - a.score;
    }
    return b.teaDifference - a.teaDifference;
}

/**
 * Team Storage
 * T47563693: {
 *     id: 'U045VRZFT',
 *     brewRatings: {
 *         U045VRZFT: {
 *             100717-190702: { // This is the round identifier, from current date time
 *                 U082YDTST: {
 *                     'up': 0,
 *                     'down': 0,
 *                 }
 *             }
 *         }
 *     }
 * }
 */
function getRatings(teamData) {
    if (!teamData.hasOwnProperty('brewRatings') || Object.keys(teamData.brewRatings).length === 0) {
        return 'There are currently no ratings to display';
    }

    console.log('RATINGS');

    let output = '-=-=-=-=-=-=- RATINGS -=-=-=-=-=-=-  \n',
        brewRatings = teamData.brewRatings;
    for (let rateeUser in brewRatings) {
        if (!brewRatings.hasOwnProperty(rateeUser)) continue; //skip if from prototype
        console.log('brewRatings');
        let up = 0,
            down = 0,
            roundIDs = brewRatings[rateeUser];
        for (let roundID in roundIDs) {
            console.log('roundIDs');
            if (!roundIDs.hasOwnProperty(roundID)) continue; //skip if from prototype
            let ratorUsers = roundIDs[roundID];
            for (let rator in ratorUsers) {
                console.log('ratorUsers');
                if (!ratorUsers.hasOwnProperty(rator)) continue; //skip if from prototype
                let ratings = ratorUsers[rator];
                for (rating in ratings) {
                    console.log('ratings');
                    if (!ratings.hasOwnProperty(rating)) continue; //skip if from prototype
                    if (rating === 'up') up += ratings[rating];
                    if (rating === 'down') down += ratings[rating];
                }
            }
        }
        output += '<@' + rateeUser + '> - Up: ' + up + '- Down: ' + down;
    }
    return output;
}

module.exports.addDrank = addDrank;
module.exports.addMade = addMade;
module.exports.rateBrew = rateBrew;
module.exports.tellMyStats = tellMyStats;
module.exports.addUser = addUser;
module.exports.destroyUser = destroyUser;
module.exports.checkUserExists = checkUserExists;
module.exports.checkTeamExists = checkTeamExists;
module.exports.setupUser = setupUser;
module.exports.resetUser = resetUser;
module.exports.displayRatings = displayRatings;
module.exports.displayTeaderboard = displayTeaderboard;

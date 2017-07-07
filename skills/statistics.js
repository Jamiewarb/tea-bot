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
    console.log("~~~~~~~~ DISPLAY TEADERBOARD FUNCTION CALL ~~~~~~~~");
    controller.storage.users.all(function(err, allUserData) {
        let sortedUserIDs = rankTeaderboard(allUserData);
        outputTeaderboard(bot, message, sortedUserIDs);
    });
    console.log("~~~~~~~~ FINISH DISPLAY TEADERBOARD FUNCTION CALL ~~~~~~~~");
}

function outputTeaderboard(bot, message, sortedUserIDs) {
    console.log("~~~~~~~~ OUTPUT TEADERBOARD FUNCTION CALL ~~~~~~~~");
    bot.startConversation(message, function(err, convo) {
        console.log("~~~~~~~~ BEGIN GENERATING OUTPUT ~~~~~~~~");
        let rank = 1;
        let text = '```  \n' +
                   '-=-=-=-=-=-=- TEADERBOARD -=-=-=-=-=-=- \n' +
                   'RANK    NAME           MADE    RECEIVED  \n';
        let sortedUserIDsLength = sortedUserIDs.length;
        for (let i = 0; i < sortedUserIDsLength; i++) {
            text += rank + '      <@' + sortedUserIDsLength[i].id + '> ' +
                    sortedUserIDsLength[i].made + '  ' + sortedUserIDsLength[i].drank + '  \n';
            rank++;
        }
        text += '```';
        console.log("~~~~~~~~ FINISH GENERATING OUTPUT ~~~~~~~~");
        convo.say(text);
        console.log("~~~~~~~~ FINISH SAY OUTPUT ~~~~~~~~");
    });
}

function rankTeaderboard(allUserData) {
    console.log("~~~~~~~~ RANK TEADERBOARD FUNCTION CALL ~~~~~~~~");
    let sortedUserIDs = [];
    console.log(allUserData);
    let userDataLength = allUserData.length;
    console.log("LENGTH: " + userDataLength);
    console.log("~~~~~~~~ OPEN RANK LOOP ~~~~~~~~");
    for (let i = 0; i < userDataLength; i++) {
        let userData = allUserData[i];
        if (userData.hasOwnProperty('id') && userData.id.length > 0 &&
            userData.hasOwnProperty('drinks') && Object.keys(userData.drinks).length !== 0) {
            console.log("~~~~~~~~ PUSH RANK ~~~~~~~~");
            sortedUserIDs.push({
                'id': userData.id,
                'made': userData.drinks.made,
                'drank': userData.drinks.drank,
                'score': userData.drinks.made,
                'teaDifference': userData.drinks.made - userdata.drink.drank,
            });
            console.log("~~~~~~~~ FINISH PUSH RANK ~~~~~~~~");
        }
    }
    console.log("~~~~~~~~ START SORT ~~~~~~~~");
    sortedUserIDs.sort(sortTeaScores);
    console.log("~~~~~~~~ FINISH SORT ~~~~~~~~");
    console.log("~~~~~~~~ FINISH RANK TEADERBOARD FUNCTION CALL ~~~~~~~~");
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

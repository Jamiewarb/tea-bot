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

const displayTeaderboard = function() {
    controller.storage.users.all(function(err, allUserData) {
        console.log("~~~~ ALL USER DATA ~~~~");
        console.log(allUserData);
    });
}

module.exports.addDrank = addDrank;
module.exports.addMade = addMade;
module.exports.tellMyStats = tellMyStats;
module.exports.checkUserExists = checkUserExists;
module.exports.setupUser = setupUser;
module.exports.resetUser = resetUser;
module.exports.displayTeaderboard = displayTeaderboard;

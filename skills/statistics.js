var controller = null;

module.exports = function(cont) {
    controller = cont;
}

const addDrank = function(user, amount) {
    controller.storage.users.get(user, function(err, userStorage) {
        checkUserExists(userStorage);
        userStorage.drinks.drank += amount;
    });
}

const addMade = function(user, amount) {
    controller.storage.users.get(user, function(err, userStorage) {
        checkUserExists(userStorage);
        userStorage.drinks.made += amount;
    });
}

const getStats = function(user) {
    controller.storage.users.get(user, function(err, userStorage) {
        checkUserExists(userStorage);
        return userStorage.drinks;
    });
}

const checkUserExists = function(userStorage) {
    if (!userStorage || !userStorage.drinks || userStorage.drinks.length == 0) {
        setupUser(userStorage);
    }
}

const setupUser = function(userStorage) {
    if (!userStorage.hasOwnProperty('drinks')) userStorage.drinks = {};
    if (!userStorage.drinks.hasOwnProperty('made')) userStorage.drinks.made = 0;
    if (!userStorage.drinks.hasOwnProperty('drank')) userStorage.drinks.drank = 0;
}

const resetUser = function(userStorage) {
    userStorage.drinks = {
        'made': 0,
        'drank': 0,
    };
}

module.exports.addDrank = addDrank;
module.exports.addMade = addMade;
module.exports.getStats = getStats;
module.exports.checkUserExists = checkUserExists;
module.exports.setupUser = setupUser;
module.exports.resetUser = resetUser;

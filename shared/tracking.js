var tracking = {};

/**
 * {
 *     C654E7VDM: {
 *         U2UB89MH7: {
 *             user: U2UB89MH7,
 *             drink: tea
 *         }
 *     }
 * }
 */

getTracking = function() {
    return tracking;
}

channelActive = function(channel) {
    return tracking.hasOwnProperty(channel);
}

activateChannel = function(channel) {
    tracking[channel] = {};
    return channelActive(channel);
}

getChoices = function(channel) {
    return tracking[channel];
}

deactivateChannel = function(channel) {
    delete tracking[channel];
    return !channelActive(channel);
}

addItem = function(channel, user, drink, message) {
    tracking[channel][user] = {
        'user': user,
        'drink': drink,
        'message': message
    };
    return tracking[channel][user].drink;
}

cancelUser = function(channel, user) {
    delete tracking[channel][user];
    return !tracking[channel].hasOwnProperty(user);
}

module.exports.getTracking = getTracking;
module.exports.channelActive = channelActive;
module.exports.activateChannel = activateChannel;
module.exports.getChoices = getChoices;
module.exports.deactivateChannel = deactivateChannel;
module.exports.addItem = addItem;
module.exports.cancelUser = cancelUser;

var tracking = {};

/**
 * {
 *     C654E7VDM: {
 *         type: 'me' | 'random',
 *         choices: {
 *             U2UB89MH7: {
 *                 user: 'U2UB89MH7',
 *                 drink: 'tea'
 *                 message: 'bork'
 *             }
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

activateChannel = function(channel, type) {
    tracking[channel] = {
        'type': type,
        'choices': {},
    };
    return channelActive(channel);
}

getType = function(channel) {
    return tracking[channel].type;
}

getChoices = function(channel) {
    return tracking[channel].choices;
}

deactivateChannel = function(channel) {
    delete tracking[channel];
    return !channelActive(channel);
}

addItem = function(channel, user, drink, message) {
    tracking[channel].choices[user] = {
        'user': user,
        'drink': drink,
        'message': message
    };
    return tracking[channel].choices[user].drink;
}

cancelUser = function(channel, user) {
    delete tracking[channel].choices[user];
    return !tracking[channel].choices.hasOwnProperty(user);
}

module.exports.getTracking = getTracking;
module.exports.channelActive = channelActive;
module.exports.activateChannel = activateChannel;
module.exports.getType = getType;
module.exports.getChoices = getChoices;
module.exports.deactivateChannel = deactivateChannel;
module.exports.addItem = addItem;
module.exports.cancelUser = cancelUser;

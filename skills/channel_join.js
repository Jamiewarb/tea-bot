var debug = require('debug')('botkit:channel_join');

module.exports = function(controller) {

    controller.on('bot_channel_join', function(bot, message) {

        bot.startConversation(message, function(err, convo) {

            convo.say(message, 'http://gph.is/2bsaGX6');
            convo.say(message, 'As a kid, I got three meals a day. Oatmeal, miss-a-meal and no meal');
            convo.say(message, 'But fine, I\'ll help. Just type let me know what you want to do, or type `help`');

        // controller.studio.run(bot, 'channel_join', message.user, message.channel).catch(function(err) {
        //     debug('Error: encountered an error loading onboarding script from Botkit Studio:', err);
        // });

    });

}

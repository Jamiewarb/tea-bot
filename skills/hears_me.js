/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {
    controller.hears(['me'], 'direct_mention,mention', function(bot, message) {
        console.log(message);
        beginMe(controller, bot, message);
    });
}

const beginMe = function(controller, bot, message) {

    bot.createConversation(message, function(err, convo) {

        convo.addMessage({
            text: 'It won\t be as good as mine, but you gotta start somewhere. I\'ll let everyone know',
        },'yes_thread');

        convo.addMessage({
            text: 'Why you wasting my time fool',
            action: 'stop', // Marks converation as unsuccessful
        },'no_thread');

        convo.addMessage({
            text: 'GRRRR! Was that a `yes` or a `no`?',
        },'bad_response');

        // Create a yes/no question in the default thread...
        convo.ask('So you\'re going to make a round of tea, are you?', [
            {
                pattern:  bot.utterances.yes,
                callback: function(response, convo) {
                    convo.gotoThread('yes_thread');
                },
            },
            {
                pattern:  bot.utterances.no,
                callback: function(response, convo) {
                    convo.gotoThread('no_thread');
                },
            },
            {
                default: true,
                callback: function(response, convo) {
                    convo.gotoThread('bad_response');
                },
            }
        ]);

        convo.activate();

        convo.on('end', function(convo) {

            if (convo.successful()) {
                bot.reply(message, 'Okay, off I go!!!');

                // and now deliver cheese via tcp/ip...

            }

        });
    });
}

module.exports.beginMe = beginMe;

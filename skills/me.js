/**
 * When a user wants to make a round of tea themselves, they can use this
 */

module.exports = function(controller) {

    controller.hears(['me'], 'direct_message,direct_mention,mention', function(bot, message) {

        bot.createConversation(message, function(err, convo) {

            // create a path for when a user says YES
            convo.addMessage({
                    text: 'It won\t be as good as mine, but you gotta start somewhere. I\'ll let everyone know',
            },'yes_thread');

            // create a path for when a user says NO
            // mark the conversation as unsuccessful at the end
            convo.addMessage({
                text: 'Why you wasting my time fool',
                action: 'stop', // this marks the converation as unsuccessful
            },'no_thread');

            // create a path where neither option was matched
            // this message has an action field, which directs botkit to go back to the `default` thread after sending this message.
            convo.addMessage({
                text: 'GRRRR! Was that a `yes` or a `no`?',
                action: 'default',
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

            // capture the results of the conversation and see what happened...
            convo.on('end', function(convo) {

                if (convo.successful()) {
                    // this still works to send individual replies...
                    bot.reply(message, 'Okay, off I go!!!');

                    // and now deliver cheese via tcp/ip...
                }

            });
        });

    });

}

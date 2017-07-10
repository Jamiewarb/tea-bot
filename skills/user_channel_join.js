module.exports = function(controller) {

    controller.on('user_channel_join,user_group_join', function(bot, message) {

        let welcomePhrases = [
            'Hey, you, with the teeth...',
            'I\'m Mr. Tea and I\'m a "Night Elf Mohawk"! What\'s YOUR game,',
            'Mr. Tea has the greatest hair in the world. You can\'t deny it, it\'s been proven by science, fool!',
            'I pity the fool who drinks soy milk.',
            'Hey, sucka!',
            'Don\'t make me mad, Arrr!',
            'I\'m on a real short leash here, and I\'m tired of your crazy rap!',
            'Life\'s tough, but I\'m tougher!'
        ];

        bot.reply(message, welcomePhrases[Math.floor(Math.random() * welcomePhrases.length)] + ' <@' + message.user + '>');

    });

}

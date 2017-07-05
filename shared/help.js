var config = require('./config.js');

exports.getHelpMessage = function() {
    return {
        'text': 'Here\'s a list of commands you fools can use. Just message me directly, @mr_tea in a channel I\'m in',
        'attachments': [
            {
                'fallback': 'me - Start a round of tea with you as the fool that makes them',
                'title': 'me',
                'text': 'Start a round of tea with you as the fool that makes them',
                'color': config.me.color
            },
            {
                'fallback': 'you <user> - Start a round of tea, and pick the fool to make it',
                'title': 'you <user>',
                'text': 'Start a round of tea, and pick the fool to make it',
                'color': config.you.color
            },
            {
                'fallback': 'someone - Start a round of tea, and ask someone to make it',
                'title': 'someone',
                'text': 'Start a round of tea, and ask someone to make it',
                'color': config.someone.color
            },
            {
                'fallback': 'random - Start a round of tea, and randomly pick the fool to make it',
                'title': 'random',
                'text': 'Start a round of tea, and randomly pick the fool to make it',
                'color': config.random.color
            },
            {
                'fallback': 'my brews - View your own brewing statistics',
                'title': 'my brews',
                'text': 'View your own brewing statistics',
                'color': config.brews.color
            },
            {
                'fallback': 'teaderboard - View the Teaderboard',
                'title': 'teaderboard',
                'text': 'View the Teaderboard',
                'color': config.teaderboard.color
            },
            {
                'fallback': 'help - View all these commands again',
                'title': 'help',
                'text': 'View all help',
                'color': '#9477cb'
            }
        ]
    };
};

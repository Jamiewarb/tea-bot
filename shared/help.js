exports.getHelpMessage = function() {
    return {
        'text': 'Here\'s a list of commands you fools can use:',
        'attachments': [
            {
                'fallback': 'me - Start a round of tea with you as the fool that makes them',
                'title': 'me',
                'text': 'Start a round of tea with you as the fool that makes them',
                'color': '#fea3aa'
            },
            {
                'fallback': 'you <user> - Start a round of tea, and pick the fool to make it',
                'title': 'you <user>',
                'text': 'Start a round of tea, and pick the fool to make it',
                'color': '#f8b88b'
            },
            {
                'fallback': 'random - Start a round of tea, and randomly pick the fool to make it',
                'title': 'random',
                'text': 'Start a round of tea, and randomly pick the fool to make it',
                'color': '#faf884'
            },
            {
                'fallback': 'my brews - View your own brewing statistics',
                'title': 'my brews',
                'text': 'View your own brewing statistics',
                'color': '#baed91'
            },
            {
                'fallback': 'teaderboard - View the Teaderboard',
                'title': 'teaderboard',
                'text': 'View the Teaderboard',
                'color': '#b2cefe'
            },
            {
                'fallback': 'help - View all these commands again',
                'title': 'help',
                'text': 'View all help',
                'color': '#f2a2e8'
            }
        ]
    };
};

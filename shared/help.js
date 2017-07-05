var config = require('../config.js');

var help = {};

help.text = 'Here\'s a list of commands you fools can use. Just message me directly, or add @mr_tea in a channel I\'m in';
help.attachments = [
    {
        'fallback': 'me - Start a round of tea with you as the fool that makes them',
        'title': 'me',
        'text': 'Start a round of tea with you as the fool that makes them',
        'color': config.optionSettings.me.color
    },
    {
        'fallback': 'you <user> - Start a round of tea, and pick the fool to make it',
        'title': 'you <user>',
        'text': 'Start a round of tea, and pick the fool to make it',
        'color': config.optionSettings.you.color
    },
    {
        'fallback': 'someone - Ask politely if someone will start a round of tea',
        'title': 'someone',
        'text': 'Ask politely if someone will start a round of tea',
        'color': config.optionSettings.someone.color
    },
    {
        'fallback': 'random - Start a round of tea, and randomly pick the fool to make it',
        'title': 'random',
        'text': 'Start a round of tea, and randomly pick the fool to make it',
        'color': config.optionSettings.random.color
    },
    {
        'fallback': 'my brews - View your own brewing statistics',
        'title': 'my brews',
        'text': 'View your own brewing statistics',
        'color': config.optionSettings.brews.color
    },
    {
        'fallback': 'teaderboard - View the Teaderboard',
        'title': 'teaderboard',
        'text': 'View the Teaderboard',
        'color': config.optionSettings.teaderboard.color
    },
    {
        'fallback': 'assist - View all these commands again',
        'title': 'assist',
        'text': 'View all help',
        'color': '#9477cb'
    }
];

module.exports = help;

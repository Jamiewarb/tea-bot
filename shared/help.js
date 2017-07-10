var config = require('../config.js');

var help = {};

help.text = 'Here\'s a list of commands you fools can use. Just write "<@mr_tea> <command>" in a channel that I\'m in';
help.attachments = [
    {
        'fallback': 'me - Start a round of tea with you as the fool that makes them',
        'title': 'me',
        'text': 'Start a round of tea with you as the fool that makes them',
        'color': config.optionSettings.me.color,
        'callback_id': 'assist_action',
        'attachment_type': 'default',
        'actions': [
            {
                'name': 'start_me',
                'text': 'I\'ll make the tea',
                'type': 'button',
                'value': 'start'
            }
        ]
    },
    // {
    //     'fallback': 'you <user> - Start a round of tea, and pick the fool to make it',
    //     'title': 'you <user>',
    //     'text': 'Start a round of tea, and pick the fool to make it',
    //     'color': config.optionSettings.you.color
    // },
    {
        'fallback': 'someone - Ask politely if someone will start a round of tea',
        'title': 'someone',
        'text': 'Ask politely if someone will start a round of tea',
        'color': config.optionSettings.someone.color,
        'callback_id': 'assist_action',
        'attachment_type': 'default',
        'actions': [
            {
                'name': 'start_someone',
                'text': 'Please make some tea',
                'type': 'button',
                'value': 'start'
            }
        ]
    },
    {
        'fallback': 'brewlette - Start a round of tea, and randomly pick the fool to make it',
        'title': 'brewlette',
        'text': 'Start a round of tea, and randomly pick the fool to make it',
        'color': config.optionSettings.random.color,
        'callback_id': 'assist_action',
        'attachment_type': 'default',
        'actions': [
            {
                'name': 'start_random',
                'text': 'Spin the wheel!',
                'type': 'button',
                'value': 'start'
            }
        ]
    },
    {
        'fallback': 'my brews - View your own brewing statistics',
        'title': 'my brews',
        'text': 'View your own brewing statistics',
        'color': config.optionSettings.brews.color,
        'callback_id': 'assist_action',
        'attachment_type': 'default',
        'actions': [
            {
                'name': 'my_brews',
                'text': 'DM me my brews',
                'type': 'button',
                'value': 'show'
            }
        ]
    },
    {
        'fallback': 'teaderboard - View the Teaderboard',
        'title': 'teaderboard',
        'text': 'View the Teaderboard',
        'color': config.optionSettings.teaderboard.color,
        'callback_id': 'assist_action',
        'attachment_type': 'default',
        'actions': [
            {
                'name': 'teaderboard',
                'text': 'View Teaderboard',
                'type': 'button',
                'value': 'show'
            }
        ]
    },
    {
        'fallback': 'assist - View all these commands again',
        'title': 'assist',
        'text': 'View all help',
        'color': '#9477cb'
    }
];

module.exports = help;

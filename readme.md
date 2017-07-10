# Tea Bot - A Slack Bot to help with your office tea needs

This is the first bot I've built, for Slack or otherwise, and my first main Javascript project.

I built it for Hex Digital as a bit of humour during the 3pm crawl when our thirst
desperately needs quenching. Turns out it's actually quite fun to use!

## Features:
* Announce to your team that you're going to make a round of teas, coffees and other
* Take tea, coffee or other orders from everyone in the channel when a round is active
* When a round finishes, announce all the orders and provide totals of each drink for ease of use
* Ask politely if someone else will make tea/coffee/other
* Start a random round, where the person that will make the tea is picked randomly from everyone that wants one
* Store statistics each time you make drinks or have them made for you
* Ask the bot how many you've made for others, and how many you've drank from others
* Display a teaderboard to see rankings for everyone in the team, Made and Received
* Manually add or remove drinks 'Made' and 'Drank' from users
* Display a help menu with all the necessary commands, and also interactive buttons to perform them

![image](https://user-images.githubusercontent.com/2754728/28029302-7c7017de-6597-11e7-8746-2cddfff22e84.png)

## Contributing

I am happily accepting pull requests to the project. Please ensure coding standards
match that of the existing code and that the pull requests thoroughly document
the functionality proposed/problem to solve and how you've chosen to do it.

### Setup the Project Yourself

Clone the repo

Run `yarn install` or `npm install`

### Writing Code

Ensure all skills are in the `/skills` directory, such as hearing certain phrases
and just general functionality.

Use the `/shared` function for code that's required by multiple skills

#### Set up your Slack Application

Please follow the instructions here for [setting up your Slack Application](https://github.com/howdyai/botkit-starter-slack)

## About Botkit

Botkit is a product of [Howdy](https://howdy.ai) and made in Austin, TX with the help of a worldwide community of botheads.

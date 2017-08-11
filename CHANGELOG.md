# Chaneglog

All notable changes to this project are documented here, and adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [v1.5.0](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.5.0)

*Enhancements:*
* Tracked who was actually in a round
* Prevented users that aren't in a round from voting a round up or down

## [v1.4.1](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.4.1)

*Bug Fixes:*
* Fixed problem from v1.4.0 that caused program to crash

## v1.4.0

*Enhancements:*
* Added multiple messages to the 'Cracking Brew' button to change what it says
* Activated downvoting a tea, and included its own messages

## [v1.3.3](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.3.3) - 11th July 2017

*Enhancements:*
* Prevented users from rating their own brews when they conduct their own round

*Bug Fixes:*
* Fixed default timer being set incorrectly by previous patch

## [v1.3.1](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.3.1) - 11th July 2017

*Bug Fixes:*
* Fixed breaking bug that prevented bot from starting due to a syntax error

## v1.3.0 - 11th July 2017

*Enhancements:*
* Added ability to rate a round positively after it's been completed
  * These votes are attributed to a specific user, a specific round and from a specific user, allowing for deeper insights into statistics later on

## [v1.2.2](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.2.2) - 10th July 2017

*Miscellaneous:*
* Enabled Teaderboard in the assist menu

## [v1.2.1](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.2.1) - 10th July 2017

*Enhancements:*
* Add `manualAddUser` and `manualRemoveUser` commands to add or remove users
from the teaderboard storage

## [v1.2.0](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.2.0) - 10th July 2017

*Enhancements:*
* Added manualAdd commands
* Added days to uptime stats

*Miscellaneous:*
* Moved stats out of sample file to their own skills file
* Removed example code and cleaned up or renamed that which we're keeping

## [v1.1.1](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.1.1) - 10th July 2017

*Bug Fixes:*
* Fixed a bug where the bot wouldn't start because tracking info wasn't loaded in the random skill
* Fixed a bug where some parameters were not being passed to round start

## [v1.1.0](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.1.0) - 8th July 2017

*Enhancements:*
* Added `teaderboard` to track the best and the worst tea makers and drinkers.
* Added term `brewlette` which also starts random mode, for super sexy flair.

*Bug Fixes:*
* When a round is already present, an 'already in progress' message will now display when trying to start another random round

*Miscellaneous:*
* Added dates into the changelog

## [Tea Bot Release v1.0.0 🎉](https://github.com/Jamiewarb/tea-bot/releases/tag/v1.0.0) - 7th July 2017

I'm proud to release the first major version of tea bot!

### In this version:

* Announce to your team that you're going to make a teas and coffees
* Take tea, coffee or other orders from everyone in the channel
* Ask politely if someone else will make tea/coffee
* Start a random round, where the person that will make the tea is picked randomly from everyone that wants one
* Store statistics each time you make drinks or have them made for you
* Ask the bot how many you've made for others, and how many you've drank from others

exports.server = {
	game: {
		port: 3000,
		name: 'RockMUD',
		version: '0.3.0',
		website: 'https://github.com/MoreOutput/RockMUD',
		description: 'Websockets MUD Engine Demo',
		// Name of world currency -- referenced in game
		coinage: 'dust',
		// Area the player starts in -- can be an array.
		// if its an array the selection is randomized.
		// used in Character.create()
		startingArea: {
			area: 'atlas',
			roomid: '1'
		}
	},
	admins: []
};

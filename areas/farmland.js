'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
Character = require('../src/character').character,
World = require('../src/world').world;

module.exports = {
	name: 'Morgan Farm',
	id: 'farm',
	type: 'rural',
	levels: 'All',
	description: 'Southern farm.',
	reloads: 0,
	created: '',
	saved: '',
	author: 'Blue',
	messages: [
		{msg: 'The horses in the fields whinny.'},
		{msg: 'Flower petals flow past you through the air.'}
	],
	respawnOn: 8,
	rooms: [
		{
			id: '1',
			title: 'Farm Path',
			light: true,
			area: 'farm',
			content: 'This well-worn muddy path is tracked deeply with the ruts from passing wagon wheels. To the sides, fenced-off pastures hold horses and cows, idly and calmly chewing on the grass.',
			outdoors: false,
			exits: [
				{
					cmd: 'south',
					id: '2'
				},{
					cmd: 'north',
					id: '1',
					area: 'dormaus'
				}
			],
			events: [],
			playersInRoom: [],
			monsters: [],
			items: [],
			beforeEnter: function(roomObj, fromRoom, target) {
				return true;
			},
			onEnter: function(roomObj, target) {
				
			}
		},
		{
			id: '2',
			title: 'Morgan Farmhouse',
			area: 'farm',
			light: true,
			content: 'A wide wooden farmhouse stands here, the board walls washed with white paint, and the tiled roof a cheerful red. Some horse posts are next to the wooden porch, and a creaking sign painted with a wheat symbol sways on the gate.',
			outdoors: false,
			exits: [
				{
					cmd: 'north',
					id: '1'
				}, {
					cmd: 'east',
					id: '3'
				}, {
				    cmd: 'south',
				    id: '4'
				}
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
		{
			id: '3',
			title: 'Scrubby Farmland',
			area: 'farm',
			light: true,
			content: 'The farmland is tangled with weeds here, with only a few weak trees standing up from the long grass. It leads up to the rocky sides of a rising mountain, where the dark mouth of a strange cave looms. The cave is criss-crossed with paper talismans.',
			outdoors: false,
			exits: [
				{
					cmd: 'west',
					id: '2'
				},{
					cmd: 'east',
					id: '1',
					area: 'caverns'
				}
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
        {
            id: '4',
            title: 'Witch\'s Peak Cliff',
            area: 'farm',
			light: true,
            content: 'Far from the rest of the farmland, this cliff overlooks the crashing foamy waves below. The grass sways in a powerful wind, and the salty spray of foam manages to reach even to the cliff heights. In the distant horizon, ships float on the waters.',
            outdoors: false,
            exits: [
                {
                    cmd: 'north',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        }
	]
};


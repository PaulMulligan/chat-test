'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
Character = require('../src/character').character,
World = require('../src/world').world;

module.exports = {
	name: 'Dormaus',
	id: 'dormaus',
	type: 'city',
	levels: 'All',
	description: 'The basic village.',
	reloads: 0,
	created: '',
	saved: '',
	author: 'Blue',
	messages: [
		{msg: 'The sound of accordion music drifts through the air.'},
		{msg: 'The smell of fresh fruit wafts through the streets.'}
	],
	respawnOn: 8,
	rooms: [
		{
			id: '1',
			title: 'Dormaus Gates',
			light: true,
			area: 'dormaus',
			content: 'The grassy road opens up here, leading to two wooden poles, bedecked with flags. This marks the entrance to the sleepy town of Dormaus, and the smell of bread and sound of lively music flows through the air as you approach.',
			outdoors: false,
			exits: [
				{
					cmd: 'north',
					id: '2'
				},{
					cmd: 'south',
					id: '1',
					area: 'farm'
				}
			],
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
			title: 'Streets of Dormaus',
			area: 'dormaus',
			light: true,
			content: 'The streets of Dormaus are unpaved, just well-trodden dirt, but the buildings around you are charming thatched cottages with colourful flowers blooming from every windowsill, and from the many hanging baskets. You can see a general store to the west, and a large multi-storey pub to the north.',
			outdoors: false,
			exits: [
				{
					cmd: 'north',
					id: '3'
				}, {
					cmd: 'west',
					id: '5'
				}, {
				    cmd: 'northwest',
				    id: '7'
				}, {
                    cmd: 'south',
                    id: '1'
                }
				
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
		{
			id: '3',
			title: 'The Fur and Feather Bar',
			area: 'dormaus',
			light: true,
			content: 'The bar is dim compared to the streets outside, but a roaring fire and many flickering candles gives it a homely and welcoming feeling. A massive dire-bear-skin rug lies next to the fireplace, and behind the bar, a dizzying array of colourful spirits are begging to be tasted.',
			outdoors: false,
			exits: [
				{
					cmd: 'south',
					id: '2'
				},{
                    cmd: 'up',
                    id: '4'
                }
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
        {
            id: '4',
            title: 'The Fur and Feather Stalls',
            area: 'dormaus',
			light: true,
            content: 'From here, you can look down at the main area of the bar, past a wooden banister. This raised area is up the stairs and slightly darker. Several wooden tables are arranged below the mounted heads of strange beasts.',
            outdoors: false,
            exits: [
                {
                    cmd: 'down',
                    id: '3'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '5',
            title: 'The Want of a Nail General Store',
            area: 'dormaus',
            light: true,
            content: 'The walls and floor of this store are stocked with an assortment of strange odds and ends. Bags of flour sit next to chipped statues, and on the shelves, bottles of vinegar share space with wooden masks and stuffed animals.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '2'
                },{
                    cmd: 'west',
                    id: '6'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '6',
            title: 'The Want of a Nail Back Rooms',
            area: 'dormaus',
            light: true,
            content: 'The rear of the general store is the living quarters for the shopkeeper, though he always welcomes visitors. A large wagon wheel is propped against the wall, next to the colourful carpet. A pot of tea is boiling on the warm stove.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '5'
                },{
                    cmd: 'north',
                    id: '7'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '7',
            title: 'Dormaus Marketplace',
            area: 'dormaus',
            light: true,
            content: 'The marketplace is busy every time of day. Traders walk through, leading strange beasts of burden laden with goods, from walking birds to four-legged armored monsters. Colourful tents ring the marketplace, and between them, merchants hawk their wares from carpets or hand baskets.',
            outdoors: false,
            exits: [
                {
                    cmd: 'north',
                    id: '13'
                },{
                    cmd: 'south',
                    id: '6'
                },{
                    cmd: 'southeast',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '8',
            title: 'Fountain Plaza',
            area: 'dormaus',
            light: true,
            content: 'The tinkling of a fountain fills the air, mixed with the cheerful music of an accordion coming from the musicians playing nearby. This round plaza is ringed with many beautiful flowers, and in the center, a beautiful fountain endlessly sprays glimmering water.',
            outdoors: false,
            exits: [
                {
                    cmd: 'north',
                    id: '9'
                },{
                    cmd: 'east',
                    id: '7'
                },{
                    cmd: 'west',
                    id: '10'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '9',
            title: 'Churchyard',
            area: 'dormaus',
            light: true,
            content: 'The churchyard is a place of quiet and respite from the otherwise busy streets of Dormaus. Benches sit amongst the grass, under the shade of tall trees. To the north, the wooden church itself stands, with a tall pointed bell tower atop it.',
            outdoors: false,
            exits: [
                {
                    cmd: 'north',
                    id: '15'
                },{
                    cmd: 'south',
                    id: '8'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '10',
            title: 'Backstreets',
            area: 'dormaus',
            light: true,
            content: 'The back streets of Dormaus are less busy than the rest. The ground here splits, one path rising up and the other moving down. On both, small cottages stand, each with horseshoes on the doors. At the bottom of the southern lane, a small village post office is open for business.',
            outdoors: false,
            exits: [
                {
                    cmd: 'east',
                    id: '8'
                },{
                    cmd: 'south',
                    id: '11'
                },{
                    cmd: 'north',
                    id: '12'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '11',
            title: 'Post Office',
            area: 'dormaus',
            light: true,
            content: 'The post office is a tiny wooden building. On one wall, a notice board is holding a variety of messages and papers, advertising fairs or making requests. A ticking clock on the opposite wall stands above the clerk\'s desk and gives the room a businesslike ambience.',
            outdoors: false,
            exits: [
                {
                    cmd: 'north',
                    id: '10'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '12',
            title: 'Pumpkin Patch',
            area: 'dormaus',
            light: true,
            content: 'At the outskirts of the village, the well-trodden path gives way to muddy fields and grassy pastures. Here, the scrubby ground is filled with huge, colourful pumpkins, out of season yet vibrant.',
            outdoors: false,
            exits: [
                {
                    cmd: 'south',
                    id: '10'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '13',
            title: 'The Two Feathers Inn',
            area: 'dormaus',
            light: true,
            content: 'The inn is a clean and homely building. The walls are white with fresh paint, and some effort has been put into decorating them with photographs and woodcuts. From the ceiling, a small but pretty chandelier is lighting the room.',
            outdoors: false,
            exits: [
                {
                    cmd: 'south',
                    id: '7'
                },{
                    cmd: 'up',
                    id: '14'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '14',
            title: 'The Two Feathers Inn: Bedroom',
            area: 'dormaus',
            light: true,
            content: 'The beds at the Two Feathers are clean and well-made. It smells like fresh linen, and atop each bed is a small but clearly much-loved patchwork toy.',
            outdoors: false,
            exits: [
                {
                    cmd: 'down',
                    id: '13'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },
        {
            id: '15',
            title: 'Church',
            area: 'dormaus',
            light: true,
            content: 'The church is quiet today. Rows of pews face towards an altar, behind which, a serene statue of a goddess looks with benevolence upon the congregation. The coloured glass in the windows causes the light here to shine ethereally.',
            outdoors: false,
            exits: [
                {
                    cmd: 'south',
                    id: '9'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        }
	]
};


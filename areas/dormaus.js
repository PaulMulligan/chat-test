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
			size: {value: '4'},
			items: [{
				name: 'Potion of Growth', 
				short: 'a potion of growth',
				long: 'A swirling potion of growth, that seems to bulge out at its container, was left here.' ,
				area: 'dormaus',
				id: '102',
				level: 1,
				drinks: 6,
				maxDrinks: 6,
				itemType: 'bottle',
				material: 'glass',
				weight: 0,
				affects: [],
				value: 1,
				equipped: false,
				onDrink: function(player, roomObj, bottle) {
					if (player.size.value == 1) {
						player.size.value = 2;
						player.size.display = 'small';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel swollen and bubbly. Your tiny body feels more firm as you start to grow, stretching out from your tiny stature and looking in awe as the towering world around you seems so much smaller. You grow to the size of a small fox.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 2) {
						player.size.value = 3;
						player.size.display = 'medium-sized';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel swollen and bubbly. Your feet press into the ground as you start to grow, stretching out from your short stature and seeing the world around you shrink to match your size. You grow to the size of a human.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 3) {
						player.size.value = 4;
						player.size.display = 'large';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel swollen and bubbly. You feel powerful and heavy as you start to grow, stretching out from your ordinary stature and becoming taller and taller. Your weight presses into the ground, and the world around you starts to look small and weak, as you grow as large as a minotaur.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 4) {
						player.size.value = 5;
						player.size.display = 'huge';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel swollen and bubbly. Your feet leave mighty dents in the ground, and your whole body feels enormous and weighty. The world around you looks like a toy, becoming small and almost unreal. You grow to the mighty height of a dragon, other creatures mere dwarves to you.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 5) {
						player.size.value = 6;
						player.size.display = 'gigantic';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel swollen and bubbly. The world around you shrinks so quickly that it soon looks like a plaything. You could crush entire buildings under one of your enormous feet. Your whole body is enormous and tanklike, a mighty and gigantic towering behemoth! You are too large to even reasonably interact with the antlike creatures beneath you.',
							styleClass: 'cmd-drop blue'
						});
						
						var respawnRoom = World.getRoomObject(roomObj.overworld.area, roomObj.overworld.roomid);
						
						Room.removePlayer(roomObj, player);
					
						respawnRoom.playersInRoom.push(player);
						
						player.roomid = respawnRoom.id;
						player.area = respawnRoom.area;
						
					} else {
						World.msgPlayer(player, {
							msg: 'You feel a bubbling and gurgling in your colossal belly as you sip from the microscopic bottle, but then it fades. You are too large and powerful for the magic of this potion to grow you any further.',
							styleClass: 'cmd-drop blue'
						});
					}
					
				}
			},{
				name: 'Potion of Shrinking', 
				short: 'a potion of shrinking',
				long: 'A swirling potion of shrinking, that seems to clench within its container, was left here.' ,
				area: 'dormaus',
				id: '102',
				level: 1,
				drinks: 6,
				maxDrinks: 6,
				itemType: 'bottle',
				material: 'glass',
				weight: 0,
				affects: [],
				value: 1,
				equipped: false,
				onDrink: function(player, roomObj, bottle) {
					if (player.size.value == 1) {
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel small and light. The sensation then fades. It seems that this potion is too weak to shrink you any smaller.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 2) {
						player.size.value = 1;
						player.size.display = 'tiny';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel small and light. Your already short body begins to shrink, the world around you growing larger and more intimidating. You squeak as you shrink down to the size of one of your former feet, becoming the size of a tiny mouse.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 3) {
						player.size.value = 2;
						player.size.display = 'small';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel small and light. You feel your limbs getting thinner, and your body shrinking. The world looks large and clunky around you as you drop to half your height, becoming the size of a short fox.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 4) {
						player.size.value = 3;
						player.size.display = 'medium-sized';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel small and light. Your hefty body shrinks down, your large form reducing to the size of a mere human, as the world around you seems to be returning to the size designed for someone of this height.',
							styleClass: 'cmd-drop blue'
						});
					} else if (player.size.value == 5) {
						player.size.value = 4;
						player.size.display = 'large';
						World.msgPlayer(player, {
							msg: 'You feel your whole body tensing up, as your insides feel small and light. Your mighty and bulky body shrinks down, your huge form shrinking to merely a size that is merely much larger than most of those around you, instead of towering and intimidating.',
							styleClass: 'cmd-drop blue'
						});
					} else {
						player.size.value = 5;
						player.size.display = 'huge';
						World.msgPlayer(player, {
							msg: 'You feel a bubbling and gurgling in your colossal belly as you sip from the microscopic bottle, and then with a bizarre rushing sensation, you shrink down from your colossal size. The world rushes up to meet you, and you are drawn down from the cloud layer and left as only a massive hulking beast, rather than an impossibly huge monster.',
							styleClass: 'cmd-drop blue'
						});
						
						var respawnRoom = World.getRoomObject(roomObj.overworld.area, roomObj.overworld.roomid);
						
						Room.removePlayer(roomObj, player);
					
						respawnRoom.playersInRoom.push(player);
						
						player.roomid = respawnRoom.id;
						player.area = respawnRoom.area;
					}
					
				}
			}]
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
			size: {value: '4'},
            monsters: [],
            items: []
        },
        {
            id: '5',
            title: 'The Want of a Nail General Store',
            area: 'dormaus',
            light: true,
			size: {value: '4'},
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
			size: {value: '4'},
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
			size: {value: '4'},
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
			size: {value: '4'},
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
			size: {value: '4'},
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
			size: {value: '4'},
            items: []
        }
	]
};


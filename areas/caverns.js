'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
Character = require('../src/character').character,
World = require('../src/world').world;

module.exports = {
	name: 'Geo Caverns',
	id: 'caverns',
	type: 'cave',
	levels: 'All',
	description: 'The southern caves.',
	reloads: 0,
	created: '',
	saved: '',
	author: 'Blue',
	messages: [
		{msg: 'The sound of dripping water echoes through the stony caverns.'},
		{msg: 'Glowing rocks shine in the walls for a moment, then fade again.'}
	],
	respawnOn: 8,
	rooms: [
		{
			id: '1',
			title: 'Cave Entrance',
			light: true,
			area: 'caverns',
			content: 'The light from outside barely reaches into the darkness of these caverns. From deep within, the sound of water echoes, and the air is as cold as ice.',
			outdoors: false,
			exits: [
				{
					cmd: 'south',
					id: '3'
				},{
					cmd: 'east',
					id: '2'
				},{
					cmd: 'west',
					id: '3',
					area: 'farm'
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
			title: 'Quartz Cavern',
			area: 'caverns',
			light: true,
			content: 'This cavern opens out to reveal thick pieces of quartz sticking out from the rock walls. Glittering white crystals stud the tall ceiling, making what little light that is here refract strangely.',
			outdoors: false,
			exits: [
				{
					cmd: 'east',
					id: '4'
				}, {
					cmd: 'west',
					id: '1'
				}, {
				    cmd: 'south',
				    id: '3'
				}
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
		{
			id: '3',
			title: 'Wet Cavern',
			area: 'caverns',
			light: true,
			content: 'This part of the cavern is lower than the rest, following a path down into the earth. It stops at a black, inky pool of water, the rest of the cavern flooded and inaccessible. The water is still as death.',
			outdoors: false,
			exits: [
				{
					cmd: 'north',
					id: '1'
				}
			],
			playersInRoom: [],
			monsters: [],
			items: []
		},
        {
            id: '4',
            title: 'Dark Cavern',
            area: 'caverns',
			light: true,
            content: 'The caverns are pitch-black here. It\'s impossible to see even inches in front of yourself. Even with artificial light, it seems to sputter and die barely feet from your body. The air is so cold that it hurts.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '2'
                },{
                    cmd: 'south',
                    id: '5'
                },{
                    cmd: 'east',
                    id: '3'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: []
        },{
            id: '5',
            title: 'Broken Altar',
            area: 'caverns',
			light: true,
            content: 'This is the deepest part of the caverns. Here, far from the light of the sun, a cracked stone monolith stands alone, with a rusty, broken sword sticking out from the center. The air is so cold that it\s almost impossible to breathe, and the darkness is suffocating.',
            outdoors: false,
            exits: [
                {
                    cmd: 'west',
                    id: '4'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: [],
			events: [{
			    "id": 1,
			    "moveMod": 0,
			    "description": "When you touch the monolith, you feel a shudder of energy flow through your arm. For a moment, you can't move at all. Trapped against the stone, you feel something moving up behind you. Something dark, and massive. A claw slides against your back, and a hissing, sibilant voice whispers in your ear. 'Not many visit my altar anymore. You deserve a reward...a special reward.' The voice seems to sink into your mind, fill you, and the presence itself moves forward, and sinks into your body. You feel wrong. This body is so small. So weak, so...single. You were legion once. Then the feeling fades, but it leaves something behind. You have learned a dark ritual: the skill OROCHI.",
			    "repeatable": false,
			    "effect": function(player) {
			    	var orochi = {
			            "id": "orochi",
			            "display": "Orochi",
			            "mod": 0,
			            "train": 100,
			            "type": "spell",
			            "wait": 0,
			            "learned": true,
			            "prerequisites": {
			                "level": 1
			            }
			        };
			    	Character.addSkill(player, orochi);
			    }
			}]
        }
	]
};


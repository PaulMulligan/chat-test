'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
Character = require('../src/character').character,
World = require('../src/world').world;

module.exports = {
	name: 'Atlas Tower',
	id: 'atlas',
	type: 'city',
	levels: 'All',
	description: 'The starting tower.',
	reloads: 0,
	created: '',
	saved: '',
	author: 'Blue',
	messages: [
		{msg: 'The black walls glow for a moment with blue light, forming the pattern of a computer circuit.'},
		{msg: 'The storm outside the tower rumbles with thunder.'}
	],
	respawnOn: 8,
	rooms: [
		{
			id: '1',
			title: 'Atlas Reception',
			light: true,
			area: 'atlas',
			content: 'This is the reception room for Atlas Tower. Floor-to-ceiling windows look down onto the rainy city outside. The neon lights of the Atlas sign cast flickering colours on the shiny black surfaces of the room. Teleportation circles stand on a raised platform, with stairs leading down to the south.',
			outdoors: true,
			exits: [
				{
					cmd: 'south',
					id: '2'
				}
			],
			playersInRoom: [],
			monsters: [
				{
					name: 'Phobos',
					level: 15,
					short: 'Phobos',
					long: 'Phobos, the sleek, all-black panther creature, is sitting here and smiling',
					description: '',
					inName: 'Phobos',
					race: 'animal',
					id: 9,
					area: 'atlas',
					weight: 245,
					diceNum: 2,
					diceSides: 8,
					diceMod: 5,
					meleeRes: 10,
					str: 16,
					position: 'standing',
					attackType: 'bite',
					damRoll: 10,
					hitRoll: 10,
					ac: 20,
					wanderCheck: 38,
					itemType: 'mob',
					runOnAliveWhenEmpty: false,
					behaviors: [{
						module: 'phobos'
					}, {
						module: 'wander'
					}]
				}, {
                    name: 'Deimos',
                    level: 15,
                    short: 'Deimos',
                    long: 'Deimos, the sleek, all-black panther creature, is lounging here and grinning',
                    description: '',
                    inName: 'Deimos',
                    race: 'animal',
                    id: 9,
                    area: 'atlas',
                    weight: 245,
                    diceNum: 2,
                    diceSides: 8,
                    meleeRes: 10,
                    diceMod: 5,
                    str: 16,
                    position: 'standing',
                    attackType: 'bite',
                    damRoll: 10,
                    hitRoll: 10,
                    ac: 20,
                    wanderCheck: 38,
                    itemType: 'mob',
                    runOnAliveWhenEmpty: false,
                    behaviors: [{
                        module: 'phobos'
                    }, {
                        module: 'wander'
                    }]
                }
			],
			items: [{
				name: 'Monolith',
				short: 'a gleaming black monolith',
				long: 'A large black stone obelisk, gleaming and sinister, juts from the ground and is covered in running water here.',
				area: 'atlas',
				id: '112',
				waterSource: true,
				weight: 10000,
				itemType: 'ornament'
			}],
			beforeEnter: function(roomObj, fromRoom, target) {
				return true;
			},
			onEnter: function(roomObj, target) {
				
			}
		},
		{
			id: '2',
			title: 'Conference Hall',
			area: 'atlas',
			content: 'This massive circular room is floored and walled with gleaming smooth black marble. Many huge curved couches are arranged in the center, around glass coffee tables. The red leather is dark in the low light coming from the recessed lanterns on the ceiling.',
			outdoors: true,
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
			title: 'Dueling Hall',
			area: 'atlas',
			content: 'This long room has a recessed rectangular area in the center, where the ground glows with a green lattice. It is used to call up holographic monsters for training purposes.',
			outdoors: true,
			exits: [
				{
					cmd: 'west',
					id: '2'
				}
			],
			playersInRoom: [],
			monsters: [{
                name: 'Training Hologram',
                displayName: ['Flickering training hologram', 'Glowing training hologram'],
                level: 1,
                short: ['a black faceless hologram', 'a glowing training hologram'],
                long: [
                    'A training hologram. It looks like a black faceless humanoid '
                ],
                inName: 'A hologram',
                race: 'human',
                id: '6',
                area: 'atlas',
                weight: 120,
                position: 'standing',
                attackType: 'bite',
                ac: 4,
                hp: 60,
                chp: 13,
                gold: 1,
                size: {value: 2, display: 'very small'},
                itemType: 'mob',
                behaviors: []  
            }],
			items: []
		},
        {
            id: '4',
            title: 'Supply Room',
            area: 'atlas',
            content: 'The walls of this tall room are covered in steel shelves that slide up and down of their own accord, replenishing them with new stock seemingly at random.',
            outdoors: true,
            exits: [
                {
                    cmd: 'north',
                    id: '2'
                }
            ],
            playersInRoom: [],
            monsters: [],
            items: [{
                name: 'PN-THR Deck',
                displayName: 'PN-THR Deck',
                short: 'a cheap PN-THR deck',
                long: 'A PN-THR hacking deck is here. The PN-THR model is a cheap mass-produced arm-mounted computer.' ,
                area: 'atlas',
                id: '201',
                level: 1,
                itemType: 'weapon',
                weaponType: 'deck',
                material: 'iron', 
                diceNum: 1, 
                diceSides: 6,
                diceMod: 0,
                attackType: 'hack', 
                attackElement: '',
                combatStat: 'int',
                weight: 4,
                slot: 'hands',
                equipped: false,
                modifiers: {
                    damRoll: 2
                }
            },{
                name: 'Hornet Pistol',
                displayName: 'Hornet Pistol',
                short: 'a slim Hornet pistol',
                long: 'A Hornet brand pistol is here. The Hornet fires small stinging bolts of electricity.' ,
                area: 'atlas',
                id: '202',
                level: 1,
                itemType: 'weapon',
                weaponType: 'gun',
                material: 'iron', 
                diceNum: 2, 
                diceSides: 3,
                diceMod: 0,
                attackType: 'shoot', 
                attackElement: '',
                weight: 4,
                combatStat: 'dex',
                slot: 'hands',
                equipped: false,
                modifiers: {
                    damRoll: 2
                }
            },{
                name: 'Panzerhand',
                displayName: 'Panzerhand',
                short: 'an armored Panzerhand',
                long: 'A basic Panzerhand is here. Panzerhands are explosive armour-plated gloves.' ,
                area: 'atlas',
                id: '203',
                level: 1,
                itemType: 'weapon',
                weaponType: 'glove',
                material: 'iron', 
                diceNum: 1, 
                diceSides: 10,
                diceMod: 0,
                combatStat: 'con',
                attackType: 'punch', 
                attackElement: '',
                weight: 4,
                slot: 'hands',
                equipped: false,
                modifiers: {
                    damRoll: 1
                }
            }]
        }
	]
};


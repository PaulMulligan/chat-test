'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
Character = require('../src/character').character,
World = require('../src/world').world;

module.exports = {
	name: 'Overworld',
	id: 'overworld',
	type: 'macro',
	levels: 'All',
	description: 'The world as seen by giants.',
	reloads: 0,
	created: '',
	saved: '',
	author: 'Blue',
	messages: [
		{msg: 'The creatures beneath you look like ants.'},
		{msg: 'A cloud wafts against your cheek.'}
	],
	respawnOn: 8,
	rooms: [
		{
			id: '1',
			title: 'Far Above Dormaus',
			light: true,
			area: 'overworld',
			content: 'The town of Dormaus is just a tiny cluster of little colours around your feet and toes. It would be so easy to just lift one foot and crush the entire town in a single step. For some reason, however, you find yourself unwilling to do so.',
			outdoors: false,
			overworld: {"area": "dormaus", "roomid": "1"},
			exits: [
				{
					cmd: 'south',
					id: '2'
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
			title: 'Above A Farm',
			area: 'overworld',
			light: true,
			overworld: {"area": "farm", "roomid": "1"},
			content: 'There is a tiny little farm beneath your feet. Your footprints leave massive grooves in the tiny fields, and animals scurry around your toes.',
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
		}
	]
};


'use strict';
var Cmd = require('../src/commands').cmd,
Room = require('../src/rooms').room,
World = require('../src/world').world;

/*
	Phobos and Deimos wander around, acting sinister.
*/
module.exports = { 
	exclamations: [
		'The night is dark here, isn\'t it?',
		'Sometimes I do so miss my home. But this world has so many living things...',
		'How do you manage on two legs? You\'d be much happier with four.',
		'There\'s someone behind you.'
	],
	emotes: [
	    'giggles at nothing.',
	    'stares out of the window into the <span class="grey">night</span>.',
	    'stares at you with unblinking eyes',
	    'twists its long neck and grins at you'
    ],
    moveDirections: ['north', 'east', 'west', 'south'],
	wanderCheck: 3,
	onAlive: function(mob, roomObj) {
		var roll = World.dice.roll(1, 40);

		if (mob.position === 'standing') {
			if (roll === 5) {
				Cmd.emote(mob, {
					msg: mob.emotes[parseInt(Math.random() * ((this.emotes.length)))],
					roomObj: roomObj
				});
			} else if (roll === 1 && roomObj.playersInRoom.length) {
				// Most of the time we just proclaim something
				Cmd.say(mob, {
					msg: mob.exclamations[parseInt(Math.random() * ((this.exclamations.length)))],
					roomObj: roomObj
				});
			}
		}
	}
};

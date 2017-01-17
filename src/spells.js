'use strict';
var World = require('./world').world,
Character = require('./character').character,
Spell = function() {};

/*
* Damage Spells
*/
Spell.prototype.spark = function(skillObj, player, opponent, roomObj, command, fn) {
	var intMod,
	cost = 2,
	damage = 0;
	
	if (cost < player.cmana) {
		intMod = World.dice.getIntMod(player);

		if (World.dice.roll(1, 100) <= skillObj.train) {
			player.wait += 2;
			player.cmana -= (cost - intMod);

			damage = World.dice.roll(player.level / 2 + 1, 20 + intMod + player.mana/20, intMod);
			damage -= opponent.magicRes;
			damage -= opponent.ac/2;

			opponent.chp -= damage;

			World.msgPlayer(player, {
				msg: 'You cast spark and a series of crackling '
					+ '<span class="blue">bright blue sparks</span> burn ' + opponent.displayName 
					+ ' with maiming intensity! (' + damage + ')',
				noPrompt: true
			});

			World.msgPlayer(opponent, {
				msg: player.displayName + ' casts  spark and burns you ' 
					+ opponent.displayName + ' with maiming intensity! (' + damage + ')'
			});
		} else {
			// spell failed
			World.msgPlayer(player, {
				msg: 'You try to channel the spell but only get '
					+ '<span class="blue">sparks and a series of crackling sounds!</span>',
			});
		}

		return fn(player, opponent, roomObj, command);
	} else {
		World.msgPlayer(player, {
			msg: 'You dont have enough mana to cast spark!',
			styleClass: 'error'
		});
	}
};

/*
* Passive vision-oriented Spells
*/

Spell.prototype.detectInvis = function(skillObj, player, roomObj, command, fn) {
	var intMod = World.dice.getIntMod(player),
	failRoll,
	successRoll,
	// Check if we already have this passive 
	// false if we dont have the affect otherwise the affect object
	currentAffect,
	cost = 1;

	if (1 > 0) {
		console.log('here');
	} else {

	}
};

Spell.prototype.detectHidden = function(skillObj, player, roomObj, command, fn) {
	var intMod,
	chanceRoll = World.dice.roll(1, 100),
	failMsg = 'Your eyes flicker blue as you <strong>fail to cast detect hidden</strong>.',
	successMsg = 'Your eyes shine bright blue as you become more aware of your surroundings!',
	roomMsg =  player.possessivePronoun + ' eyes shine bright blue as you become more aware of your surroundings!',
	oppSuccessMsg = player.displayName + ' tries to cast a spell and fails.',
	alreadyAffectedMsg = 'You are already experiencing increased awareness.',
	currentlyAffected = Character.getAffect(player, 'detectHidden'),
	timer = 1,
	cost = 1;

	if (!currentlyAffected) {
		if (World.dice.roll(1, 100) <= skillObj.train && chanceRoll > 2) {
			intMod = World.dice.getIntMod(player);

			if (player.mainStat === 'int') {
				intMod += 1;
			}

			if (chanceRoll === 100) {
				intMod += 2;
			}

			timer += World.dice.roll(1, intMod);

			World.addAffect(player, {
				id: skillObj.id,
				affect: 'hidden',
				display: 'Detect Hidden',
				caster: player.refId,
				modifiers: null,
				decay: timer
			});

			World.msgPlayer(player, {
				msg: successMsg
			});

			World.msgRoom(roomObj, {
				msg: roomMsg,
				playerName: player.name
			});

			if (opponent.isPlayer && opponent.refId !== player.refId) {
				World.msgPlayer(opponent, {
					msg: oppSuccessMsg
				});
			}
		} else {
			World.msgPlayer(player, {
				msg: failMsg
			});
		}
	} else {
		World.msgPlayer(player, {
			msg: alreadyAffectedMsg
		});
	}
};

Spell.prototype.invisibility = function(skillObj, player, roomObj, command, fn) {
	var intMod = World.dice.getIntMod(player),
	failRoll,
	successRoll,
	// Check if we already have this passive 
	// false if we dont have the affect otherwise the affect object
	currentAffect,
	cost = 1;

	if (1 > 0) {
		console.log('here');
	} else {

	}
};

/*
* Healing Spells
*/
Spell.prototype.cureLight = function(skillObj, player, opponent, roomObj, command, fn) {
	var intMod,
	wisMod,
	cost = 2,
	healing = 0,
	chanceRoll = World.dice.roll(1, 100),
	manaFailMsg = 'Not enough mana to cast ' + skillObj.display,
	failMsg = 'Your eyes flicker blue as you <strong>fail to cast ' + skillObj.display + '</strong>.',
	successMsg = '',
	roomMsg =  '',
	wait = 2;

	if (skillObj.wait) {
		wait = skillObj.wait;
	}
	
	if (cost < player.cmana) {
		if (World.dice.roll(1, 100) <= skillObj.train && chanceRoll > 2) {
			if (opponent.refId === player.refId) {
				successMsg = 'Your eyes shine as you channel your powers to make yourself feel a bit better!';
			} else {
				successMsg = 'You channel your powers into your own body by placing your hand on your '
				+ ' forehead. You feel a bit better.';
			}

			roomMsg = player.possessivePronoun + ' eyes become clouded as they as they lay their ' + player.handsNoun
				+ 's upon ' + opponent.displayName + '.';

			if (opponent.refId !== player.refId) {
				roomMsg = player.possessivePronoun + ' eyes turn a cloudy white as he places his '
					+ player.handsNoun +  's on ' + opponent.displayName + '.';
			} else {
				roomMsg = player.possessivePronoun + ' reaches for their head whole their eyes turn a cloudy white. They seem reinvigorated.';
			}

			if (player.mainStat === 'wis') {
				healing = World.dice.roll(1, player.level, skillObj.mod);

				if (chanceRoll > 75) {
					cost -= 1;
				}
			} else if (player.mainStat === 'str') {
				cost += 1;
				wait += 2;
			}

			intMod = World.dice.getIntMod(player);
			
			wisMod = World.dice.getWisMod(player);

			if (skillObj.mod) {
				wisMod += World.dice.roll(1, skillObj.mod);

				intMod += World.dice.roll(1, skillObj.mod);
			}

			player.wait += wait;
			player.cmana -= cost;

			if (opponent.chp > opponent.hp) {
				opponent.chp = opponent.hp;
			}

			if (chanceRoll === 100) {
				healing += World.dice.roll(1, healing/3);
			}

			healing = World.dice.roll(player.level / 2 + 1, 20 + intMod + player.mana / 40, wisMod) + skillObj.mod;

			opponent.chp += healing;

			if (opponent.chp > opponent.hp) {
				opponent.chp = opponent.hp;
			}

			World.msgPlayer(player, {
				msg: successMsg
			});

			if (roomMsg) {
				World.msgRoom(roomObj, {
					msg: roomMsg,
					playerName: player.name
				});
			}
		} else {
			World.msgPlayer(player, {
				msg: failMsg
			});
		}

		if (fn) {
			return fn(player, opponent, roomObj, command);
		}
	} else {
		World.msgPlayer(player, {
			msg: manaFailMsg,
			styleClass: 'error'
		});

		if (fn) {
			return fn(player, opponent, roomObj, command);
		}
	}
};

/*
 * Madbomb Spells
 */

Spell.prototype.blast = function(skillObj, player, opponent, roomObj, command, fn) {
    var conMod,
    cost = 0,
    damage = 0;
    
    conMod = World.dice.getConMod(player);

    if (World.dice.roll(1, 100) <= skillObj.train) {
        
        damage = World.dice.roll(player.level / 2 + 1, 20 + conMod + player.mana/20, conMod);
        damage -= opponent.magicRes;
        damage -= opponent.ac/2;
        damage = Math.floor(damage*1.5);
        var playerDamage = Math.floor(damage/3);
        
        opponent.chp -= damage;
        player.chp -= playerDamage;
        
        World.msgPlayer(player, {
            msg: 'You pound your belly, your body glowing as your explosive power builds and grows. Finally, your whole body erupts with fire and power in a '
                + '<span class="red">MASSIVE BANG</span> as ' + opponent.displayName 
                + ' is blasted away! (' + damage +'). The blowback hurts you for (' + playerDamage + ')',
            noPrompt: true
        });

        World.msgPlayer(opponent, {
            msg: player.displayName + ' suddenly begins to glow and swell, before they explode in a <span class="red">MASSIVE BANG</span>! ' 
                + opponent.displayName + ' is blasted across the room!'
        });
        
    } else {
        // spell failed
        World.msgPlayer(player, {
            msg: 'You feel your explosion welling up, but then it splutters and fades!',
        });
    }

    return fn(player, opponent, roomObj, command);
};

/*
 * Origamist Spells
 */

Spell.prototype.fold = function(skillObj, player, opponent, roomObj, command, fn) {
    var cost = 2;
    
    if (Character.countItemType(player, 'card') >= 3) {
        World.msgPlayer(player, {
            msg: 'You can only have three paper creatures in your hand!',
            styleClass: 'error'
        });
    } else if (cost < player.cmana) {
        player.cmana -= cost;
        player.wait += 5;
        var cardRoll = World.dice.roll(1, 1);
        if (cardRoll == 1) {
            World.msgPlayer(player, {
                msg: 'You flick and twists your hands like a magician, and a paper creature appears on your palm with a  '
                    + '<span class="yellow">golden glow</span>. It\'s the Paper Tiger!',
                noPrompt: true
            });
            
            var item = {
                name: 'Paper Tiger', 
                short: 'a folded paper tiger',
                long: 'A folded piece of paper in the shape of a noble tiger. Paper Tiger is a weak attacking origami' ,
                area: 'atlas',
                id: '501',
                level: 1,
                itemType: 'card',
                material: 'paper',
                weight: 0,
                value: 0,
                beforeDrop: function(item, roomObj) {
                    return false;
                }
            }
            
            item = World.extend(item, JSON.parse(JSON.stringify(World.itemTemplate)));
                
            Character.addItem(player, item);
        }
        

        return fn(player, opponent, roomObj, command);
    } else {
        World.msgPlayer(player, {
            msg: 'You dont have enough focus to fold!',
            styleClass: 'error'
        });
    }
};

Spell.prototype.tiger = function(skillObj, player, opponent, roomObj, command, fn) {
    var dexMod,
    cost = 0,
    damage = 0;
    
    var tigercard = Character.getFirstItemById(player, '501');
    
    if (!tigercard) {
        World.msgPlayer(player, {
            msg: 'You don\'t have that origami!',
            styleClass: 'error'
        });
    } else if (cost <= player.cmana) {
        dexMod = World.dice.getDexMod(player);

        if (World.dice.roll(1, 100) <= skillObj.train) {
            
            damage = World.dice.roll(player.level / 2 + 1, 20 + dexMod + player.mana/20, dexMod);
            damage -= opponent.magicRes;
            damage -= opponent.ac/2;

            opponent.chp -= damage;
            
            World.msgPlayer(player, {
                msg: 'You wave your hand, and the paper tiger leaps from your palm, growing as it flies through the air. It snarls and raises it\s mighty '
                    + '<span class="yellow">golden paws</span> as ' + opponent.displayName 
                    + ' is slashed! (' + damage +')',
                noPrompt: true
            });

            World.msgPlayer(opponent, {
                msg: player.displayName + ' releases a growing paper tiger from their hand, and ' 
                    + opponent.displayName + ' is slashed by <span class="yellow">golden claws</span>!'
            });
            
            Character.removeItem(player, tigercard);
        } else {
            // spell failed
            World.msgPlayer(player, {
                msg: 'You fail to call the spirit of the tiger, and it remains lifeless in your hand!',
            });
        }

        return fn(player, opponent, roomObj, command);
    } else {
        World.msgPlayer(player, {
            msg: 'You dont have enough focus to use this skill!',
            styleClass: 'error'
        });
    }
};

/*
 * Hacker Spells
 */
Spell.prototype.hack = function(skillObj, player, opponent, roomObj, command, fn) {
    var intMod,
    cost = 0,
    damage = 0;
    
    if (cost < player.cmana) {
        intMod = World.dice.getIntMod(player);

        if (World.dice.roll(1, 100) <= skillObj.train) {
            player.wait += 2;
            if ((cost - intMod) > 0) {
                player.cmana -= (cost - intMod);
            }

            opponent.affects.push({
                id: 'hacked',
                affect: 'Hacked',
                decay: 10,
                decayMsg: opponent.displayName + ' shakes off the hack!'
            });
            
            World.msgPlayer(player, {
                msg: 'Your fingers clatter across your deck as you engage the hack, causing your deck to '
                    + '<span class="blue">glow blue </span> as ' + opponent.displayName 
                    + ' is compromised! ',
                noPrompt: true
            });

            World.msgPlayer(opponent, {
                msg: player.displayName + ' enters code into their deck with blinding speed, and ' 
                    + opponent.displayName + ' is hacked!'
            });
        } else {
            // spell failed
            World.msgPlayer(player, {
                msg: 'You fumble your code, and your deck emits '
                    + '<span class="blue">sparks and a series of crackling sounds!</span>',
            });
        }

        return fn(player, opponent, roomObj, command);
    } else {
        World.msgPlayer(player, {
            msg: 'You dont have enough focus to hack!',
            styleClass: 'error'
        });
    }
};

Spell.prototype._execute = function(skillObj, player, opponent, roomObj, command, fn) {
    var intMod,
    cost = 5,
    damage = 0;
    
    if (!Character.hasAffect(opponent, 'hacked')) {
        World.msgPlayer(player, {
            msg: 'You can only execute your exploit on a hacked opponent!',
            styleClass: 'error'
        });
    } else if (cost <= player.cmana) {
        intMod = World.dice.getIntMod(player);

        if (World.dice.roll(1, 100) <= skillObj.train) {
            player.wait += 2;
            if ((cost - intMod) > 0) {
                player.cmana -= (cost - intMod);
            }
            
            damage = World.dice.roll(player.level / 2 + 1, 20 + intMod + player.mana/20, intMod);
            damage -= opponent.magicRes;
            damage -= opponent.ac/2;

            opponent.chp -= damage;
            
            World.msgPlayer(player, {
                msg: 'With a flourish, you tap in the execution code for your exploit. There is a pause, then a sudden '
                    + '<span class="blue">explosion of blue light</span> as ' + opponent.displayName 
                    + ' is devastated from within! (' + damage +')',
                noPrompt: true
            });

            World.msgPlayer(opponent, {
                msg: player.displayName + ' executes a command on their deck, and ' 
                    + opponent.displayName + ' is devastated by an <span class="blue">explosion of blue light</span>!'
            });
        } else {
            // spell failed
            World.msgPlayer(player, {
                msg: 'You enter the wrong command on your deck, and instead of executing the attack, your deck makes a loud error sound!',
            });
        }

        return fn(player, opponent, roomObj, command);
    } else {
        World.msgPlayer(player, {
            msg: 'You dont have enough focus to use this skill!',
            styleClass: 'error'
        });
    }
};


/*
* Dorky Spells
*/
Spell.prototype.ensheep = function(skillObj, player, opponent, roomObj, command, fn) {
    var intMod,
    wisMod,
    cost = 0,
    healing = 0,
    chanceRoll = World.dice.roll(1, 100),
    manaFailMsg = 'Not enough mana to cast ' + skillObj.display,
    failMsg = 'Your eyes flicker blue as you <strong>fail to cast ' + skillObj.display + '</strong>.',
    successMsg = '',
    roomMsg =  '',
    wait = 2;

    if (skillObj.wait) {
        wait = skillObj.wait;
    }
    
    if (opponent.refId === player.refId) {
        successMsg = 'Your cast ensheep on yourself! You turn from ' + opponent.race + ' to sheep!';
    } else {
        successMsg = 'You cast ensheep on the ' + opponent.race + ' ' + opponent.displayName + '.';
    }
    
    if (opponent.refId !== player.refId) {
        roomMsg = player.possessivePronoun + ' casts ensheep on ' + opponent.displayName + '.';
    } else {
        roomMsg = player.possessivePronoun + ' casts ensheep on themselves.';
    }
    
    opponent.race = 'sheep';
    opponent.attackType = 'bleat';
    
    World.msgPlayer(player, {
        msg: successMsg
    });

    if (roomMsg) {
        World.msgRoom(roomObj, {
            msg: roomMsg,
            playerName: player.name
        });
    }
};

Spell.prototype.orochi = function(skillObj, player, opponent, roomObj, command, fn) {
    var intMod,
    cost = 0,
    damage = 0;
    
    if (Character.hasAffect(player, 'hydra')) {
        Character.createHydra(player, opponent);
    } else if (!opponent.isPlayer){
        World.msgPlayer(player, {
            msg: 'The energy of the hydra finds this vessel unworthy!',
            styleClass: 'error'
        });
    } else {
        opponent.affects.push({
            id: 'hydra',
            affect: 'Hydra Energy',
            decay: 2,
            decayMsg: opponent.displayName + ' feels independant again.'
        });
        World.msgPlayer(player, {
            msg: 'You summon a spectre of the hydra, and a glowing energy shaped like a winding snake flows into the body of '
                + opponent.displayName + ', leaving them with a strange sensation of missing something important...',
            noPrompt: true
        });

        World.msgPlayer(opponent, {
            msg: player.displayName + ' summons a glowing flow of energy, shaped like a sinister snake. It flies into you, '
            + 'and you feel as though you are missing something important...'
        });
    }
};

module.exports.spells = new Spell();


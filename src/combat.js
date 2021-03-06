'use strict';
var World = require('./world').world,
Character = require('./character').character,
Room = require('./rooms').room,	
Combat = function() {
	this.adjective = [
		{value: ['weak', 'hardly any'], damage: 5},
		{value: 'some', damage: 10},
		{value: 'directed', damage: 15},
		{value: 'maiming', damage: 20},
		{value: 'great', damage: 40},
		{value: 'demolishing', damage: 50},
		{value: '<span class="green">~~***<strong class="red">DEVASTATING</strong>***~~</span>', damage: 60}
	];

	this.abstractNouns = ['intensity', 'force', 'strength', 'power', 'might', 'effort', 'energy'];
},
Skill;

/*
* Starting combat, begin() much return true and the target node for a fight to continue
* otherwise both parties are left in the state prior. Beginning combat does not add Wait.
*/
Combat.prototype.getNumberOfAttacks = function(attacker, weapon, attackerMods, opponentMods) {
	var numOfAttacks = Math.round(((attacker.hitRoll/5 + attacker.level/20) + attackerMods.dex/4) - 1),
	secondAttackSkill = Character.getSkillById(attacker, 'secondAttack');

	if (numOfAttacks <= 0) {
		numOfAttacks = 1;
	}
	
	if (weapon.modifiers && weapon.modifiers.numOfAttacks) {
		numOfAttacks += weapon.modifiers.numOfAttacks;
	}

	if (attacker.knowledge > opponentMods.str && World.dice.roll(1, 2) === 1) {
		numOfAttacks += 1;
	}

	if (numOfAttacks <= 3 && attackerMods.str > opponentMods.dex) {
		if (World.dice.roll(1, 2) === 2) {
			numOfAttacks += 1;
		}
	}

	if (numOfAttacks <= 3 && attackerMods.dex > opponentMods.dex) {
		if (World.dice.roll(1, 2) === 2) {
			numOfAttacks += 1;
		}
	}
	
	if (secondAttackSkill) {
		numOfAttacks += Skill.secondAttack(secondAttackSkill, attacker);
	} else if (numOfAttacks === 1 && World.dice.roll(1, 6) === 4) {
		numOfAttacks = 2;
	}

	return numOfAttacks;
};

Combat.prototype.attack = function(attacker, opponent, roomObj, fn) {
	var combat = this,
	weaponSlots,
	shieldSlots,
	attackerMods = World.dice.getMods(attacker),
	opponentMods = World.dice.getMods(opponent),
	numOfAttacks,
	i = 0,
	j = 0,
	msgForAttacker = '',
	msgForOpponent = '',
	roomRoundTxt = '',
	damage = 0,
	dodged = false,
	blocked = false,
	adjective,
	abstractNoun,
	weapon,
	shield,
	shieldAC = 0,
	hitRoll = World.dice.roll(attacker.diceNum, attacker.diceSides, attacker.hitRoll + attackerMods.dex + World.dice.roll(1, 10)),
	damRoll	= World.dice.roll(attacker.diceNum, attacker.diceSides, attacker.damRoll + attackerMods.str + attacker.level),
	criticalAttackXP,
	criticalAttack = false,
	dodgeCheck = World.dice.roll(opponent.diceNum, opponent.diceSides, opponentMods.dex + opponent.detection + opponent.awareness/2 + (attacker.size.value - opponent.size.value)),
	acCheck = World.dice.roll(opponent.diceNum, opponent.diceSides, opponent.ac + opponentMods.dex + opponent.level) + World.dice.roll(1, 10),
	attackerCanSee = Character.canSee(attacker, roomObj),
	opponentCanSee = Character.canSee(opponent, roomObj);

	if (hitRoll < 0) {
		hitRoll = attacker.level;
	}

	if (damRoll < 0) {
		damRoll = attacker.level;
	}

	if (attacker.wait > 0) { 
		attacker.wait -= 1;
	} else {
		attacker.wait = 0;
	}
	
	if (attacker.position === 'fighting') {
		weaponSlots = Character.getWeaponSlots(attacker);

		if (opponent.position === 'fighting') {
			shieldSlots = Character.getSlotsWithShields(opponent);

			if (shieldSlots.length > 0) {
				shield = shieldSlots[0].item;
			}
		}
		
		for (i; i < weaponSlots.length; i += 1) {
			if (weaponSlots[i].item) {
				weapon = Character.getItemByRefId(attacker, weaponSlots[i].item);
			} else if (!weapon && !weaponSlots[i].item) {
				weapon = Character.getFist(attacker);
			}
			
			numOfAttacks = combat.getNumberOfAttacks(attacker, weapon, attackerMods, opponentMods);
			
			if (numOfAttacks) {
				j = 0;

				for (j; j < numOfAttacks; j += 1) {
					if (shield) {
						shieldAC = Skill.shieldBlock(Character.getSkillById(opponent, 'shieldBlock'), opponent, roomObj, shield);

						acCheck += shieldAC;
					}

					if (opponent.vulnerableTo && opponent.vulnerableTo.toString().indexOf(weapon.attackType) !== -1) {
						damage += World.dice.roll(1, 4 + weapon.level);
					}

					if (opponent.resistantTo && opponent.resistantTo.toString().indexOf(weapon.attackType) !== -1) {
						damage -= World.dice.roll(1, 4 + weapon.level);
					}
					
					if (Character.hasAffect(attacker, 'hacked') && (World.dice.roll(1,10) == 1)) {
					    if (attacker.isPlayer) {
		                    msgForAttacker +=  '<div class="grey">You are hacked! Everything swims and looks like pixels...</div>';
		                }

		                if (opponent.isPlayer) {
		                    msgForOpponent +=  '<div class="grey">' + attacker.displayName + ' is hacked and cannot focus! </div>';
		                }
					} else if (acCheck < hitRoll) {
						if (dodgeCheck < hitRoll) {
							damage = World.dice.roll(weapon.diceNum, weapon.diceSides, attacker.damRoll + weapon.diceMod + attackerMods[weapon.combatStat]);
							
							damage += (attacker.level/2) + (attackerMods[weapon.combatStat]/4);

							if (attackerMods.str >= opponentMods.con) {
								damage += damRoll/3;
							}
	
							damage -= opponent.ac/2;
							damage -= opponent.meleeRes;
			
							if (numOfAttacks > 3 && j > 3) {
								damage = damage/2;
							}

							if (World.dice.roll(1, 200) >= (200 - attacker.detection)) {
								criticalAttack = true;
								criticalAttackXP = World.dice.roll(1 + attacker.level, 20);

								attacker.exp += criticalAttackXP;
								
								damage = (damage * 3) + attacker.str;
							}

							if (damage < 0) {
								damage = attackerMods.str;
							} else {
								damage = Math.round(damage);
							}

							adjective = combat.getDamageAdjective(damage);
							
							abstractNoun = combat.abstractNouns[World.dice.roll(1, combat.abstractNouns.length) - 1];

							opponent.chp -= damage;

							if (attacker.isPlayer) {
								if (!criticalAttack) {
									if (attackerCanSee) {
										msgForAttacker += '<div>You ' + weapon.attackType + ' ' + opponent.short 
											+ ' with ' + adjective + ' ' + abstractNoun + ' <strong class="red">('
											+ damage + ')</strong></div>';
									} else {
										msgForAttacker += '<div>You ' + weapon.attackType + ' <strong>something</strong> '  
											+ ' with ' + adjective + ' ' + abstractNoun + ' <strong class="red">('
											+ damage + ')</strong></div>';
									}
								} else {
									if (attackerCanSee) {
										msgForAttacker += '<div>You ' + weapon.attackType + ' ' + opponent.short 
											+ ' with ' + adjective + ' ' + abstractNoun + ' <strong class="red">('
											+ damage + ')</strong></div>'
											+ '<div class="green">You landed a critical hit and gain '
											+ criticalAttackXP + ' experience.</div>';
									} else {
										msgForAttacker += '<div>You ' + weapon.attackType
											+ ' someone with ' + adjective + ' ' + abstractNoun + ' <strong class="red">('
											+ damage + ')</strong></div>'
											+ '<div class="green">You landed a critical hit and gain '
											+ criticalAttackXP + ' experience.</div>';
									}

									if (attacker.onExp) {
										attacker.onExp(criticalAttackXP);
									}
								}
							}

							if (opponent.isPlayer) {
								if (!criticalAttack) {
									if (attackerCanSee) {
										msgForOpponent += '<div class="grey">' + attacker.possessivePronoun + ' ' 
											+ weapon.attackType + ' hits you with ' + adjective + ' ' + abstractNoun
											+ ' <span class="red">(' + damage + ')</span></div>';
									} else {
										msgForOpponent += '<div class="grey">Someones ' + weapon.attackType 
											+ ' hits you with ' + adjective + ' ' + abstractNoun
											+ ' <span class="red">(' + damage + ')</span></div>';
									}
								} else {
									if (attackerCanSee) {
										msgForOpponent += '<div class="grey"><strong>' + attacker.possessivePronoun + ' ' 
											+ weapon.attackType + ' hits you with ' + adjective + ' ' + abstractNoun
											+ '</strong> <span class="red">(' + damage + ')</span></div>';
									} else {
										msgForOpponent += '<div class="grey"><strong>Someones ' + weapon.attackType 
											+ ' hits you with ' + adjective + ' ' + abstractNoun
											+ '</strong> <span class="red">(' + damage + ')</span></div>';
									}
								}
							}
						} else {
							if (attacker.isPlayer) {
								if (World.dice.roll(1, 2) === 1) {
									msgForAttacker += '<div class="red">You lunge at '
										+ opponent.short + ' and miss!</div>';
								} else {
									msgForAttacker += '<div class="red">You swing at '
										+ opponent.short + ' with <strong>' + weapon.short + '</strong> and miss!</div>';	
								}
							}

							if (opponent.isPlayer) {
								if (World.dice.roll(1, 2) === 1) {
									msgForAttacker += '<div class="green">' + attacker.capitalShort
										+ ' tries to attack but you dodge at the last minute!</div>';
								} else {
									msgForAttacker += '<div class="green">' + attacker.capitalShort
										+ ' lunges and you with ' + weapon.short +  ' and misses!</div>';
								}
							}
						}
					} else {
						if (attacker.isPlayer) {
							if (!shield) {
								if (World.dice.roll(1, 2) === 1) {
									msgForAttacker += '<div class="red">You try to attack ' + opponent.short
										+ ' and they block your attack!</div>';
								} else {
									msgForAttacker += '<div class="red">You try to attack ' + opponent.short
										+ ' with ' + weapon.short + ' but they narrowly avoid the attack!</div>';
								}
							} else {
								if (World.dice.roll(1, 2) === 1) {
									msgForAttacker += '<div class="red">You try to attack ' + opponent.short
										+ ' and they block the incoming attack with ' + shield.short + '!</div>';
								} else {
									msgForAttacker += '<div class="red">You swing at ' + opponent.short
										+ ' but they use their ' + shield.displayName + ' to defend against the attack!</div>';
								}
							}
						}

						if (opponent.isPlayer) {
							if (!shield) {
								msgForOpponent += '<div class="green">' + attacker.capitalShort +
								' swings widly and you narrowly block their attack!</div>';
							}
						}
					}
				}
			} else {
				if (attacker.isPlayer) {
					msgForAttacker +=  '<div class="grey">Your ' + weapon.attackType + ' misses a '
						+ opponent.displayName + '</div>';
				}

				if (opponent.isPlayer) {
					msgForOpponent +=  '<div class="grey">' + attacker.displayName + ' tries to '
						+ weapon.attackType + ' you and misses! </div>';
				}
			}

			return fn(attacker, opponent, roomObj, msgForAttacker, msgForOpponent, attackerCanSee);
		}
	}
};

Combat.prototype.getDamageAdjective = function(damage) {
	var i = 0,
	value,
	damLevel = damage / this.adjective[i].damage * 100;

	for (i; i < this.adjective.length; i += 1) {
		if (this.adjective[i].damage >= damage) {	
			if (!Array.isArray(this.adjective[i].value)) {
				value = this.adjective[i].value;
			} else {
				value = this.adjective[i].value[World.dice.roll(1, this.adjective[i].value.length) - 1];
			}
	
			if (damage > 10) {
				if (damLevel === 100) {
					return '**' + value.toUpperCase() + '**';	
				} else if (damLevel >= 80) {
					return value.toUpperCase();
				} else {
					return value;
				}
			} else {
				return value;
			}	
		}
	}

	return this.adjective[1].value;
};

Combat.prototype.processFight = function(player, opponent, roomObj, fn) {
	var combat = this,
	oppStatus,
	playerStatus,
	msgForPlayer,
	msgForOpponent;

	opponent.position = 'fighting';

	if (!opponent.opponent) {
		opponent.opponent = player;
	}

	player.position = 'fighting';
	
	if (!player.opponent) {
		player.opponent = opponent;
	}

	if (!Skill) {
		Skill = require('./skills').skills;
	}
	
	combat.attack(player, opponent, roomObj, function(player, opponent, roomObj, msgForPlayer, msgForOpponent, attackerCanSee) {
		var oppStatus = Character.getStatusReport(opponent),
		playerStatus = Character.getStatusReport(player),
		preventPrompt = false,
		combatInterval;

		player.wait += 1;

		if (opponent.chp > 0) {
			if (!opponent.isPlayer) {	
				msgForPlayer += '<div class="rnd-status">' + opponent.capitalShort + ' ' + oppStatus.msg + '</div>';
			} else {
				msgForPlayer += '<div class="rnd-status">' + opponent.displayName + ' ' + oppStatus.msg + '</div>';
			}
		} else {
			if (!opponent.isPlayer) {
				if (attackerCanSee) {	
					msgForPlayer += '<div class="rnd-status">You <strong class="red">decapitate ' 
						+ opponent.short + '</strong>.</div>';
				}
			} else {
				if (attackerCanSee) {
					msgForPlayer += '<div class="rnd-status">You run <strong>' 
						+ opponent.displayName + ' through, killing them</strong>.</div>';
				}
			}
		}

		if (opponent.isPlayer) {
			msgForOpponent += '<div class="rnd-status">' + player.displayName + ' ' + playerStatus.msg + '</div>';
		}

		if (player.chp <= 0 || opponent.chp <= 0) {
			preventPrompt = true;
		}

		World.msgPlayer(player, {
			msg: msgForPlayer,
			noPrompt: preventPrompt,
			styleClass: 'player-hit warning'
		});

		World.msgPlayer(opponent, {
			msg: msgForOpponent,
			noPrompt: preventPrompt,
			styleClass: 'player-hit warning'
		});

		if (opponent.chp > 0) {
			combatInterval = setInterval(function() {
				combat.round(combatInterval, player, opponent, roomObj);
			}, 1900);
		} else {
			combat.processEndOfCombat(null, player, opponent, roomObj);
		}
	});
};

Combat.prototype.processEndOfCombat = function(combatInterval, player, mob, roomObj)  {
	var exp = 0,
	corpse,
	endOfCombatMsg = '',
	respawnRoom;

	if (combatInterval) {
		clearInterval(combatInterval);
	}

	if (mob.chp <= 0) {
		mob.opponent = null;
		mob.killedBy = player.name;
		
		player.opponent = null;
		player.position = 'standing';

		World.processEvents('onDeath', roomObj, mob, player);
		World.processEvents('onDeath', mob, roomObj, player);
		World.processEvents('onVictory', player, roomObj, mob);

		corpse = Character.createCorpse(mob);

		if (!mob.isPlayer) {
			Room.removeMob(roomObj, mob);
		} else {
			respawnRoom = World.getRoomObject(mob.recall.area, mob.recall.roomid);
			
			Room.removePlayer(roomObj, mob);
		
//			mob.items = [];
			mob.position = 'standing';
			
			respawnRoom.playersInRoom.push(mob);

			mob.roomid = respawnRoom.id;
			mob.area = respawnRoom.area;
			mob.chp = 1;
			mob.cmana = 1;
			mob.cmv = 7;
		
			World.msgPlayer(mob, {
				msg: '<strong>You black out, and awaken with a splitting headache under the neon glow of the reception room.</strong>',
				styleClass: 'error'
			});
		}

		exp = World.dice.calExp(player, mob);

//		Room.addItem(roomObj, corpse);
		
		if (exp > 0) {
			player.exp += exp;
			
			if (World.dice.roll(1, 2) === 1) {
				endOfCombatMsg = 'You won the fight! You learn some things resulting in <strong>'
					+ exp + ' experience points</strong>.';
			} else {
				endOfCombatMsg = '<strong>You are victorious! You earn <span class="red">'
					+ exp + '</span> experience points!';
			}
		} else {
			if (World.dice.roll(1, 2) === 1) {
				endOfCombatMsg = 'You won but learned nothing.';
			} else {
				endOfCombatMsg = 'You did not learn anything from the fight.';
			}
		}

		if (mob.gold) {
			player.gold +- mob.gold;

			endOfCombatMsg += ' <span class="yellow">You find ' + mob.gold 
				+ ' ' + World.config.coinage  + ' on the corpse.</span>';
		}
		
		if (player.wait > 0) {
			player.wait -= 1;
		} else {
			player.wait = 0;
		}

		player.killed += 1;

		if (player.exp >= player.expToLevel) {
			World.msgPlayer(player, {
				msg: endOfCombatMsg,
				noPrompt: true,
				styleClass: 'victory'
			});
		
			Character.level(player);	
		} else {
			World.msgPlayer(player, {
				msg: endOfCombatMsg,
				styleClass: 'victory'
			});
		}
	}
};

Combat.prototype.round = function(combatInterval, player, opponent, roomObj, fn) {
	var combat = this;
	
	if (!opponent.opponent) {
		opponent.opponent = player;
	}

	if (!player.opponent) {
		player.opponent = opponent;
	}
	
	if (player.area === opponent.area && player.roomid === opponent.roomid) {
		combat.attack(player, opponent, roomObj, function(player, opponent, roomObj, msgForPlayer, msgForOpponent, playerCanSee) {
			combat.attack(opponent, player, roomObj, function(opponent, player, roomObj, msgForOpponent2, msgForPlayer2, oppCanSee) {
				var oppStatus = Character.getStatusReport(opponent),
				playerStatus= Character.getStatusReport(player),
				preventPrompt = false;

				msgForPlayer += msgForPlayer2;

				msgForOpponent += msgForOpponent2;

				if (player.isPlayer) {
					if (opponent.chp > 0) {
						if (!player.canViewHp) {
							msgForPlayer += '<div class="rnd-status">' + opponent.capitalShort + oppStatus.msg
							+ '</div>';
						} else {
							msgForPlayer += '<div class="rnd-status">' + opponent.capitalShort + oppStatus.msg
								+ ' (' + opponent.chp + '/' + opponent.hp +')</div>';
						}
					} else {
						msgForPlayer += '<div class="rnd-status">You deliver a powerful <strong class="red">final blow to ' 
							+ opponent.short + '</strong>!</div>';
					}
				}

				if (opponent.isPlayer) {
					if (!opponent.canViewHp) {
						msgForOpponent += '<div class="rnd-status">' + opponent.capitalShort + playerStatus.msg
							+ '</div>';
					} else {
						msgForOpponent += '<div class="rnd-status">' + player.capitalShort + playerStatus.msg
							+ ' (' + player.chp + '/' + player.hp +')</div>';
					}
				}

				if (opponent.chp <= 0 || player.chp <= 0) {
					preventPrompt = true;
				}

				World.msgPlayer(player, {
					msg: msgForPlayer,
					noPrompt: preventPrompt,
					styleClass: 'player-hit warning'
				});

				World.msgPlayer(opponent, {
					msg: msgForOpponent,
					noPrompt: preventPrompt,
					styleClass: 'player-hit warning'
				});

				if (player.position !== 'fighting' || opponent.position !== 'fighting') {	
					if (player.postion === 'fighting' && player.opponent.name === opponent.name) {
						player.position = 'standing';
					}

					if (opponent.postion === 'fighting' && opponent.opponent.name === player.name) {
						opponent.position = 'standing';
					}

					clearInterval(combatInterval);
				} else {
					if (opponent.chp <= 0) {
						combat.processEndOfCombat(combatInterval, player, opponent, roomObj);
					} else if (player.chp <= 0) {
						combat.processEndOfCombat(combatInterval, opponent, player, roomObj);
					} else {
						World.prompt(player);
						World.prompt(opponent);
					}
				}
			});
		});
	} else {
		this.processEndOfCombat(combatInterval, player, opponent, roomObj);
	}
};

module.exports.combat = new Combat();


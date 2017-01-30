var Items = function() {},
World = require('../src/world').world,
itemMatrix = {
    weapons: {
        101: {
            name: 'Panzerhand',
            displayName: 'Panzerhand',
            short: 'an armored Panzerhand',
            long: 'A basic Panzerhand is here. Panzerhands are heavy armour-plated gloves.' ,
            area: 'dormaus',
            id: '101',
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
        }
    },
    equipment: {
        
    },
    consumables: {
        310: {
            name: 'Potion of Growth', 
            short: 'a potion of growth',
            long: 'A swirling potion of growth, that seems to bulge out at its container, was left here.' ,
            area: 'dormaus',
            id: '310',
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
        },
        311: {
            name: 'Potion of Shrinking', 
            short: 'a potion of shrinking',
            long: 'A swirling potion of shrinking, that seems to clench within its container, was left here.' ,
            area: 'dormaus',
            id: '311',
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
        }
    },
    loot: {
        
    }
};

Items.prototype.getRaw = function(type, id) {
    var item;
    if (itemMatrix[type] && itemMatrix[type][id]) {
        return itemMatrix[type][id];
    } else {
        return null;
    }
};

Items.prototype.getItem = function(type, id) {
    var item;
    if (itemMatrix[type] && itemMatrix[type][id]) {
        item = World.extend(itemMatrix[type][id], World.getTemplate('item'));
        return item;
    } else {
        return null;
    }
};

module.exports.items = new Items();
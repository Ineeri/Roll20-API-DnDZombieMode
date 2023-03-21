# DndZombieMode v1.0

Welcome to Zombie Mode for D&D. This script is a fun game inside Roll20, for One Shots or just some fun while waiting. It is heavily inspired by the C.O.D. Zombie Mods.

### Dnd Zombie Mode
With this script you will be able to play a D&D version of COD Zombies in Roll20. 
For every Player a base Character gets generated. Players can move there Character as usual. Characters will have special Abilities to buy Barricades and buy random upgrades from Slotmaschines. The GM has the ability to spawn x amount of Zombies for the Characters to fight. A set amount of rewards can be given to Characters after killing a Zombie, and with these rewards the Player can in return buy new Barricades or new upgrades from the Slotmaschines.
Every 5 rounds a Boss Zombie will spawn with the regular Zombies. The GM can end the game anytime.

### Basic Commands
The script uses a standardized API command syntax. All DnD Zombie Mode commands will begin with **!dndZombies**. This will then be followed by a space, a double dash preceding a keyword. This looks like this:
**!dndZombies --showMenu**

### Setting up Dnd Zombie Mode
After installing the script and reloading the sandbox,Dnd Zombie Mode will create necessary macros. For the GM the following are of interest:
**API-DnD-Zombies-Menu**
For easy use, I recommend showing it in your macro bar.

### Using Dnd Zombie Mode
Start by using the **API-DnD-Zombies-Menu** macro. This will prompt a menu in the chat.

**Start Game**
Generates Token, Charactersheets and Abilities and Equipment for the Player and GM.

**Stop Game**
Deletes Token, Charactersheets and Abilities, exept the Player Tokens, so you can check your character in the end.

**Spawn Zombies**
Spawns the amount of Zombies given. They are given a aura, that shows the GM how far the are able to walk.

**Delete Zombies**
Deletes the Zombie Tokens from the Map. No Rewards will be given.

**Award Kill**
Gives the selected Token 10 EP. Should always be a Player Token.

**Toggle Options**
Shows the Options the GM can interact with.

**Difficulty**
The Difficulty changes Health and Damage from the Zombies/Zombie Boss. This can be changed mid game.

### How to play Dnd Zombie Mode
Start by pressing "Start Game". Let your Players find there Character and Character Sheet. Move the Slotmaschine Tokens to a place you feel is a nice fit.
**As a note you can also draw a basic shape for a house with rooms, to make it more challenging.**
Spawn in a number of Zombies and proceed with normal D&D Combat. Award a Player Character a kill after they have slain a Zombie so they get EP to Buy Stuff.
Use the Zombie "Slam" Ability to attack your Players Characters with. This Ability will get stronger each new Zombie Spawn.

Things the Players can currently get in the Slotmaschines.
		"Ability Score Improvment"
		"Max HP up"
		"AC up"
		"Cantrip"
		"Weapon Upgrade"
		"Cantrip Upgrade"






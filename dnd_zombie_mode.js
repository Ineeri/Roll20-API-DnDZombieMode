/**
 *
 * This API is its own little game withing Roll20.
 * It is heavily inspired by C.O.Ds Zombie Mode.
 *
 * @summary short description for the file
 * @author Patrick P.
 *
 */

(() => {
	// Variable Region
	const VERSION = 0.2;
	const MACRO_NAMES = ["API-DnD-Zombies-Menu"];
	const PROJECT_NAME = "DnD Zombies";
	const PROJECT_HANDLE = "!dndZombies";
	const GAMEDIFFICULTYS = ["Easy", "Normal", "Hard"];
	
	const SLOT1_PERKS = [
		"Ability Score Improvment",
		"Max HP up",
		"AC up",
		"Cantrip",
		"Weapon Upgrade",
		"Cantrip Upgrade",
	];
	const SLOT2_PERKS = [
		"Ability Score Improvment",
		"Max HP up",
		"AC up",
		"Cantrip",
		"Weapon Upgrade",
		"Cantrip Upgrade",
	];
	const SLOT1_PRICE = 30;
	const SLOT2_PRICE = 50;
	const BARRICATE_PRICE = 20;
	const PLAYERNAMES = [
		"Zumed Massud",
		"Zardar Honne",
		"Stei Leafseeker",
		"Herder Thunderstride",
		"Vober Bun",
		"If Kukrask",
		"Grolbarth Tarrenmane",
		"Toth Skydream"
	];
	const PLAYERTOKENLINKS = [
		"https://s3.amazonaws.com/files.d20.io/images/300910786/0ZqfTTgjRgAsKaKjeJJf7g/thumb.png?1661168825",
		"https://s3.amazonaws.com/files.d20.io/images/300909862/WMF0QIzZmWKhxtwIUjzdwA/thumb.png?1661168162",
		"https://s3.amazonaws.com/files.d20.io/images/300909447/olOz0YTsW2Vn59TKMbamNg/thumb.png?1661167781",
		"https://s3.amazonaws.com/files.d20.io/images/299898045/YgCezyHa_YPFxABRQTDuLA/thumb.png?1660652027",
		"https://s3.amazonaws.com/files.d20.io/images/299897245/qK--RagkTZ-_psHf_40KpA/thumb.png?1660651327",
		"https://s3.amazonaws.com/files.d20.io/images/299894282/CZdA54yLbFLFRlcGvUxNTQ/thumb.png?1660649174",
		"https://s3.amazonaws.com/files.d20.io/images/299893259/jISiDk8YQNL78XXQH5ykiw/thumb.png?1660648290",
		"https://s3.amazonaws.com/files.d20.io/images/299891963/RsOfKUL-insTiJvTdd9MVg/thumb.png?1660646964"
	];
	const SLOTTOKENLINKS = [
		"https://s3.amazonaws.com/files.d20.io/images/63426/thumb.png?1340877628",
	];
	const PLAYERABILITYNAMES = [
		"Buy Barricade (" + BARRICATE_PRICE + " EP)", 
		"Buy Slot 1 (" + SLOT1_PRICE + " EP)",
		"Buy Slot 2 (" + SLOT2_PRICE + " EP)",
	];
	const PLAYERABILITYACTIONS = [
		PROJECT_HANDLE + " --buyBarricade ?{Where to?|Top|Down|Left|Right}",
		PROJECT_HANDLE + " --buySlot 1",
		PROJECT_HANDLE + " --buySlot 2",
	];
	const ZOMBIEABILITYNAMES = [
		"Slam",
	];
	const ZOMBIEABILITYACTIONS = [
		"/w gm&{template:npcaction} {{attack=1}} {{damage=1}} {{dmg1flag=1}} {{name=Zombie}} {{rname=Slam}} {{r1=[[1d20+@{Zombie|STRENGTH_MOD}]]}} {{normal=1}} {{dmg1=[[1d6+@{Zombie|STRENGTH_MOD}]]}} {{dmg1type=bludgeoning}} {{crit=1}} {{crit1=[[1d6+@{Zombie|STRENGTH_MOD}]]}}",
	];
	const ZOMBIEBOSSABILITYNAMES = [
		"MEGA Slam",
	];
	const ZOMBIEBOSSABILITYACTIONS = [
		"/w gm&{template:npcaction} {{attack=1}} {{damage=1}} {{dmg1flag=1}} {{name=Zombie Boss}} {{rname=Slam}} {{r1=[[1d20+4+@{Zombie Boss|STRENGTH_MOD}]]}} {{normal=1}} {{dmg1=[[2d6+@{Zombie Boss|STRENGTH_MOD}]]}} {{dmg1type=bludgeoning}} {{crit=1}} {{crit1=[[2d6+@{Zombie Boss|STRENGTH_MOD}]]}}",
	];
	const ZOMBIETOKENLINKS = [
		"https://s3.amazonaws.com/files.d20.io/images/310308728/g7RjCp6Z6Wp31cTL2EPbvQ/thumb.png?1666329093",
	];
	const ZOMBIEBOSSTOKENLINKS = [
		"https://s3.amazonaws.com/files.d20.io/images/310876578/bTaGG1-NiJfJoiS8m6hGpQ/thumb.png?1666595379",
	];
	const BARRICADETOKENLINKS = [
		"https://s3.amazonaws.com/files.d20.io/images/309191954/7yij40E5OHjqZUO14t3kqw/thumb.png?1665736427",
	];
	
	const HOUSEROOMS = [
		{	roomNumber: 1,
			wallCount: 10,
			windowCount: 1,
			doorCount: 1,
		},
	];
	
	const STARTINGWEAPONS = [
		{	itemname: "Dagger",
			itemtype: "Melee Weapon",
			damage: "1d4",
			damagetype: "Piercing",
			range: "20/60",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Finesse, Light, Thrown",
			itemweight: 1,
			atkattrbase: "@{dexterity_mod}",
		},
		{	itemname: "Greatclub",
			itemtype: "Melee Weapon",
			damage: "1d8",
			damagetype: "Bludgeoning",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Two-handed",
			itemweight: 10,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Handaxe",
			itemtype: "Melee Weapon",
			damage: "1d6",
			damagetype: "Slashing",
			range: "20/60",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Light, Thrown",
			itemweight: 2,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Quarterstaff",
			itemtype: "Melee Weapon",
			damage: "1d6",
			damagetype: "Bludgeoning",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Versatile (1d8)",
			itemweight: 4,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Spear",
			itemtype: "Melee Weapon",
			damage: "1d6",
			damagetype: "Piercing",
			range: "20/60",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Thrown, Versatile (1d8)",
			itemweight: 4,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Light Crossbow",
			itemtype: "Ranged Weapon",
			damage: "1d8",
			damagetype: "Piercing",
			range: "80/320",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Two-handed",
			itemweight: 5,
			atkattrbase: "@{dexterity_mod}",
		},
	];
	
	const MARTIALWEAPONS = [
		{	itemname: "Battleaxe",
			itemtype: "Melee Weapon",
			damage: "1d8",
			damagetype: "Slashing",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Versatile (1d10)",
			itemweight: 4,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Halberd",
			itemtype: "Melee Weapon",
			damage: "1d10",
			damagetype: "Slashing",
			range: "10",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Heavy, Reach, Two-handed",
			itemweight: 6,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Greataxe",
			itemtype: "Melee Weapon",
			damage: "1d12",
			damagetype: "Slashing",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Heavy,Two-handed",
			itemweight: 7,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Maul",
			itemtype: "Melee Weapon",
			damage: "2d6",
			damagetype: "Bludgeoning",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Heavy,Two-handed",
			itemweight: 10,
			atkattrbase: "@{strength_mod}",
		},
		{	itemname: "Shortsword",
			itemtype: "Melee Weapon",
			damage: "1d6",
			damagetype: "Piercing",
			range: "Melee",
			criticalrange: 20,
			hasattack: 1,
			useasresource: 0,
			rarity: 0,
			itemproperties: "Finesse, Light",
			itemweight: 10,
			atkattrbase: "@{strength_mod}",
		},
	];
	
	const CANTRIPS = [
		{	spellname: "Fire Bolt",
			details_flag: "on",
			options_flag: "on",
			spell_ability: "spell",
			innate: "",
			spell_damage_progression: "",
			spellathigherlevels: "",
			spellattack: "Ranged",
			spellcastingtime: "1 action",
			spellclass: "",
			spellcomp_m: 0,
			spellcomp_materials: "",
			spellcomp_s: "{{s=1}}",
			spellcomp_v: "{{v=1}}",
			spellconcentration: "",
			spelldamage1: "1d10",
			spelldamage2: "",
			spelldamagetype: "Fire",
			spelldamagetype2: "",
			spelldescription: "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn’t being worn or carried.",
			spelldmgmod: "",
			spellduration: "Instantaneous",
			spellhealing: "",
			spellhlbonus: "",
			spellhldie: "",
			spellhldietype: "",
			spelllevel: "cantrip",
			spelloutput: "ATTACK",
			spellrange: "120 feet",
			spellritual: "",
			spellsave: "",
			spellsavesuccess: "",
			spellschool: "evocation",
			spellsource: "",
			spelltarget: "A creature or object within range",
		},
		{	spellname: "Ray of Frost",
			details_flag: "on",
			options_flag: "on",
			spell_ability: "spell",
			innate: "",
			spell_damage_progression: "",
			spellathigherlevels: "",
			spellattack: "Ranged",
			spellcastingtime: "1 action",
			spellclass: "",
			spellcomp_m: 0,
			spellcomp_materials: "",
			spellcomp_s: "{{s=1}}",
			spellcomp_v: "{{v=1}}",
			spellconcentration: "",
			spelldamage1: "1d8",
			spelldamage2: "",
			spelldamagetype: "Cold",
			spelldamagetype2: "",
			spelldescription: "A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.",
			spelldmgmod: "",
			spellduration: "Instantaneous",
			spellhealing: "",
			spellhlbonus: "",
			spellhldie: "",
			spellhldietype: "",
			spelllevel: "cantrip",
			spelloutput: "ATTACK",
			spellrange: "60 feet",
			spellritual: "",
			spellsave: "",
			spellsavesuccess: "",
			spellschool: "evocation",
			spellsource: "",
			spelltarget: "A creature within range",
		},
		{	spellname: "Shocking Grasp",
			details_flag: "on",
			options_flag: "on",
			spell_ability: "spell",
			innate: "",
			spell_damage_progression: "",
			spellathigherlevels: "",
			spellattack: "Melee",
			spellcastingtime: "1 action",
			spellclass: "",
			spellcomp_m: 0,
			spellcomp_materials: "",
			spellcomp_s: "{{s=1}}",
			spellcomp_v: "{{v=1}}",
			spellconcentration: "",
			spelldamage1: "1d8",
			spelldamage2: "",
			spelldamagetype: "Lightning",
			spelldamagetype2: "",
			spelldescription: "Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can’t take reactions until the start of its next turn.",
			spelldmgmod: "",
			spellduration: "Instantaneous",
			spellhealing: "",
			spellhlbonus: "",
			spellhldie: "",
			spellhldietype: "",
			spelllevel: "cantrip",
			spelloutput: "ATTACK",
			spellrange: "Touch",
			spellritual: "",
			spellsave: "",
			spellsavesuccess: "",
			spellschool: "evocation",
			spellsource: "",
			spelltarget: "A creature you try to touch",
		},
		{	spellname: "Thorn Whip",
			details_flag: "on",
			options_flag: "on",
			spell_ability: "spell",
			innate: "",
			spell_damage_progression: "",
			spellathigherlevels: "",
			spellattack: "Ranged",
			spellcastingtime: "1 action",
			spellclass: "",
			spellcomp_m: 0,
			spellcomp_materials: "",
			spellcomp_s: "{{s=1}}",
			spellcomp_v: "{{v=1}}",
			spellconcentration: "",
			spelldamage1: "1d6",
			spelldamage2: "",
			spelldamagetype: "Piercing",
			spelldamagetype2: "",
			spelldescription: "You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. If the attack hits, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you.",
			spelldmgmod: "",
			spellduration: "Instantaneous",
			spellhealing: "",
			spellhlbonus: "",
			spellhldie: "",
			spellhldietype: "",
			spelllevel: "cantrip",
			spelloutput: "ATTACK",
			spellrange: "30 feet",
			spellritual: "",
			spellsave: "",
			spellsavesuccess: "",
			spellschool: "evocation",
			spellsource: "",
			spelltarget: "A creature within range",
		},
	];
	
	
	// GM
	let gmPlayer;
	let gmPage;
	
	// Zombies
	let zombieTokens = [];
	let zombieTokenIds = [];
	let zombieCharSheet;
	let zombieCharSheetId;
	let zombieBossToken;
	let zombieBossTokenId;
	let zombieBossCharSheet;
	let zombieBossCharSheetId;
	
	let zombieHP;
	let zombieAC;
	
	let zombieScaling;
	let zombieAmount;	
	let zombieSpeed;
	
	// Players
	let playerCount;
	let players = [];
	let playerTokens = [];
	let playerTokenIds = [];
	let playerCharacters = [];
	let playerCharacterIds = [];
	let playerCharacterPerks = [];
	
	// Game
	let turnCounter = 0;
	let gridSize;
	let barricadeTokens = [];
	let barricadeTokenIds = [];
	let isActiveOptions = false;
	let gameDifficulty;
	
	// House
	let housePathIds = [];
	let housePathPoints = []
	let lastL;
	let lastT;
	
	
	// END Variabel Region
	
	// on Chat Message
	on("chat:message", function(msg){
		if(msg.type !== "api"){ return; }		
		msgArgs = msg.content.split(" ");
		if(msgArgs[0] !== PROJECT_HANDLE) { return; }
		
		log(msgArgs);
		let msgKeyword = msgArgs[1];
		
		if(msgKeyword === "--showMenu"){
			showMenu();
		}
		if(msgKeyword === "--startGame"){
			startGame();			
		}
		if(msgKeyword === "--stopGame"){		
			stopGame();
		}
		if(msgKeyword === "--spawnZombies"){
			turnCounter++;
			if(turnCounter > 1){				
				scaleZombies();
			}
			createZombies(msgArgs[2]);
			if(turnCounter % 5 == 0){
				createZombieBoss();
			}			
		}
		if(msgKeyword === "--deleteZombies"){
			deleteZombies();
			deleteZombieBoss();
		}
		if(msgKeyword === "--awardKill"){
			awardKillToPlayer(msg.selected);
		}
		if(msgKeyword === "--buyBarricade"){
			playerBuyBarricade(msg.selected, msgArgs[2]);
		}
		if(msgKeyword === "--buySlot"){
			playerBuySlot(msg.selected, msgArgs[2]);
		}
		if(msgKeyword === "--slotPerk"){
			handleSlotPerk(msg.selected, msgArgs[2], msgArgs[3], msgArgs[4]);
		}
		if(msgKeyword === "--logSelectedToken"){
			if(msg.selected == undefined){
				sendChat(PROJECT_NAME, "/w gm A Token has to be selected to be rewarded");
				return;
			}
			let token = findObjs({_type:"graphic", _id: msg.selected[0]._id})[0];
			log(token);
			let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
			let attr = findObjs({ _type: "attribute", _characterid: cha.get("id")});
			log("ATTRIBUTES")
			log(attr)
			let abili = findObjs({ _type: "ability", _characterid: cha.get("id")});
			log("ABILITIES")
			log(abili)
		}
		if(msgKeyword === "--toggleOptions"){
			isActiveOptions = !isActiveOptions;
			showMenu();
		}
		if(msgKeyword === "--setDifficulty"){
			setDifficulty(msgArgs[2]);
		}
		
		
	});
	
	function startGame(){
		initGM();
		createPlayerCharacterSheets();
		createZombieCharacterSheet();
		createZombieBossCharacterSheet();
		createPlayerAbilities();
		createZombieAbilities();
		createZombieBossAbilities();
		createSlots();
		//createHouse();
	}
	function stopGame(){
		//deleteHouse();
		deleteSlots();
		deleteZombieBossAbilities();
		deleteZombieAbilities();
		deletePlayerAbilities();
		deleteZombieBossCharacterSheet();
		deleteZombieCharacterSheet();
		deletePlayerCharacterSheets();
		deleteZombies();
		deleteZombieBoss();
		deleteBarricadeTokens();
	}
	
	//TODO 
	function createHouse(){
		/*
		const HOUSEROOMS = [
			{	roomNumber: 1,
				wallCount: 10
				windowCount: 1,
				doorCount: 1,
			},	
		]
		
		*/
		let roomCount = 1
		let path;
		
		
		path = '[';		
		
		let direction;
		
		for(let i = 0; i < roomCount; i++){
			let roomNumber = getRandomIntInclusive(0, HOUSEROOMS.length-1);
			
			
			let turns, strokeCount;
			turns = 0;
			
			lastL = 385;
			lastT = 385;
			
			
			
			
			mostLeft = 10000;
			mostTop =  10000;
			
			path += '[\"M\",' + lastL + ',' + lastT + ']';
			housePathPoints.push({
				left: lastL,
				top: lastT,
			})
			
			
			let testWalls = 4
			
			lastDirection = 0;
			lastLineType = 0;
			
			for(let j = 0; j < 2; j++){
				
				direction = getRandomIntInclusive(1,4); // 1 - right,// 2 - down,// 3 - left,// 4 - up,				
				lineType = getRandomIntInclusive(1,3); // 1 - left turn,// 2 - straight,// 3 - right turn,
				
				
				//direction = 1;
				//lineType =2
				
				let newPathSegment = getPathForLineType(direction, lineType);
				
				
				
				path += newPathSegment;
				
				if(lastL < mostLeft){
					mostLeft = lastL;
				}
				if(lastT < mostTop){
					mostTop = lastT;
				}
				
				if(lineType == 1){
					turns += -1;
				}
				if(lineType == 3){
					turns += 1;
				}
				lastDirection = direction;
				lastLineType = lineType
			}		
			
			
			path += ']';
			log(path);
			log(housePathPoints)
			let data = {
				pageid: gmPage.get("id"),
				fill: "transparent",
				stroke: "#" + Math.floor(Math.random()*16777215).toString(16),
				layer: "gmlayer",
				stroke_width: 5,
				width: 70, 
				height: 70, 
				left: mostLeft,
				top: mostTop,
				scaleX: 1,
				scaleY: 1,
				controlledby: gmPlayer.get("id"),
				path: path,
				rotation: 0,
			}
			housePath = createObj("path", data);
			housePathIds.push(housePath.get("id"));
		}
	}
	function getPathForLineType(direction, lineType){
		let path = "";
		if(direction == 1){
			if(lineType == 1){
				// right and left Turn
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT) + ']';
				housePathPoints.push({left: lastL + gridSize,top: lastT})
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT - gridSize) + ']';				
				housePathPoints.push({left: lastL + gridSize,top: lastT - gridSize})
				lastL = lastL + gridSize;
				lastT = lastT - gridSize;
				log("right and left Turn")
			}
			if(lineType == 2){
				// right and straight
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT) + ']';	
				housePathPoints.push({left: lastL + gridSize,top: lastT})			
				lastL = lastL + gridSize;
				log("right and straight")
			}
			if(lineType == 3){
				// right and right Turn
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT) + ']';
				housePathPoints.push({left: lastL + gridSize,top: lastT})	
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT + gridSize) + ']';			
				housePathPoints.push({left: lastL + gridSize,top: lastT + gridSize})
				lastL = lastL + gridSize;
				lastT = lastT + gridSize;
				log("right and right Turn")
			}
		}
		if(direction == 2){
			if(lineType == 1){
				// down and left Turn
				path += ',[\"L\",' + (lastL) + ',' + (lastT + gridSize) + ']';		
				housePathPoints.push({left: lastL,top: lastT + gridSize})
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT + gridSize) + ']';	
				housePathPoints.push({left: lastL- gridSize, top: lastT + gridSize})
				lastL = lastL - gridSize;
				lastT = lastT - gridSize;
				log("down and left Turn")
			}
			if(lineType == 2){
				// down and straight
				path += ',[\"L\",' + (lastL) + ',' + (lastT + gridSize) + ']';	
				housePathPoints.push({left: lastL,top: lastT + gridSize})
				lastT = lastT + gridSize;
				log("down and straight")
			}
			if(lineType == 3){
				// down and right Turn
				path += ',[\"L\",' + (lastL) + ',' + (lastT + gridSize) + ']';
				housePathPoints.push({left: lastL, top: lastT + gridSize})
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT + gridSize) + ']';
				housePathPoints.push({left: lastL + gridSize, top: lastT + gridSize})
				lastL = lastL + gridSize;
				lastT = lastT - gridSize;
				log("down and right Turn")
			}
		}
		if(direction == 3){
			if(lineType == 1){
				// left and left Turn
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT})
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT + gridSize) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT + gridSize})
				lastL = lastL - gridSize;
				lastT = lastT + gridSize;
				log("left and left Turn")
			}
			if(lineType == 2){
				// left and straight
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT})
				lastL = lastL - gridSize;
				log("left and straight")
			}
			if(lineType == 3){
				// left and right Turn
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT})
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT - gridSize) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT - gridSize})
				lastL = lastL - gridSize;
				lastT = lastT - gridSize;
				log("left and right Turn")
			}
		}
		if(direction == 4){
			if(lineType == 1){
				// up and left Turn
				path += ',[\"L\",' + (lastL) + ',' + (lastT - gridSize) + ']';
				housePathPoints.push({left: lastL, top: lastT - gridSize})
				path += ',[\"L\",' + (lastL - gridSize) + ',' + (lastT - gridSize) + ']';
				housePathPoints.push({left: lastL - gridSize, top: lastT - gridSize})
				lastL = lastL - gridSize;
				lastT = lastT - gridSize;
				log("up and left Turn")
			}
			if(lineType == 2){
				// up and straight
				path += ',[\"L\",' + (lastL) + ',' + (lastT - gridSize) + ']'
				housePathPoints.push({left: lastL, top: lastT - gridSize});
				lastT = lastT - gridSize;
				log("up and straight")
			}
			if(lineType == 3){
				// up and right Turn
				path += ',[\"L\",' + (lastL) + ',' + (lastT - gridSize) + ']';
				housePathPoints.push({left: lastL , top: lastT - gridSize})
				path += ',[\"L\",' + (lastL + gridSize) + ',' + (lastT - gridSize) + ']';
				housePathPoints.push({left: lastL + gridSize, top: lastT - gridSize})
				lastL = lastL + gridSize;
				lastT = lastT - gridSize;
				log("up and right Turn")
			}
		}
		return path;
	}
	function deleteHouse(){
		for(let i = 0; i < housePathIds.length; i++){
			path = findObjs({_type: "path", id: housePathIds[i]})[0];
			if(path){
				path.remove();
			}
		}
		housePathPoints = [];
		housePathIds = []
	}
		
		
	function createSlots(){
		token = findObjs({_type:"graphic", name:"Slot 1", pageid: gmPage.get("id")})[0]
		if(!token){
			data = {			
				pageid: gmPage.get("id"),
				left: (gmPage.get("width")*gridSize)/2,
				top: (gmPage.get("height")*gridSize)/2,
				width: 70,
				height: 70,
				layer: "objects",
				controlledby: gmPlayer.get("id"),
				name: "Slot 1",
				showname: true,
				imgsrc: SLOTTOKENLINKS[0],
			}
			createObj("graphic", data);			
		}
		token = findObjs({_type:"graphic", name:"Slot 2", pageid: gmPage.get("id")})[0]
		if(!token){
			data = {			
				pageid: gmPage.get("id"),
				left: (gmPage.get("width")*gridSize)/2 +gridSize ,
				top: (gmPage.get("height")*gridSize)/2,
				width: 70,
				height: 70,
				layer: "objects",
				controlledby: gmPlayer.get("id"),
				name: "Slot 2",
				showname: true,
				imgsrc: SLOTTOKENLINKS[0],
			}
			createObj("graphic", data);			
		}
	}
	function deleteSlots(){
		let token = findObjs({_type:"graphic", name: "Slot 1"})[0];
		if(token){
			token.remove();
		}
		token = findObjs({_type:"graphic", name: "Slot 2"})[0];
		if(token){
			token.remove();
		}
	}
	
	function setDifficulty(difficulty){
		for(let i = 0; i < GAMEDIFFICULTYS.length; i++){
			if(difficulty.includes(GAMEDIFFICULTYS[i])){
				gameDifficulty = GAMEDIFFICULTYS[i];
			}
		}
		setZombieScaling(gameDifficulty);
	}
	function setZombieScaling(gameDifficulty){
		if(gameDifficulty == "Easy"){
			zombieScaling = 1.1;
		}
		if(gameDifficulty == "Normal"){
			zombieScaling = 1.3;
		}
		if(gameDifficulty == "Hard"){
			zombieScaling = 1.5;
		}
		if(!zombieHP){ zombieHP = 22; }
		if(!zombieAC){ zombieAC = 8; }
	}
	function scaleZombies(){		
		zombieAC = Math.round(zombieAC * zombieScaling);
		zombieHP = Math.round(zombieHP * zombieScaling);		
		
		attr = findObjs({ _type: "attribute", _characterid: zombieCharSheetId, name: "STRENGTH_MOD"})[0];
		attr.set({
			current: attr.get("current") + 1,
		})
	}
	
	function createZombieBossAbilities(){
		for(let i = 0; i < ZOMBIEBOSSABILITYNAMES.length; i++){
			let ability = findObjs({ type: "ability", _characterid: zombieBossCharSheetId, name: ZOMBIEBOSSABILITYNAMES[i] })[0];
			if(!ability){				
				let data = {
					_characterid: zombieBossCharSheetId,
					name: ZOMBIEBOSSABILITYNAMES[i],
					action: ZOMBIEBOSSABILITYACTIONS[i],
					istokenaction: true,
				};				
				createObj("ability", data);
			}
		}
	}
	function deleteZombieBossAbilities(){
		for(let i = 0; i < ZOMBIEBOSSABILITYNAMES.length; i++){				
			let ability = findObjs({ type: "ability", _characterid: zombieBossCharSheetId, name: ZOMBIEBOSSABILITYNAMES[i] })[0];
			if(ability){
				ability.remove();
			}
		}
	}
		
	function createZombieBossCharacterSheet(){
		if(!zombieBossCharSheet){
			let data = {
				name: "Zombie Boss",
				controlledby: gmPlayer.get("id"),
			}
			let cha = createObj("character", data);
			zombieBossCharSheet = cha;
			zombieBossCharSheetId = cha.get("id");
		}
		attr = findObjs({ _type: "attribute", _characterid: zombieBossCharSheetId, name: "STRENGTH_MOD"})[0];
		if(!attr){
			let data = {
				name: "STRENGTH_MOD",
				current: 5,
				characterid: zombieBossCharSheetId,
			}
			createObj("attribute", data);
		}
	}
	function deleteZombieBossCharacterSheet(){
		let dummy = findObjs({ type: "character", id: zombieBossCharSheetId})[0];
		if(dummy){ 
			dummy.remove();
		}		
		zombieBossCharSheet = undefined;
		zombieBossCharSheetId = undefined;
	}
	function createZombieBoss(){
		let myLeft = getRandomPos(gmPage.get("width"),"left");
		let myTop = getRandomPos(gmPage.get("height"),"top");
		
		
		let data = {
			pageid: gmPage.get("id"),
			left: myLeft,
			top: myTop,
			width: 70,
			height: 70,
			layer: "objects",
			controlledby: gmPlayer.get("id"),
			name: "Zombie Boss",
			showname: true,
			imgsrc: ZOMBIEBOSSTOKENLINKS[0],
			represents: zombieBossCharSheetId,
			bar1_value: zombieHP*2,
			bar1_max: zombieHP*2,
			bar2_value: zombieAC,
			aura1_radius: zombieSpeed*6,
			aura1_color: "#" + Math.floor(Math.random()*16777215).toString(16),
			aura1_square: true,
			showplayers_aura1: false,
		}
		let token = createObj("graphic", data);
		zombieBossToken = token;
		zombieBossTokenId = token.get("id");
	}
	function deleteZombieBoss(){
		let dummy = findObjs({ _type: "graphic", _id: zombieBossTokenId})[0];
		if (dummy){
			dummy.remove();
		}
		zombieBossToken = "";
		zombieBossTokenId = "";
	}
	
	function createZombieAbilities(){
		for(let i = 0; i < ZOMBIEABILITYNAMES.length; i++){
			let ability = findObjs({ type: "ability", _characterid: zombieCharSheetId, name: ZOMBIEABILITYNAMES[i] })[0];
			if(!ability){				
				let data = {
					_characterid: zombieCharSheetId,
					name: ZOMBIEABILITYNAMES[i],
					action: ZOMBIEABILITYACTIONS[i],
					istokenaction: true,
				};				
				createObj("ability", data);
			}
		}
	}
	function deleteZombieAbilities(){
		for(let i = 0; i < ZOMBIEABILITYNAMES.length; i++){				
			let ability = findObjs({ type: "ability", _characterid: zombieCharSheetId, name: ZOMBIEABILITYNAMES[i] })[0];
			if(ability){
				ability.remove();
			}
		}
	}
	
	function createZombieCharacterSheet(){
		if(!zombieBossCharSheet){
			let data = {
				name: "Zombie",
				controlledby: gmPlayer.get("id"),
			}
			let cha = createObj("character", data);
			zombieCharSheet = cha;
			zombieCharSheetId = cha.get("id");
		}
		attr = findObjs({ _type: "attribute", _characterid: zombieCharSheetId, name: "STRENGTH_MOD"})[0];
		if(!attr){
			let data = {
				name: "STRENGTH_MOD",
				current: 1,
				characterid: zombieCharSheetId,
			}
			createObj("attribute", data);
		}
		zombieHP = 22;
		zombieAC = 8;
		zombieSpeed = 4;
		zombieScaling = 1.2;
	}
	function deleteZombieCharacterSheet(){
		let dummy = findObjs({ type: "character", id: zombieCharSheetId})[0];
		if(dummy){ 
			dummy.remove();
		}		
		zombieCharSheet = undefined;
		zombieCharSheetId = undefined;
	}
	function createZombies(amount){
		if(!integerCheck(amount)) { return; }
		
		for(let i = 0; i < amount; i++){
			let zLeft = getRandomPos(gmPage.get("width"));
			let zTop = getRandomPos(gmPage.get("height"));
			
			for(let j = 0; j < ZOMBIETOKENLINKS.length; j++){
				let data = {
					pageid: gmPage.get("id"),
					left: zLeft,
					top: zTop,
					width: 70,
					height: 70,
					layer: "objects",
					controlledby: gmPlayer.get("id"),
					name: "Zombie " + (i+1),
					showname: true,
					imgsrc: ZOMBIETOKENLINKS[j],
					represents: zombieCharSheetId,
					bar1_value: zombieHP,
					bar1_max: zombieHP,
					bar2_value: zombieAC,
					aura1_radius: zombieSpeed*5,
					aura1_color: "#" + Math.floor(Math.random()*16777215).toString(16),
					aura1_square: true,
					showplayers_aura1: false,
				};
				let token = createObj("graphic", data);
				zombieTokens.push(token);
				zombieTokenIds.push(token.get("id"));
			}			
		}
	}
	function deleteZombies(){
		for(let i = 0; i < zombieTokenIds.length; i++){
			let dummy = findObjs({ _type: "graphic", _id: zombieTokenIds[i]})[0];
			if (dummy){
				dummy.remove();
			}
		}
		zombieTokens = [];
		zombieTokenIds = [];
	}

	function createPlayerAbilities(){
		for(let i = 0; i < playerCharacters.length; i++){
			for(let j = 0; j < PLAYERABILITYNAMES.length; j++){				
				let ability = findObjs({ type: "ability", _characterid: playerCharacterIds[i], name: PLAYERABILITYNAMES[j] })[0];
				if(!ability){
					let data = {
						_characterid: playerCharacterIds[i],
						name: PLAYERABILITYNAMES[j],
						action: PLAYERABILITYACTIONS[j],
						istokenaction: true,
					};				
					createObj("ability", data);
				}
			}			
		}
	}
	function deletePlayerAbilities(){
		for(let i = 0; i < playerCharacters.length; i++){
			for(let j = 0; j < PLAYERABILITYNAMES.length; j++){				
				let ability = findObjs({ type: "ability", _characterid: playerCharacterIds[i], name: PLAYERABILITYNAMES[j] })[0];
				if(ability){
					ability.remove();
				}
			}
		}
	}
		
	function createPlayerCharacterSheets(){
		if(players.length <= 0){ return; }
		if(playerCharacters.length == 0){
			for(let i = 0; i < players.length; i++){
				let name = PLAYERNAMES[i];
				if(!PLAYERNAMES[i]){
					name = "";
				}
				data = {
					name: name,
					controlledby: players[i].get("id"),
					//inplayerjournals: players[i].get("id"),
				}
				let cha = createObj("character", data);
				playerCharacters.push(cha);
				playerCharacterIds.push(cha.get("id"));
			}
		}
		setDefaultAttributes();
		setDefaultTokenForPlayers();
		setStartingEquipment();
	}
	function setDefaultTokenForPlayers(){
		for(let i = 0; i < playerCount; i++){
			let data = {
				pageid: gmPage.get("id"),
				left: ((gmPage.get("width")*gridSize)/2)+(gridSize*i),
				top: ((gmPage.get("height")*gridSize)/2)+gridSize,
				width: 70,
				height: 70,
				layer: "objects",
				controlledby: playerCharacterIds[i],
				represents: playerCharacterIds[i],
				name: PLAYERNAMES[i],
				showname: true,
				imgsrc: PLAYERTOKENLINKS[i],
				bar1_link: findObjs({ _type: "attribute", _characterid: playerCharacterIds[i], name: "hp"})[0].get("id"),
				bar1_value: findObjs({ _type: "attribute", _characterid: playerCharacterIds[i], name: "hp"})[0].get("current"),
				bar1_max: findObjs({ _type: "attribute", _characterid: playerCharacterIds[i], name: "hp"})[0].get("max"),			
				bar2_link: findObjs({ _type: "attribute", _characterid: playerCharacterIds[i], name: "ac"})[0].get("id"),
				bar2_value: findObjs({ _type: "attribute", _characterid: playerCharacterIds[i], name: "ac"})[0].get("current"),
			}
			let token = createObj("graphic", data);		
			playerTokens.push(token);
			playerTokenIds.push(token.get("id"));
			setDefaultTokenForCharacter(playerCharacters[i],token);
		}		
	}
	function setDefaultAttributes(){
		for(let i = 0; i < players.length; i++){
			attributeCreator("ep", playerCharacterIds[i], 20);
			attributeCreator("hp", playerCharacterIds[i], 15, 15);
			attributeCreator("ac", playerCharacterIds[i], 10);
			attributeCreator("speed", playerCharacterIds[i], 30);
			attributeCreator("strength", playerCharacterIds[i], 10);
			attributeCreator("strength_mod", playerCharacterIds[i], 0);
			attributeCreator("dexterity", playerCharacterIds[i], 10);
			attributeCreator("dexterity_mod", playerCharacterIds[i], 0);
			attributeCreator("constitution", playerCharacterIds[i], 10);
			attributeCreator("constitution_mod", playerCharacterIds[i], 0);
			attributeCreator("intelligence", playerCharacterIds[i], 10);
			attributeCreator("intelligence_mod", playerCharacterIds[i], 0);
			attributeCreator("wisdom", playerCharacterIds[i], 10);
			attributeCreator("wisdom_mod", playerCharacterIds[i], 0);
			attributeCreator("charisma", playerCharacterIds[i], 10);
			attributeCreator("charisma_mod", playerCharacterIds[i], 0);
			attributeCreator("hitdietype", playerCharacterIds[i], 10);
			attributeCreator("hitdie_final", playerCharacterIds[i], 10);
			attributeCreator("hitdieroll", playerCharacterIds[i], 10);
			attributeCreator("hit_dice", playerCharacterIds[i], 1, 1);
			attributeCreator("rtype", playerCharacterIds[i], "{{normal=1}} {{r2=[[0d20");
			attributeCreator("spellcasting_ability", playerCharacterIds[i], "@{intelligence_mod}+");
			attributeCreator("spell_attack_bonus", playerCharacterIds[i], 2);
			attributeCreator("spell_save_dc", playerCharacterIds[i], 10);
			attributeCreator("dtype", playerCharacterIds[i], "full");			
		}
	}
	function attributeCreator(name, charId, current, max){
		if(max){			
			attr = findObjs({ _type: "attribute", _characterid: charId, name: name})[0];
			if(!attr){
				data = {
					name: name,
					_characterid: charId,
					current: current,
					max: max,
				}
				createObj("attribute", data);
			}
		}else{
			attr = findObjs({ _type: "attribute", _characterid: charId, name: name})[0];
			if(!attr){
				data = {
					name: name,
					_characterid: charId,
					current: current,
				}
				createObj("attribute", data);
			}
		}
	}
	function setStartingEquipment(){
		for(let i = 0; i < players.length; i++){
			let itemPos = getRandomIntInclusive(0,STARTINGWEAPONS.length-1);				
			addItemToPlayerCharacterSheet(playerCharacterIds[i], STARTINGWEAPONS[itemPos]);
		}
	}
	function addPlayerCharacterPerk(chaId, perkId, perkName){
		let inList = false;
		let inListAt = 0;
		
		for(let i = 0; i < playerCharacterPerks.length; i++){
			if(playerCharacterPerks[i].playerCharacterIds == chaId){
				inList = true;
				inListAt = i;
				break;
			}
		}
		if(!inList){
			let data = {
				playerCharacterIds: chaId,
				perkNames: [],
				perkIds: []
			}
			data.perkNames.push(perkName)
			data.perkIds.push(perkId);
			playerCharacterPerks.push(data);
		}else{
			playerCharacterPerks[inListAt].perkNames.push(perkName);
			playerCharacterPerks[inListAt].perkIds.push(perkId);
		}
	}
	function addItemToPlayerCharacterSheet(chaId, item){
		let itemId = generateRowID();
		let attackId = generateRowID();
		
		addPlayerCharacterPerk(chaId, attackId, item.itemname);
		
		// Inventory
		attributeCreator("repeating_inventory_" + itemId + "_itemname", chaId, item.itemname);
		attributeCreator("repeating_inventory_" + itemId + "_itemcount", chaId, 1);
		attributeCreator("repeating_inventory_" + itemId + "_itemproperties", chaId, item.itemproperties);
		attributeCreator("repeating_inventory_" + itemId + "_itemweight", chaId, item.itemweight);
		attributeCreator("repeating_inventory_" + itemId + "_itemcontent", chaId, "");
		attributeCreator("repeating_inventory_" + itemId + "_itemmodifiers", chaId, "Item Type: " + item.itemtype + ", Damage: " + item.damage + ", Damage Type: " + item.damagetype + ", Range: " + item.range + ", Critical Range: " + item.criticalrange);
		attributeCreator("repeating_inventory_" + itemId + "_hasattack", chaId, item.hasattack);
		attributeCreator("repeating_inventory_" + itemId + "_useasresource", chaId, item.useasresource);
		attributeCreator("repeating_inventory_" + itemId + "_itemattackid", chaId, attackId);
		
		// Attack
		attributeCreator("repeating_attack_" + attackId + "_options-flag", chaId, 0);
		attributeCreator("repeating_attack_" + attackId + "_itemid", chaId, itemId);
		attributeCreator("repeating_attack_" + attackId + "_atkname", chaId, item.itemname);
		attributeCreator("repeating_attack_" + attackId + "_dmgbase", chaId, item.damage);
		attributeCreator("repeating_attack_" + attackId + "_dmgtype", chaId, item.damagetype);
		attributeCreator("repeating_attack_" + attackId + "_atkrange", chaId, item.range);
		attributeCreator("repeating_attack_" + attackId + "_atkattr_base", chaId, item.atkattrbase);
		attributeCreator("repeating_attack_" + attackId + "_dmgattr", chaId, item.atkattrbase);
		attributeCreator("repeating_attack_" + attackId + "_atkmagic", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_atkdmgtype", chaId, item.damage + item.atkattrbase + " " + item.damagetype);
		attributeCreator("repeating_attack_" + attackId + "_rollbase_dmg", chaId, "@{wtype}&{template:dmg} {{rname=" + item.itemname + "}} @{atkflag} {{range=" + item.range + "}} @{dmgflag} {{dmg1=[["+ item.damage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag}");
		
		attributeCreator("repeating_attack_" + attackId + "_rollbase_crit", chaId, "@{wtype}&{template:dmg} {{crit=1}} {{rname=" + item.itemname + "}} @{atkflag} {{range=" + item.range + "}} @{dmgflag} {{dmg1=[["+ item.damage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + item.damage + "]]}} @{saveflag}");
		
		attributeCreator("repeating_attack_" + attackId + "_atkbonus", chaId, item.atkattrbase);
		
		attributeCreator("repeating_attack_" + attackId + "_rollbase", chaId, "@{wtype}&{template:atkdmg} {{mod=" + item.atkattrbase + "}} {{rname=" + item.itemname + "}} {{r1=[[@{d20}cs>" + item.criticalrange + " + " + item.atkattrbase + "]]}} @{rtype}cs>" + item.criticalrange + " + " + item.atkattrbase + " ]]}} @{atkflag} {{range="+ item.range+"}} @{dmgflag} {{dmg1=[["+ item.damage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + item.damage + "]]}} {{crit2=[[0[CRIT]]]}} @{saveflag} ");
		
		let versatilePos = item.itemproperties.indexOf("Versatile (");
		if(versatilePos !== -1){
			let versatileEndPos = item.itemproperties.indexOf(")");
			let versatileDamage = item.itemproperties.substring(versatilePos+11, versatilePos+11+versatileEndPos);
			attackId = generateRowID();
			attributeCreator("repeating_attack_" + attackId + "_options-flag", chaId, 0);
			attributeCreator("repeating_attack_" + attackId + "_itemid", chaId, itemId);
			attributeCreator("repeating_attack_" + attackId + "_atkname", chaId, item.itemname + " 2H");
			attributeCreator("repeating_attack_" + attackId + "_dmgbase", chaId, versatileDamage);
			attributeCreator("repeating_attack_" + attackId + "_dmgtype", chaId, item.damagetype);
			attributeCreator("repeating_attack_" + attackId + "_atkrange", chaId, item.range);
			attributeCreator("repeating_attack_" + attackId + "_atkattr_base", chaId, item.atkattrbase);
			attributeCreator("repeating_attack_" + attackId + "_dmgattr", chaId, item.atkattrbase);
			attributeCreator("repeating_attack_" + attackId + "_atkmagic", chaId, "");
			attributeCreator("repeating_attack_" + attackId + "_atkdmgtype", chaId, versatileDamage + item.atkattrbase + " " + item.damagetype);
			attributeCreator("repeating_attack_" + attackId + "_rollbase_dmg", chaId, "@{wtype}&{template:dmg} {{rname=" + item.itemname + " 2H" + "}} @{atkflag} {{range=" + item.range + "}} @{dmgflag} {{dmg1=[["+ versatileDamage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag}");
			
			attributeCreator("repeating_attack_" + attackId + "_rollbase_crit", chaId, "@{wtype}&{template:dmg} {{crit=1}} {{rname=" + item.itemname + " 2H" + "}} @{atkflag} {{range=" + item.range + "}} @{dmgflag} {{dmg1=[["+ versatileDamage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + versatileDamage + "]]}} @{saveflag}");
			
			attributeCreator("repeating_attack_" + attackId + "_atkbonus", chaId, item.atkattrbase);
			
			attributeCreator("repeating_attack_" + attackId + "_rollbase", chaId, "@{wtype}&{template:atkdmg} {{mod=" + item.atkattrbase + "}} {{rname=" + item.itemname + " 2H" + "}} {{r1=[[@{d20}cs>" + item.criticalrange + " + " + item.atkattrbase + "]]}} @{rtype}cs>" + item.criticalrange + " + " + item.atkattrbase + " ]]}} @{atkflag} {{range="+ item.range+"}} @{dmgflag} {{dmg1=[["+ versatileDamage + " + " + item.atkattrbase + "]]}} {{dmg1type=" + item.damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + versatileDamage + "]]}} {{crit2=[[0[CRIT]]]}} @{saveflag} ");
			}
		
	}
	function addCantripToPlayerCharacterSheet(selected, spell){
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let chaId = findObjs({_type:"character", _id: token.get("represents")})[0].get("id");	
		
		let spellId = generateRowID();
		let attackId = generateRowID();
		
		addPlayerCharacterPerk(chaId, spellId, spell.spellname);
		
		attributeCreator("repeating_spell-cantrip_" + spellId + "_details-flag", chaId, spell.details_flag);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_options-flag", chaId, spell.options_flag);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_rollcontent", chaId, "%{" + chaId + "|repeating_attack_" + attackId + "_attack}");
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spell_ability", chaId, spell.spell_ability);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_innate", chaId, spell.innate);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spell_damage_progression", chaId, spell.spell_damage_progression);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellathigherlevels", chaId, spell.spellathigherlevels);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellattack", chaId, spell.spellattack);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellcastingtime", chaId, spell.spellcastingtime);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellclass", chaId, spell.spellclass);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellcomp_m", chaId, spell.spellcomp_m);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellcomp_materials", chaId, spell.spellcomp_materials);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellcomp_s", chaId, spell.spellcomp_s);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellcomp_v", chaId, spell.spellcomp_v);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellconcentration", chaId, spell.spellconcentration);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldamage2", chaId, spell.spelldamage2);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldamage1", chaId, spell.spelldamage1);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldamagetype2", chaId, spell.spelldamagetype2);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldamagetype", chaId, spell.spelldamagetype);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldescription", chaId, spell.spelldescription);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelldmgmod", chaId, spell.spelldmgmod);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellduration", chaId, spell.spellduration);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellhealing", chaId, spell.spellhealing);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellhlbonus", chaId, spell.spellhlbonus);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellhldie", chaId, spell.spellhldie);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellhldietype", chaId, spell.spellhldietype);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelllevel", chaId, spell.spelllevel);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellname", chaId, spell.spellname);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelloutput", chaId, spell.spelloutput);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellrange", chaId, spell.spellrange);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellritual", chaId, spell.spellritual);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellsave", chaId, spell.spellsave);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellsavesuccess", chaId, spell.spellsavesuccess);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellschool", chaId, spell.spellschool);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellsource", chaId, spell.spellsource);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spelltarget", chaId, spell.spelltarget);
		attributeCreator("repeating_spell-cantrip_" + spellId + "_spellattackid", chaId, attackId);
		
		attributeCreator("repeating_attack_" + attackId + "_atkattr_base", chaId, spell.spell_ability);
		attributeCreator("repeating_attack_" + attackId + "_options-flag", chaId, "0");
		attributeCreator("repeating_attack_" + attackId + "_spellid", chaId, spellId);
		attributeCreator("repeating_attack_" + attackId + "_spelllevel", chaId, spell.spelllevel);
		attributeCreator("repeating_attack_" + attackId + "_savedc", chaId, "(@{spell_save_dc})");
		attributeCreator("repeating_attack_" + attackId + "_atkname", chaId, spell.spellname);
		attributeCreator("repeating_attack_" + attackId + "_atkflag", chaId, "{{attack=1}}");
		attributeCreator("repeating_attack_" + attackId + "_dmgbase", chaId, spell.spelldamage1);
		attributeCreator("repeating_attack_" + attackId + "_dmgflag", chaId, "{{damage=1}} {{dmg1flag=1}}");
		attributeCreator("repeating_attack_" + attackId + "_dmgattr", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_dmgtype", chaId, spell.spelldamagetype);
		attributeCreator("repeating_attack_" + attackId + "_dmg2base", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_dmg2attr", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_dmg2flag", chaId, 0);
		attributeCreator("repeating_attack_" + attackId + "_dmg2type", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_atkrange", chaId, spell.spellrange);
		attributeCreator("repeating_attack_" + attackId + "_saveflag", chaId, "0");
		attributeCreator("repeating_attack_" + attackId + "_saveeffect", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_hldmg", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_spell_innate", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_atk_desc", chaId, "");
		attributeCreator("repeating_attack_" + attackId + "_spelldesc_link", chaId, "%{" + chaId + "|repeating_spell-cantrip_" + spellId + "_output}");
		attributeCreator("repeating_attack_" + attackId + "_atkdmgtype", chaId, spell.spelldamage1 + " " + spell.spelldamagetype);
		
		attributeCreator("repeating_attack_" + attackId + "_rollbase_dmg", chaId, "@{wtype}&{template:dmg} {{rname=" + spell.spellname + "}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + spell.spelldamage1 + "]]}} {{dmg1type=" + spell.spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag} @{hldmg} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}");
		
		
		attributeCreator("repeating_attack_" + attackId + "_rollbase_crit", chaId, "@{wtype}&{template:dmg} {{crit=1}} {{rname=" + spell.spellname + "}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + spell.spelldamage1 + "]]}} {{dmg1type=" + spell.spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + spell.spelldamage1 + "]]}} {{crit2=[[0]]}} @{saveflag}  @{hldmg}  {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=[[0]]}} {{globaldamagecrit=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}");
		
		attributeCreator("repeating_attack_" + attackId + "_rollbase", chaId, "@{wtype}&{template:atkdmg} {{mod=@{atkbonus}}} {{rname=" + spell.spellname + "}} {{r1=[[@{d20}cs>@{atkcritrange} + @{spell_attack_bonus}]]}} @{rtype}cs>@{atkcritrange} + @{spell_attack_bonus}]]}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + spell.spelldamage1 + "]]}} {{dmg1type=" + spell.spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + spell.spelldamage1 + "[CRIT]]]}} {{crit2=[[0[CRIT]]]}} @{saveflag} @{hldmg}  {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globalattack=@{global_attack_mod}}} {{globaldamage=[[0]]}} {{globaldamagecrit=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}");
		
		
		
		attributeCreator("repeating_attack_" + attackId + "_atkbonus", chaId, "@{spell_attack_bonus}");
		
		
	}
	function deletePlayerCharacterSheets(){
		for(let i = 0; i < playerCharacters.length; i++){
			let dummy = findObjs({ type: "character", id: playerCharacterIds[i]})[0];
			if(dummy){ 
				dummy.remove();
			}
		}
		playerCharacters = [];
		playerCharacterIds = [];
	}
	
	function awardKillToPlayer(selected){
		if(selected == undefined){
			sendChat(PROJECT_NAME, "/w gm A Token has to be selected to be rewarded");
			return;
		}
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		attri = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "ep"})[0];
		attri.set({
			current: +attri.get("current") + +10,
		});
		sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has been awarded 10 EP");			
	}
	function playerBuyBarricade(selected, whereTo){
		if(selected == undefined){
			sendChat(PROJECT_NAME, "/w gm A Token has to be selected to be rewarded");
			return;
		}
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		
		let chaEP = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "ep"})[0];
		
		if(chaEP.get("current") < BARRICATE_PRICE){
			sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has not enouth EP to buy Barricade");
			return;
		}else{
			chaEP.set({
				current: +chaEP.get("current") - +BARRICATE_PRICE,
			})
		}		
		let tokenPosL, tokenPosT, rotation = 0;
		if(whereTo == "Top"){
			tokenPosL = 0;
			tokenPosT = -gridSize
			rotation = 90;
		}
		if(whereTo == "Down"){
			tokenPosL = 0;
			tokenPosT = gridSize	
			rotation = 90;		
		}
		if(whereTo == "Left"){
			tokenPosL = -gridSize;
			tokenPosT = 0			
		}
		if(whereTo == "Right"){			
			tokenPosL = gridSize;
			tokenPosT = 0	
		}		
		let data = {			
			pageid: gmPage.get("id"),
			left: token.get("left")+tokenPosL,
			top: token.get("top")+tokenPosT,
			width: 35,
			height: 70,
			layer: "objects",
			controlledby: "all",
			name: "Barricade",
			showname: false,
			imgsrc: "https://s3.amazonaws.com/files.d20.io/images/309191954/7yij40E5OHjqZUO14t3kqw/thumb.png?1665736427",
			bar1_value: 10,
			bar1_max: 10,
			bar2_value: 10,
			rotation: rotation,
		}
		token = createObj("graphic", data);
		barricadeTokens.push(token);
		barricadeTokenIds.push(token.get("id"));
		
	}
	function deleteBarricadeTokens(){
		for(let i = 0; i < barricadeTokenIds.length; i++){
			barricadeTokens[i].remove();
		}
	}
	function playerBuySlot(selected, slotNumber){
		if(selected == undefined){
			sendChat(PROJECT_NAME, "/w gm A Token has to be selected to be rewarded");
			return;
		}
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		let chaEP = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "ep"})[0];
		
		if(slotNumber == 1){
			if(chaEP.get("current") < SLOT1_PRICE){
				sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has not enouth EP to buy a Slot 1 roll");
				return;
			}else{
				chaEP.set({
					current: +chaEP.get("current") - +SLOT1_PRICE,
				})
			}						
		}
		if(slotNumber == 2){
			if(chaEP.get("current") < SLOT2_PRICE){
				sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has not enouth EP to buy a Slot 2 roll");
				return;
			}else{
				chaEP.set({
					current: +chaEP.get("current") - +SLOT2_PRICE,
				})
			}
		}
		let slotRoll;
		if(slotNumber == 1){
			slotRoll = getRandomIntInclusive(0, SLOT1_PERKS.length-1);
			sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has rolled: " + SLOT1_PERKS[slotRoll]);
		}
		if(slotNumber == 2){
			slotRoll = getRandomIntInclusive(0, SLOT2_PERKS.length-1);
			sendChat(PROJECT_NAME, "/w gm " + cha.get("name") + " has rolled: " + SLOT2_PERKS[slotRoll]);
		}
		
		if(slotRoll === 0){
			sendChat(PROJECT_NAME, "/w gm &{template:default}{{desc=[Improve Ability](" + PROJECT_HANDLE +  " --slotPerk " + slotNumber + " " + slotRoll + " ?{What ability to improve?|strength|dexterity|constitution|intelligence|wisdom|charisma}) }}");
		}
		if(slotRoll === 4){
			//"Weapon Upgrade",
		}
		if(slotRoll === 5){
			//"Cantrip Upgrade",
		}
		
		handleSlotPerk(selected, slotNumber, slotRoll);
		
	}
	function handleWeaponUpgrade(selected){		
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		
		let martialPos = getRandomIntInclusive(0, MARTIALWEAPONS.length - 1);
		let weaponNames = []
		
		for(let i = 0; i < MARTIALWEAPONS.length; i++){
			weaponNames.push(MARTIALWEAPONS[i].itemname);
		}
		
		for(let i = 0; i < playerCharacterPerks.length; i++){
			if(playerCharacterPerks[i].playerCharacterIds == cha.get("id")){
				
				weaponToUpgrade = weaponNames.filter(x => playerCharacterPerks[i].perkNames.includes(x))[0];				
				if(!weaponToUpgrade){
					addItemToPlayerCharacterSheet(cha.get("id"), MARTIALWEAPONS[martialPos]);
				}else{
					upgradeWeapon(playerCharacterPerks[i], weaponToUpgrade);	
					sendChat(PROJECT_NAME, "/w " + players[i].get("_displayname") + " Your " + weaponToUpgrade + " has been upgraded!");
				}
				
			}
		}
	}
	function upgradeWeapon(playerCharacterPerks, weaponToUpgrade){
		let perkPos = playerCharacterPerks.perkNames.indexOf(weaponToUpgrade);
		let attributeCurrent;
		let attributeCurrentAnzahl;
		let attributeCurrentDice;
		let attackId;
		
		let damagetype = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_dmgtype"})[0].get("current");
		
		attr = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_dmgbase"})[0];
		attributeCurrent = attr.get("current");
		attributeCurrentAnzahl = attributeCurrent.split("d")[0];
		attributeCurrentDice = attributeCurrent.split("d")[1];
		attributeCurrentAnzahl = +attributeCurrentAnzahl + 1
		
		attr.set({
			current: attributeCurrentAnzahl + "d" + attributeCurrentDice
		});
		
		attrBase = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_atkattr_base"})[0].get("current");
		
		attr = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_atkdmgtype"})[0];		
		attr.set({
			current: attributeCurrentAnzahl + "d" + attributeCurrentDice + attrBase + " " + damagetype,
		})
		
		attrRange = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_atkrange"})[0].get("current");
		
		attr = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_rollbase_dmg"})[0];	
		attr.set({
			current: "@{wtype}&{template:dmg} {{rname=" + weaponToUpgrade + "}} @{atkflag} {{range=" + attrRange + "}} @{dmgflag} {{dmg1=[["+ attributeCurrentAnzahl + "d" + attributeCurrentDice + " + " + attrBase + "]]}} {{dmg1type=" + damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag}"
		})
		
		attr = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_rollbase_crit"})[0];	
		attr.set({
			current: "@{wtype}&{template:dmg} {{crit=1}} {{rname=" +weaponToUpgrade + "}} @{atkflag} {{range=" + attrRange + "}} @{dmgflag} {{dmg1=[["+ attributeCurrentAnzahl + "d" + attributeCurrentDice + " + " + attrBase + "]]}} {{dmg1type=" + damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" +attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} @{saveflag}"
		})
		
		attr = findObjs({ name: "repeating_attack_" + playerCharacterPerks.perkIds[perkPos] + "_rollbase"})[0];	
		attr.set({
			current: "@{wtype}&{template:atkdmg} {{mod=" + attrBase + "}} {{rname=" + weaponToUpgrade + "}} {{r1=[[@{d20}cs>20 + " + attrBase + "]]}} @{rtype}cs>20" + attrBase + " ]]}} @{atkflag} {{range="+ attrRange + "}} @{dmgflag} {{dmg1=[["+ attributeCurrentAnzahl + "d" + attributeCurrentDice + " + " + attrBase + "]]}} {{dmg1type=" + damagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} {{crit2=[[0[CRIT]]]}} @{saveflag} "
		})
		
	}
	function handleCantrip(selected, slotRoll){
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		
		let cantripPos;		
		let cantripNames = []
		
		for(let i = 0; i < CANTRIPS.length; i++){
			cantripNames.push(CANTRIPS[i].spellname);
		}
		
		if(slotRoll == 3){ //new Cantrip
			for(let i = 0; i < playerCount; i++){
				if(playerCharacterIds[i] == cha.get("id")){					
					cantripsToGive = cantripNames.filter(x => !playerCharacterPerks[i].perkNames.includes(x));					
					if(cantripsToGive.length == cantripNames.length){
						cantripPos = getRandomIntInclusive(0, CANTRIPS.length - 1);
						addCantripToPlayerCharacterSheet(selected, CANTRIPS[cantripPos]);
						sendChat(PROJECT_NAME, "/w " + players[i].get("_displayname") + " " + CANTRIPS[cantripPos].spellname + " has been added!");
					}else{
						handleCantrip(selected, 5);
					}			
				}
			}
		}
		if(slotRoll == 5){ //upgrade Cantrip
			for(let i = 0; i < playerCount; i++){
				if(playerCharacterIds[i] == cha.get("id")){
					cantripToUpgrade = cantripNames.filter(x => playerCharacterPerks[i].perkNames.includes(x))[0];					
					if(!cantripToUpgrade){
						handleCantrip(selected, 3);
					}else{
						upgradeCantrip(playerCharacterPerks[i],cantripToUpgrade);	
						sendChat(PROJECT_NAME, "/w " + players[i].get("_displayname") + " Your " + cantripToUpgrade + " has been upgraded!");
					}
								
				}
			}			
		}
		
		
	}
	function upgradeCantrip(playerCharacterPerks,cantripToUpgrade){
		let perkPos = playerCharacterPerks.perkNames.indexOf(cantripToUpgrade);
		let attributeCurrent;
		let attributeCurrentAnzahl;
		let attributeCurrentDice;
		let attackId;
		let spelldamagetype = findObjs({ name: "repeating_spell-cantrip_" + playerCharacterPerks.perkIds[perkPos] + "_spelldamagetype"})[0].get("current");
		
		
		attr = findObjs({ name: "repeating_spell-cantrip_" + playerCharacterPerks.perkIds[perkPos] + "_spelldamage1"})[0];
			
		attributeCurrent = attr.get("current");
		attributeCurrentAnzahl = attributeCurrent.split("d")[0];
		attributeCurrentDice = attributeCurrent.split("d")[1];
		attributeCurrentAnzahl = +attributeCurrentAnzahl + 1
		
		attr.set({
			current: attributeCurrentAnzahl + "d" + attributeCurrentDice
		});
		
		attr = findObjs({ name: "repeating_spell-cantrip_" + playerCharacterPerks.perkIds[perkPos] + "_spellattackid"})[0];
		attackId = attr.get("current");
		
		attr = findObjs({ name: "repeating_attack_" + attackId + "_dmgbase"})[0];
		attr.set({
			current: attributeCurrentAnzahl + "d" + attributeCurrentDice
		});
		
		attr = findObjs({ name: "repeating_attack_" + attackId + "_rollbase_dmg"})[0];
		attr.set({
			current: "@{wtype}&{template:dmg} {{rname=" + cantripToUpgrade + "}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} {{dmg1type=" + spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} @{saveflag} @{hldmg} {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}"
		});
		
		attr = findObjs({ name: "repeating_attack_" + attackId + "_rollbase_crit"})[0];
		attr.set({
			current: "@{wtype}&{template:dmg} {{crit=1}} {{rname=" + cantripToUpgrade + "}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} {{dmg1type=" + spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} {{crit2=[[0]]}} @{saveflag}  @{hldmg}  {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globaldamage=[[0]]}} {{globaldamagecrit=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}"
		});
		
		attr = findObjs({ name: "repeating_attack_" + attackId + "_rollbase"})[0];
		attr.set({
			current: "@{wtype}&{template:atkdmg} {{mod=@{atkbonus}}} {{rname=" + cantripToUpgrade + "}} {{r1=[[@{d20}cs>@{atkcritrange} + @{spell_attack_bonus}]]}} @{rtype}cs>@{atkcritrange} + @{spell_attack_bonus}]]}} @{atkflag} {{range=@{atkrange}}} @{dmgflag} {{dmg1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "]]}} {{dmg1type=" + spelldamagetype + "}} @{dmg2flag} {{dmg2=[[0]]}} {{dmg2type=}} {{crit1=[[" + attributeCurrentAnzahl + "d" + attributeCurrentDice + "[CRIT]]]}} {{crit2=[[0[CRIT]]]}} @{saveflag} @{hldmg}  {{spelllevel=@{spelllevel}}} {{innate=@{spell_innate}}} {{globalattack=@{global_attack_mod}}} {{globaldamage=[[0]]}} {{globaldamagecrit=[[0]]}} {{globaldamagetype=@{global_damage_mod_type}}} ammo=@{ammo} {{spelldesc_link=[Show Spell Description](~repeating_attack_spelldesc_link)}} @{charname_output}"
		});
		
		
		
	}
	function handleACup(selected, slotNumber, acToGain){
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];		
		let attr = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "ac"})[0];
		if(attr){
			attr.set({
				current: attr.get("current") + (acToGain*slotNumber)
			});
		}
	}
	function handleHPup(selected, slotNumber, hpToGain){
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];		
		let attr = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "hp"})[0];
		if(attr){
			attr.set({
				max: attr.get("max") + (hpToGain*slotNumber)
			});
		}
	}
	function handleAbilityImprovment(selected, slotNumber, abilityToImprov){		
		let token = findObjs({_type:"graphic", _id: selected[0]._id})[0];
		let cha = findObjs({_type:"character", _id: token.get("represents")})[0];
		
		let attr = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: abilityToImprov})[0];
		if(attr){
			attr.set({
				current: attr.get("current") + (2*slotNumber),
			});
		}
		attr = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: abilityToImprov+"_mod"})[0];
		if(attr){
			attr.set({
				current: attr.get("current") + (1*slotNumber),
			});
		}
		if(abilityToImprov === "constitution"){
			attr = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "hp"})[0];
			if(attr){
				attr.set({
					current: +attr.get("current") + +slotNumber,
					max: +attr.get("max") + +slotNumber,
				})
			}
		}		
		if(abilityToImprov === "intelligence" || abilityToImprov === "wisdom" ||abilityToImprov === "charisma"){
			let int_mod = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "intelligence_mod"})[0].get("current");
			let wis_mod = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "wisdom_mod"})[0].get("current");
			let cha_mod = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "charisma_mod"})[0].get("current");	
			
			let spellAb = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "spellcasting_ability"})[0];
			let spellat = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "spell_attack_bonus"})[0];
			let spelldc = findObjs({ _type: "attribute", _characterid: cha.get("id"), name: "spell_save_dc"})[0];
			
			let max = 0;
			let isHeighest = "";
			
			if(int_mod > wis_mod){
				max = int_mod;
				isHeighest = "int";
			}else{
				max = wis_mod;
				isHeighest = "wis";
			}
			if(cha_mod>max){				
				max = cha_mod;
				isHeighest = "cha";
			}
			
			if(isHeighest === "int" && abilityToImprov == "intelligence"){
				spellAb.set({ current: "@{intelligence_mod}+" });
				spellat.set({ current: 2 + int_mod});
				spelldc.set({ current: 10+ int_mod});
			}
			if(isHeighest === "wis" && abilityToImprov == "wisdom"){
				spellAb.set({ current: "@{wisdom_mod}+" });
				spellat.set({ current: 2 + wis_mod});
				spelldc.set({ current: 10+ wis_mod});
			}
			if(isHeighest === "cha" && abilityToImprov == "charisma"){
				spellAb.set({ current: "@{charisma_mod}+" });
				spellat.set({ current: 2 + cha_mod});
				spelldc.set({ current: 10+ cha_mod});
			}
			
		}
	}
	function handleSlotPerk(selected, slotNumber, slotRoll, perkOptions){
		if(selected == undefined){
			sendChat(PROJECT_NAME, "/w gm A Token has to be selected to be rewarded");
			return;
		}
		if(slotRoll == 0){
			handleAbilityImprovment(selected, slotNumber, perkOptions)
		}
		if(slotRoll == 1){
			handleHPup(selected, slotNumber, 5);
		}
		if(slotRoll == 2){
			handleACup(selected, slotNumber, 1);
		}
		if(slotRoll == 3){
			handleCantrip(selected, slotRoll);
		}
		if(slotRoll == 4){
			handleWeaponUpgrade(selected);
		}
		if(slotRoll == 5){
			handleCantrip(selected, slotRoll);
		}
	}
	
	
	function showMenu(){
		let desc = "";
		desc += PROJECT_NAME + " Menu \n \n";
		desc += "[Start Game](" + PROJECT_HANDLE + " --startGame) \n";		
		desc += "[Stop Game](" + PROJECT_HANDLE + " --stopGame) \n \n";
		
		desc += "[Spawn Zombies](" + PROJECT_HANDLE + " --spawnZombies ?{How many Zombies?}) \n";
		desc += "[Delete Zombies](" + PROJECT_HANDLE + " --deleteZombies) \n";
		desc += "[Award Kill](" + PROJECT_HANDLE + " --awardKill) \n\n";
		if(isActiveOptions){ 
			desc += PROJECT_NAME + " Options: \n \n";
			
			desc += "[Difficulty](" + PROJECT_HANDLE + " --setDifficulty ?{Select Difficulty";
			for(let i = 0; i < GAMEDIFFICULTYS.length; i++){
				desc += "|" + GAMEDIFFICULTYS[i];
			}
			desc += "}) \n";	
		}
		desc += "\n\n [Toggle Options](" + PROJECT_HANDLE + " --toggleOptions) \n \n";
		
		sendChat(PROJECT_NAME, "/w gm &{template:default}{{desc=" + desc + "}}");
	}
	
	// on Ready 
	on("ready", function(){
		initVars();
		checkMacros();
	});
	
	// Init Vars
	function initVars(){		
		initGM();
		initPlayer();
	}	
	function initGM(){
		gmPlayer = findObjs({_type:"player"}).filter(p => playerIsGM(p.get('_id')))[0];
		if(!gmPlayer || gmPlayer == undefined){
			log(PROJECT_NAME + " --> No GM found!");
		}
		gmPage = findObjs({ _type: "page", _id: gmPlayer.get("lastpage")})[0];
		if(!gmPage || gmPage == undefined){
			log(PROJECT_NAME + " --> No GM lastpage found!");
			gmPage = findObjs({ _type: "page"})[0];
		}
		// TODO check for gridSize via gmPage -> dynamic
		gridSize = 70;
	}
	function initPlayer(){
		players = findObjs({ _type: "player"}); 
		for(let i = 0; i < players.length; i++){
			if(playerIsGM(players[i].get("id"))){
				players.splice(i,1);
			}
		}
		if(!players || players == undefined){
			log(PROJECT_NAME + " --> No Players found!");
			sendChat(PROJECT_NAME, "/w gm &{template:default}{{desc=Currently no Players found!}}");
		}
		if(players.length > 8){
			log(PROJECT_NAME + " --> Currently too many Players found!");
			sendChat(PROJECT_NAME, "/w gm &{template:default}{{desc=Currently too many Players found!}}");
			players.splice(8, players.length - 8);
		}
		playerCount = players.length;
	}
	
	// check Macros
	function checkMacros(){
		for(let i = 0; i < MACRO_NAMES.length;i++){
			let macro = findObjs({ _type: "macro", name: MACRO_NAMES[i]})[0];
			if(!macro){
				log(PROJECT_NAME + " --> Macro: " + MACRO_NAMES[i] + " NOT Found!");
				log(PROJECT_NAME + " --> Creating Macro: " + MACRO_NAMES[i]);
				createMacros(MACRO_NAMES[i]);
			}
		}
		log(PROJECT_NAME + " --> All Macros Ready");
	}
	function createMacros(macroname){	
		let API_DnD_Zombies_Menu = {
			name: "API-DnD-Zombies-Menu",
			action: PROJECT_HANDLE + " --showMenu",
			istokenaction: false,
			visibleto: "",
			_playerid: gmPlayer.get("id")			
		}
		switch(macroname){
			case "API-DnD-Zombies-Menu":
				createObj("macro", API_DnD_Zombies_Menu);
			break;
		}
		
	}
	
	// Help Functions
	function integerCheck(int){		
		if(parseInt(int)){
			return true;
		}
		if(int.includes(",") || int.includes(".")){
			sendChat(PROJECT_NAME, "/w gm Number must be a hole Number");
			return false;
		}
		return false;
	}
	function getRandomPos(max){
		max = max * gridSize;
		let randomInt = getRandomIntInclusive(gridSize, max-gridSize);
		randomInt = randomInt / gridSize;
		randomInt = Math.round(randomInt);	
		return (randomInt * gridSize)+30;
	}	
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
	}
	
	const generateUUID = (() => {
    let a = 0;
    let b = [];

    return () => {
        let c = (new Date()).getTime() + 0;
        let f = 7;
        let e = new Array(8);
        let d = c === a;
        a = c;
        for (; 0 <= f; f--) {
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
            c = Math.floor(c / 64);
        }
        c = e.join("");
        if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
                b[f] = 0;
            }
            b[f]++;
        } else {
            for (f = 0; 12 > f; f++) {
                b[f] = Math.floor(64 * Math.random());
            }
        }
        for (f = 0; 12 > f; f++){
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
})();
	const generateRowID = () => generateUUID().replace(/_/g, "Z");
	
	
})();

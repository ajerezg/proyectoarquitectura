// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
	// A 2D array to keep track of all occupied tiles
	this.occupied = new Array(Game.map_grid.width);
	for (var i = 0; i < Game.map_grid.width; i++) {
		this.occupied[i] = new Array(Game.map_grid.height);
		for (var y = 0; y < Game.map_grid.height; y++) {
			this.occupied[i][y] = true;
		}
	}
	 
	// Place a border at every edge square on our grid of 16x16 tiles
	for (var x = 0; x < Game.map_grid.width; x++) {
		for (var y = 0; y < Game.map_grid.height; y++) {
			var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
			 
			if (at_edge) {
				// Place a tree entity at the current tile
				Crafty.e('Borde').at(x, y)
			}// else if (Math.random() < 0.06 && !this.occupied[x][y]) {
			// Place a bush entity at the current tile
			//var bush_or_rock = (Math.random() > 0.3) ? 'Bush' : 'Rock'
			//Crafty.e(bush_or_rock).at(x, y)
			//this.occupied[x][y] = true;
			//}
		}
	}
	//place a border at 21x2:14 to separate the game area
	 for (var i = 1; i < Game.map_grid.width - 1; i++){
	 	Crafty.e('Borde').at(21,i)
	 }
	 //place the wires
	 var wiresY = [4, 8, 12];
	 var wiresX = [2, 3, 4, 6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19]
	 for (var i = 0; i < wiresX.length; i++ ){
	 	for (var j = 0; j < wiresY.length; j++){
	 		Crafty.e('Cable').at(wiresX[i], wiresY[j])
	 	}
	 }
	 //place Bits
	 Crafty.e('Bit').at(1, 4)
	 Crafty.e('Bit').at(1, 8)
	 Crafty.e('Bit').at(1, 12)
	 Crafty.e('Bit').at(20, 4)
	 Crafty.e('Bit').at(20, 8)
	 Crafty.e('Bit').at(20, 12)
	 //set possible place to put things
	 this.occupied[5][4] = false;
	 this.occupied[5][8] = false;
	 this.occupied[5][12] = false;

	 this.occupied[11][4] = false;
	 this.occupied[11][8] = false;
	 this.occupied[11][12] = false;

	 this.occupied[16][4] = false;
	 this.occupied[16][8] = false;
	 this.occupied[16][12] = false;
	 //place the things
	 Crafty.e('Compuerta').at(23,2).Compuerta(23,2,this.occupied)
	 Crafty.e('Compuerta').at(23,4).Compuerta(23,4,this.occupied)
	 Crafty.e('Compuerta').at(23,6).Compuerta(23,6,this.occupied)

	 Crafty.e('Compuerta').at(25,2).Compuerta(25,2,this.occupied)
	 Crafty.e('Compuerta').at(25,4).Compuerta(25,4,this.occupied)
	 Crafty.e('Compuerta').at(25,6).Compuerta(25,6,this.occupied)

	 Crafty.e('Compuerta').at(27,2).Compuerta(27,2,this.occupied)
	 Crafty.e('Compuerta').at(27,4).Compuerta(27,4,this.occupied)
	 Crafty.e('Compuerta').at(27,6).Compuerta(27,6,this.occupied)


	// Play a ringing sound to indicate the start of the journey
	Crafty.audio.play('ring');
 });
// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
// Draw some text for the player to see in case the file
// takes a noticeable amount of time to load
Crafty.e('2D, DOM, Text')
.text('Cargando, por favor espere...')
.attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
.textFont($text_css);
 
// Load our sprite map image
Crafty.load([
'assets/16x16_forest_2.png',
'assets/door_knock_3x.mp3',
'assets/door_knock_3x.ogg',
'assets/door_knock_3x.aac',
'assets/board_room_applause.mp3',
'assets/board_room_applause.ogg',
'assets/board_room_applause.aac',
'assets/candy_dish_lid.mp3',
'assets/candy_dish_lid.ogg',
'assets/candy_dish_lid.aac'
], function(){
// Once the images are loaded...
 
// Define the individual sprites in the image
// Each one (spr_tree, etc.) becomes a component
// These components' names are prefixed with "spr_"
// to remind us that they simply cause the entity
// to be drawn with a certain sprite
Crafty.sprite(16, 'assets/16x16_forest_2.png', {
spr_borde: [1, 0],
spr_compuerta: [0, 1],
spr_bit: [1, 1]
});
Crafty.sprite(32, 'assets/16x16_forest_2.png', {
spr_cable: [0, 0],
});
 
// Define our sounds for later use
Crafty.audio.add({
knock: ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'],
applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
ring: ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac']
});
 
// Now that our sprites are ready to draw, start the game
Crafty.scene('Game');
});
});

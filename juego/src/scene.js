// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game1', function() {
	// A 2D array to keep track of all occupied tiles
	this.occupied = new Array(Game.map_grid.width);
	for (var i = 0; i < Game.map_grid.width; i++) {
		this.occupied[i] = new Array(Game.map_grid.height);
		for (var y = 0; y < Game.map_grid.height; y++) {
			this.occupied[i][y] = false;
		}
	}
	 
	// Place a border at every edge square on our grid of 16x16 tiles
	for (var x = 0; x < Game.map_grid.width; x++) {
		for (var y = 0; y < Game.map_grid.height; y++) {
			var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;
			 
			if (at_edge) {
				// Place a tree entity at the current tile
				Crafty.e('Borde').at(x, y)
				this.occupied[x][y] = true;
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
	 	this.occupied[21][i] = true;
	 }
	 //place the wires
	 for(var i=2;i<20;i++){
	 	//condiciones para horizontales
	 	if(i!=8 && i!=6 && i!=12){
	 		Crafty.e('Cable_hor').at(i,3);
	 		this.occupied[i][3] = true;
	 	}
	 	if(i<7 || i>14){
	 		Crafty.e('Cable_hor').at(i,9);
	 		this.occupied[i][9] = true;
	 	}
	 	if(i<10){
	 		Crafty.e('Cable_hor').at(i,12);
	 		this.occupied[i][12] = true;
	 	}
	 	if(i==8 || i==9 || i==13){
	 		Crafty.e('Cable_hor').at(i,8);
	 		this.occupied[i][8] = true;
	 		Crafty.e('Cable_hor').at(i,10);
	 		this.occupied[i][10] = true;
	 	}
	 	if(i==9){
	 		Crafty.e('Cable_hor').at(i,6);
	 		this.occupied[i][6] = true;
	 	}
	 	if(i==11){
	 		Crafty.e('Cable_hor').at(i,7);
	 		this.occupied[i][7] = true;
	 		Crafty.e('Cable_hor').at(i,11);
	 		this.occupied[i][11] = true;
	 	}
	 }
	 Crafty.e('Cable_ver').at(8,4);
	 this.occupied[8][4] = true;
	 Crafty.e('Cable_ver').at(8,5);
	 this.occupied[8][5] = true;
	 Crafty.e('Cable_cod1').at(7,8);
	 this.occupied[7][8] = true;
	 Crafty.e('Cable_tri4').at(7,9);
	 this.occupied[7][8] = true;
	 Crafty.e('Cable_cod4').at(7,10);
	 this.occupied[7][10] = true;
	 Crafty.e('Cable_cod4').at(8,6);
	 this.occupied[8][6] = true;
	 Crafty.e('Cable_cod2').at(12,7);
	 this.occupied[12][7] = true;
	 Crafty.e('Cable_cod4').at(12,8);
	 this.occupied[12][8] = true;
	 Crafty.e('Cable_cod1').at(12,10);
	 this.occupied[12][10] = true;
	 Crafty.e('Cable_cod3').at(12,11);
	 this.occupied[12][11] = true;
	 Crafty.e('Cable_tri2').at(8,3);
	 this.occupied[8][3] = true;

	 //place Bits
	 Crafty.e('In1').at(1, 3)
	 Crafty.e('In1').at(1, 9)
	 Crafty.e('In0').at(1, 12)
	 Crafty.e('Out1').at(20, 3)
	 Crafty.e('Out0').at(20, 9)
	 //place the things
	 var selector_chico = Crafty.e('Selector_chico').at(-1,-1);
	 var selector_grande = Crafty.e('Selector_grande').at(-1,-1);
	 var compuertas = [];
	 compuertas.push(Crafty.e('Not').at(23,2).compuerta(23,2,this.occupied,selector_chico));
	 compuertas.push(Crafty.e('Not').at(25,2).compuerta(25,2,this.occupied,selector_chico));

	 compuertas.push(Crafty.e('And').at(23,4).compuerta(23,4,this.occupied,selector_grande));
	 compuertas.push(Crafty.e('And').at(25,4).compuerta(25,4,this.occupied,selector_grande));
	
	 compuertas.push(Crafty.e('Or').at(27,4).compuerta(27,4,this.occupied,selector_grande));

	 //condiciones para ganar. Cuidado con tener varias soluciones para el problema.
	 var condiciones = [];
	 condiciones[0]=[];
	 condiciones[0].push(['not',6,3]);
	 condiciones[0].push(['not',12,3]);
	 condiciones[0].push(['and',10,6]);
	 condiciones[0].push(['and',10,10]);
	 condiciones[0].push(['or',14,8]);
	 //otra posible solucion
	 condiciones[1]=[];
	 condiciones[1].push(['not',6,3]);
	 condiciones[1].push(['not',12,3]);
	 condiciones[1].push(['and',10,6]);
	 condiciones[1].push(['or',10,10]);
	 condiciones[1].push(['and',14,8]);
	 //otra mas
	 condiciones[2]=[];
	 condiciones[2].push(['not',6,3]);
	 condiciones[2].push(['not',12,3]);
	 condiciones[2].push(['or',10,6]);
	 condiciones[2].push(['and',10,10]);
	 condiciones[2].push(['and',14,8]);
	 

	 var controlador=Crafty.e('Victoria').Victoria(compuertas, condiciones);
	 //Crafty.addEvent(controlador, Crafty.stage.elem,'Revisar', controlador.revisar);



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
'assets/board.png',
'assets/board_big_ones.png',
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
Crafty.sprite(32, 'assets/cables.png', {
	spr_chor:[0,0],
	spr_cver:[1,0],
	spr_cmul:[2,0],
	spr_ccod1:[0,1],
	spr_ccod2:[1,1],
	spr_ccod3:[2,1],
	spr_ccod4:[3,1],
	spr_ctri1:[0,2],
	spr_ctri2:[1,2],
	spr_ctri3:[2,2],
	spr_ctri4:[3,2],
	spr_borde:[3,0]
});

Crafty.sprite(32, 'assets/io_not.png', {
	spr_in0:[2,0],
	spr_in1:[3,0],
	spr_out0:[0,0],
	spr_out1:[1,0],
	spr_selecting:[3,1],
	spr_not1:[0,1],
	spr_not2:[1,1],
	spr_not3:[2,1]
})

Crafty.sprite(32, 'assets/board_big_ones.png', {
	spr_and:[0,0,1,3],
	spr_or:[0,3,1,3],
	spr_selecting_big:[2,0,1,3]
});

 
// Define our sounds for later use
Crafty.audio.add({
knock: ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'],
applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
ring: ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac']
});
 
// Now that our sprites are ready to draw, start the game
Crafty.scene('Game1' );
});
});

// The Grid component allows an element to be located
// on a grid of tiles
Crafty.c('Grid', {
init: function() {
this.attr({
w: Game.map_grid.tile.width,
h: Game.map_grid.tile.height
});
},
 
// Locate this entity at the given position on the grid
at: function(x, y) {
if (x === undefined && y === undefined) {
	return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
}
else {
	this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
	return this;
}
}
});
 
// An "Actor" is an entity that is drawn in 2D on canvas
// via our logical coordinate grid
Crafty.c('Actor', {
init: function() {
this.requires('2D, Canvas, Grid');
},
});
 
// A Tree is just an Actor with a certain sprite
Crafty.c('Borde', {
init: function() {
this.requires('Actor, Solid, spr_borde');
},
});
 
// A Bush is just an Actor with a certain sprite
Crafty.c('Cable', {
init: function() {
this.requires('Actor, Solid, spr_cable');
},
});
 
// A Rock is just an Actor with a certain sprite
Crafty.c('Bit', {
init: function() {
this.requires('Actor, Solid, spr_bit');
},
});
 
// This is the player-controlled character
 
// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Compuerta', {
_coordX: 0,
_coordY: 0,
_occupied: [],
init: function() {
this.requires('Actor, spr_compuerta, Draggable').bind('StopDrag', this.snapOrBack);
},
//Funcion para setear coordenadas iniciales
Compuerta: function(x, y, occupied){
	this.coordX = x;
	this.coordY = y;
	this.occupied = occupied;
	return this;
},
snapOrBack: function(){
	var x = Math.floor(this._x / Game.map_grid.tile.width);
	var y = Math.floor(this._y / Game.map_grid.tile.height);
	if (!this.occupied[x][y]){
		this.coordX = x;
		this.coordY = y;
		this.occupied[x][y] = true;
		this.at(x,y)
	}
	else{
		this.at(this.coordX, this.coordY)
	}
}
});

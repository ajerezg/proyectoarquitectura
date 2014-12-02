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
 

Crafty.c('Borde', {
init: function() {
this.requires('Actor, Solid, spr_borde');
},
});
 
//Distintas entidades para los distintos cables
Crafty.c('Cable_hor', {
init: function() {
this.requires('Actor, Solid, spr_chor');
},
});

Crafty.c('Cable_ver', {
init: function() {
this.requires('Actor, Solid, spr_cver');
},
});

Crafty.c('Cable_cod1', {
init: function() {
this.requires('Actor, Solid, spr_ccod1');
},
});
Crafty.c('Cable_cod2', {
init: function() {
this.requires('Actor, Solid, spr_ccod2');
},
});
Crafty.c('Cable_cod3', {
init: function() {
this.requires('Actor, Solid, spr_ccod3');
},
});
Crafty.c('Cable_cod4', {
init: function() {
this.requires('Actor, Solid, spr_ccod4');
},
});

Crafty.c('Cable_tri1', {
init: function() {
this.requires('Actor, Solid, spr_ctri1');
},
});
Crafty.c('Cable_tri2', {
init: function() {
this.requires('Actor, Solid, spr_ctri2');
},
});
Crafty.c('Cable_tri3', {
init: function() {
this.requires('Actor, Solid, spr_ctri3');
},
});
Crafty.c('Cable_tri4', {
init: function() {
this.requires('Actor, Solid, spr_ctri4');
},
});

Crafty.c('Cable_mul', {
init: function() {
this.requires('Actor, Solid, spr_cmul');
},
});
 
//Bits de entrada y salida
Crafty.c('In0', {
init: function() {
this.requires('Actor, Solid, spr_in0');
},
});
Crafty.c('In1', {
init: function() {
this.requires('Actor, Solid, spr_in1');
},
});
Crafty.c('Out0', {
init: function() {
this.requires('Actor, Solid, spr_out0');
},
});
Crafty.c('Out1', {
init: function() {
this.requires('Actor, Solid, spr_out1');
},
});
 
Crafty.c('Selector_chico', {
init: function() {
this.requires('Actor, spr_selecting');
}
});

Crafty.c('Selector_grande', {
init: function() {
this.requires('Actor, spr_selecting_big');
}
});

 

Crafty.c('Compuerta', {
_occupied: [],
_framing: 0,
init: function() {
	_coordX: 0;
	_coordY: 0;
	this.requires('Actor, Draggable');
	this.bind('StopDrag', this.snapOrBack);
	this.bind('Dragging', this.follow);
},
//Funcion para setear coordenadas iniciales
compuerta: function(x, y, occupied, selector){
	this.coordX = x;
	this.coordY = y;
	this.occupied = occupied;
	this.framing = selector;
	return this;
},
follow: function(){
	var x = Math.floor(this._x / Game.map_grid.tile.width);
	var y = Math.floor(this._y / Game.map_grid.tile.height);
	this.framing.at(x, y);
}
});

Crafty.c('Not', {
	init: function() {
		this.requires('Compuerta, spr_not1');
	},
	snapOrBack: function(){
		var x = Math.floor(this._x / Game.map_grid.tile.width);
		var y = Math.floor(this._y / Game.map_grid.tile.height);
		if (!this.occupied[x][y]){
			this.occupied[this.coordX][this.coordY] = false;
			this.coordX = x;
			this.coordY = y;
			this.occupied[x][y] = true;
			this.at(x,y);
			Crafty.trigger('Revisar');

		}
		else{
			this.at(this.coordX, this.coordY)
		}
		this.framing.at(-1,-1);
	},
	getData: function(){
		var x = Math.floor(this._x / Game.map_grid.tile.width);
		var y = Math.floor(this._y / Game.map_grid.tile.height);
		return ['not', x, y];
	}
});

Crafty.c('And', {
	init: function(){
		this.requires('Compuerta, spr_and');
	},
	snapOrBack: function(){
	var x = Math.floor(this._x / Game.map_grid.tile.width);
	var y = Math.floor(this._y / Game.map_grid.tile.height);
	if (!this.occupied[x][y] && !this.occupied[x][y+2]){
		this.occupied[this.coordX][this.coordY] = false;
		this.occupied[this.coordX][this.coordY+1] = false;
		this.occupied[this.coordX][this.coordY+2] = false;
		this.coordX = x;
		this.coordY = y;
		this.occupied[x][y] = true;
		this.occupied[x][y+1] = true;
		this.occupied[x][y+2] = true;
		this.at(x,y);
		Crafty.trigger('Revisar');

	}
	else{
		this.at(this.coordX, this.coordY)
	}
	this.framing.at(-1,-1);
	},
	getData: function(){
		var x = Math.floor(this._x / Game.map_grid.tile.width);
		var y = Math.floor(this._y / Game.map_grid.tile.height);
		return ['and', x, y];
	}
});

Crafty.c('Or', {
	init: function(){
		this.requires('Compuerta, spr_or');
	},
	snapOrBack: function(){
	var x = Math.floor(this._x / Game.map_grid.tile.width);
	var y = Math.floor(this._y / Game.map_grid.tile.height);
	if (!this.occupied[x][y] && !this.occupied[x][y+2]){
		this.occupied[this.coordX][this.coordY] = false;
		this.occupied[this.coordX][this.coordY+1] = false;
		this.occupied[this.coordX][this.coordY+2] = false;
		this.coordX = x;
		this.coordY = y;
		this.occupied[x][y] = true;
		this.occupied[x][y+1] = true;
		this.occupied[x][y+2] = true;
		this.at(x,y);
		Crafty.trigger('Revisar');
	}
	else{
		this.at(this.coordX, this.coordY)
	}
	this.framing.at(-1,-1);
	},
	getData: function(){
		var x = Math.floor(this._x / Game.map_grid.tile.width);
		var y = Math.floor(this._y / Game.map_grid.tile.height);
		return ['or', x, y];
	}
});

//Controlador de victoria
Crafty.c('Victoria', {
	compuertas:[],
	condiciones:[],
	cumplidas:[],
	movimientos: 0,
	init: function(){
		this.bind('Revisar', this.revisar);
	},
	Victoria: function(compuertas, condiciones) {
		this.compuertas = compuertas;
		this.condiciones = condiciones;
		this.movimientos = 0;
		for(var i=0; i<this.condiciones[0].length;++i){
			this.cumplidas.push(false);
		}
		return this;
	},
	getMovements: function(){
		return 'Movimientos: '+this.movimientos;
	},
	revisar: function() {
		++this.movimientos;
		var i;
		var j;
		var k;
		for(k=0; k<this.condiciones.length;++k){
			for(i = 0; i < this.condiciones[k].length; ++i){
				this.cumplidas[i]=false;
				for(j = 0; j < this.compuertas.length; ++j){
					var compuerta = this.compuertas[j].getData();
					if(compuerta[0]==this.condiciones[k][i][0] && compuerta[1]==this.condiciones[k][i][1] && compuerta[2]==this.condiciones[k][i][2]){
						this.cumplidas[i]=true;
					}
				}
			}
			var victoria = true;
			for(i=0;i<this.cumplidas.length;++i){
				victoria = victoria && this.cumplidas[i];
			}
			if(victoria){
				for(i=0;i<this.compuertas.length;++i){
					this.compuertas[i].disableDrag();
				}
				var victoria = Crafty.e('2D, Canvas, Text, Grid');
				victoria.text("CORRECTO!!!");
				victoria.textFont({size:'100px', weight:'bold', family:'Courier New'});
				victoria.at(6,5);
				var datos = Crafty.e('2D, Canvas, Text, Grid');
				datos.text(this.getMovements());
				datos.textFont({size: '50px', weight: 'bold', family:'Courier New'});
				datos.at(10,8);
				break;
			}
		}
		//alert(this.condiciones);
		//alert(this.compuertas[0].getData());
		
	}
});

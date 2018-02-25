function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tmw_desert_spacing', 'desert')

	groundLayer = map.createLayer('Ground')
	wallLayer = map.createLayer('Wall')
	map.setCollisionBetween(1, 10000, true, 'Wall')
	groundLayer.resizeWorld()
}

function createPlayer() {
	ai = new AI()
	// The player and its settings
	position = getPos(10, 1)
	player = game.add.sprite(position.x, position.y, 'dude')
	player.facing = Phaser.DOWN
	player.animations.add('left', [0, 1, 2, 3], 10, true)
	player.animations.add('right', [5, 6, 7, 8], 10, true)
	player.animations.add('up', [5, 6, 7, 8], 10, true)
	player.animations.add('down', [0, 1, 2, 3], 10, true)
	
	starPos = getPos(4, 4)
	star = game.add.sprite(starPos.x, starPos.y, 'star');
	game.physics.arcade.enable(star);
}

function create (){
	createMap()
	createPlayer()

	cursors = game.input.keyboard.createCursorKeys();
}


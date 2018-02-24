function createMap() {
	map = game.add.tilemap('tilemap');
	map.addTilesetImage('tmw_desert_spacing', 'desert')
	map.addTilesetImage('walls_1x2', 'walls')

	groundLayer = map.createLayer('Ground')
	wallLayer = map.createLayer('Wall')
	map.setCollisionBetween(1, 10000, true, 'Wall')
	groundLayer.resizeWorld()
}

function createPlayer() {
	// The player and its settings
	position = getPos(10, 1)
	player = game.add.sprite(position.x, position.y, 'dude');
	game.physics.arcade.enable(player);
	player.body.setSize(tileSize, tileSize, 0, 10)

	// Player physics properties. Give the little guy a slight bounce.
	player.body.collideWorldBounds = true;
	player.body.onWorldBounds = new Phaser.Signal()
	player.body.onWorldBounds.add(hitWorldBounds, this)
	player.body.onMoveComplete = new Phaser.Signal()
	player.body.onMoveComplete.add(recordPosition, this)

	// Our two animations, walking left and right.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	player.animations.add('up', [5, 6, 7, 8], 10, true);
	player.animations.add('down', [0, 1, 2, 3], 10, true);

	star = game.add.sprite(354, 600, 'star');
	game.physics.arcade.enable(star);
}

function create (){
	game.physics.startSystem(Phaser.Physics.ARCADE);

	createMap()
	createPlayer()

	cursors = game.input.keyboard.createCursorKeys();
}


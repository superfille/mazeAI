
function update() {
	// if (!player.body.isMoving) {
	// 	AI.walk()
	// }
	
	cursorMovement()
	game.physics.arcade.collide(player, wallLayer, collisionHandler, null, this);
	// game.physics.arcade.overlap(player, star, collectStar, null, this);
}

function lookAround() {
	const p = getPosition(player.body.position)
	const layer = map.getLayer(wall)
	const above = map.getTile(p.x, p.y - 1, layer)
	const below = map.getTile(p.x, p.y + 1, layer)
	const left = map.getTile(p.x - 1, p.y, layer)
	const right = map.getTile(p.x + 1, p.y, layer)
	return {
		above: {x: p.x,     y: p.y - 1, isWall: above === null},
		below: {x: p.x,     y: p.y + 1, isWall: below === null},
		left:  {x: p.x - 1, y: p.y,     isWall: left === null },
		right: {x: p.x + 1, y: p.y,     isWall: right === null},
		player: player.body.position
	}	
}

function recordPosition() {
	ai.recordPosition(lookAround())
}

function movePlayer(direction, time = 500) {
	switch(direction) {
		case Phaser.ANGLE_LEFT:
			player.body.moveTo(time, tileSize, Phaser.ANGLE_LEFT)
			player.animations.play('left')
			break
		case Phaser.ANGLE_RIGHT:
			player.body.moveTo(time, tileSize, Phaser.ANGLE_RIGHT)
			player.animations.play('right')
			break;
		case Phaser.ANGLE_UP:
			player.body.moveTo(time, tileSize, Phaser.ANGLE_UP)
			player.animations.play('up')
			break
		case Phaser.ANGLE_DOWN:
			player.body.moveTo(time, tileSize, Phaser.ANGLE_DOWN)
			player.animations.play('down')
			break
	}
	setTimeout(function() {
		player.animations.stop();
		player.frame = 4;
	}, time)
}

function cursorMovement() {
	if (cursors.left.isDown){
		movePlayer(Phaser.ANGLE_LEFT)
	}else if (cursors.right.isDown){
		movePlayer(Phaser.ANGLE_RIGHT)
	}else if (cursors.up.isDown){
		movePlayer(Phaser.ANGLE_UP)
	}else if (cursors.down.isDown){
		movePlayer(Phaser.ANGLE_DOWN)
	}
}

function collectStar(player, star) {
	star.kill();
	win = true;
	ai.stop()
}

function hitWorldBounds (player) {
	player.body.stopMovement(0)
}

function collisionHandler (player, wall) {
	player.body.stopMovement(0)
}

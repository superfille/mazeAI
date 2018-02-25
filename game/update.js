
function update() {
	cursorMovement()
	moveAI()
}

function lookAround() {
	const p = getPosition(player.position)
	const layer = map.getLayer(wall)
	const above = map.getTile(p.x,     p.y - 1, layer)
	const below = map.getTile(p.x,     p.y + 1, layer)
	const left =  map.getTile(p.x - 1, p.y,     layer)
	const right = map.getTile(p.x + 1, p.y,     layer)

	return {
		above: {x: p.x,     y: p.y - 1, isWall: above !== null},
		below: {x: p.x,     y: p.y + 1, isWall: below !== null},
		left:  {x: p.x - 1, y: p.y,     isWall: left !==  null},
		right: {x: p.x + 1, y: p.y,     isWall: right !== null},
		player: p
	}	
}

function stoppedMoving() {
	this.recordPosition()
	isMoving = false
}

function recordPosition() {
	ai.recordPosition(lookAround())
}

function moveAI() {
	if(!isMoving && !ai.hasWon()) {
		ai.recordPosition(lookAround())
		movePlayer(ai.getDirection(player))
		if(star.x === player.x && star.y === player.y) {
			ai.stop()
		}
	}
}

function movePlayer(direction) {
	if(!isMoving) {
		isMoving = true
		let x = player.x
		let y = player.y
		switch(direction) {
			case Phaser.LEFT:
				x = player.position.x - tileSize
				player.animations.play('left')
				player.facing = Phaser.LEFT
				break
			case Phaser.RIGHT:
				x = player.position.x + tileSize
				player.animations.play('right')
				player.facing = Phaser.RIGHT
				break;
			case Phaser.UP:
				y = player.position.y - tileSize
				player.animations.play('up')
				player.facing = Phaser.UP
				break
			case Phaser.DOWN:
				y = player.position.y + tileSize
				player.animations.play('down')
				player.facing = Phaser.DOWN
				break
		}

		game.add.tween(player).to({x: x, y: y}, moveTime, Phaser.Easing.Linear.None, true)
		setTimeout(function() {
			player.animations.stop();
			isMoving = false
			player.x = x
			player.y = y
		}, moveTime)
	}
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

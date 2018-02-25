function Tile(_x, _y, _neighbors, isWall) {
	this.x = _x
	this.y = _y
	this.visits = 0
	this.maxVisits = -1
	this.neighbors = {}
	this.wall = isWall

	this.neighbors.above = _neighbors.above
	this.neighbors.below = _neighbors.below
	this.neighbors.left = _neighbors.left
	this.neighbors.right = _neighbors.right

	if(this.neighbors.above === undefined) this.maxVisits++
	if(this.neighbors.below === undefined) this.maxVisits++
	if(this.neighbors.left === undefined) this.maxVisits++
	if(this.neighbors.right === undefined) this.maxVisits++

	this.getPosition = function() {
		return {x: this.x, y: this.y}
	}

	this.isWall = function() {
		return this.wall
	}

	this.isMaxVisit = function() {
		return this.visits >= this.maxVisits
	}

	this.visit = function() {
		this.visits++
	}
}

function AI() {
	this.path = [] // stack. Will be in "/ tileSize" positions
	this.tiles = []
	this.directins = ['right', 'up', 'left', 'back']
	this.currentDirection = 'left'
	this.won = false
	
	this.peek = function() {
		return this.path[this.path.length - 1]
	}

	this.getTile = function(x, y) {
		for (let i = 0; i < this.tiles.length; i++) {
			const tile = this.tiles[i]
			if(tile.x === x && tile.y === y) {
				return tile
			}
		}

		return null
	}

	this.setTile = function(x, y, isWall, neighbors) {
		let tile = this.getTile(x, y)
		
		if(tile) {
			return tile
		}

		let newTile = new Tile(x, y, neighbors, isWall)
		this.tiles.push(newTile)
		return newTile
	}

	this.recordPosition = function(area) {
		p = this.setTile(area.player.x, area.player.y, false, area)
		p.visit()
		this.setTile(area.above.x, area.above.y, area.above.isWall, {below: p})
		this.setTile(area.below.x, area.below.y, area.below.isWall, {above: p})
		this.setTile(area.left.x, area.left.y, area.left.isWall, {right: p})
		this.setTile(area.right.x, area.right.y, area.right.isWall, {left: p})
	}

	this.getDirection = function(player) {
		let direction, tile = null
		switch(player.facing) {
			case Phaser.UP:
				if((tile = this.canWalk(player.position, Phaser.RIGHT)) !== null) {
					direction = Phaser.RIGHT
				} else if((tile = this.canWalk(player.position, Phaser.UP)) !== null) {
					direction = Phaser.UP
				} else if((tile = this.canWalk(player.position, Phaser.LEFT)) !== null) {
					direction = Phaser.LEFT
				} else {
					this.goBack()
					tile = this.peek()
					tile.visit()
					return this.getPreviousTileDirection(player.position, tile)
				}
				break
			case Phaser.DOWN:
				if((tile = this.canWalk(player.position, Phaser.LEFT)) !== null) {
					direction = Phaser.LEFT
				} else if((tile = this.canWalk(player.position, Phaser.DOWN)) !== null) {
					direction = Phaser.DOWN
				} else if((tile = this.canWalk(player.position, Phaser.RIGHT)) !== null) {
					direction = Phaser.RIGHT
				} else {
					this.goBack()
					tile = this.peek()
					tile.visit()
					return this.getPreviousTileDirection(player.position, tile)
				}
				break
			case Phaser.LEFT:
				if((tile = this.canWalk(player.position, Phaser.UP)) !== null) {
					direction = Phaser.UP
				} else if((tile = this.canWalk(player.position, Phaser.LEFT)) !== null) {
					direction = Phaser.LEFT
				} else if((tile = this.canWalk(player.position, Phaser.DOWN)) !== null) {
					direction = Phaser.DOWN
				} else {
					this.goBack()
					tile = this.peek()
					tile.visit()
					return this.getPreviousTileDirection(player.position, tile)
				}
				break
			case Phaser.RIGHT:
				if((tile = this.canWalk(player.position, Phaser.DOWN)) !== null) {
					direction = Phaser.DOWN
				} else if((tile = this.canWalk(player.position, Phaser.RIGHT)) !== null) {
					direction = Phaser.RIGHT
				} else if((tile = this.canWalk(player.position, Phaser.UP)) !== null) {
					direction = Phaser.UP
				} else {
					tile = this.goBack()
					tile = this.peek()
					tile.visit()
					return this.getPreviousTileDirection(player.position, tile)
				}
				break
		}
		this.path.push(tile)
		tile.visit()
		return direction
	}

	this.canWalk = function(position, direction) {
		let x = position.x
		let y = position.y
		switch(direction) {
			case Phaser.UP:
				y -= tileSize
				break;
			case Phaser.DOWN:
				y += tileSize
				break;
			case Phaser.LEFT:
				x -= tileSize
				break;
			case Phaser.RIGHT:
				x += tileSize	
				break;
		}
		const pos = getPosition({x: x, y: y})
		const tile = this.getTile(pos.x, pos.y)
		if(tile) {
			if(tile.isWall() || tile.isMaxVisit()) {
				return null
			}
			return tile
		}
		return tile
	}

	this.getPreviousTileDirection = function(player, tile) {
		pos = getPosition(player)
		if (pos.x - 1 === tile.x) {
			return Phaser.LEFT
		} else if (pos.x + 1 === tile.x) {
			return Phaser.RIGHT
		} else if (pos.y - 1 === tile.y) {
			return Phaser.UP
		} else if (pos.y + 1 === tile.y) {
			return Phaser.DOWN
		}
	}

	this.goBack = function() {
		if(this.path.length > 0) {
			return this.path.pop()
		}

		this.stop()
		return null
	}

	this.stop = function() {
		this.won = true
	}

	this.hasWon = function() {
		return this.won
	}

}

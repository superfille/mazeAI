function Tile(_x, _y) {
	getPosition = function() {
		return {x: this.x, y: this.y}
	}

	addNeighbors = function(neighbors) {
		this.neighbors.above = neighbors.above
		this.neighbors.below = neighbors.below
		this.neighbors.left = neighbors.left
		this.neighbors.right = neighbors.right

		if(this.neighbors.above === null) maxVisits++
		if(this.neighbors.below === null) maxVisits++
		if(this.neighbors.left === null) maxVisits++
		if(this.neighbors.right === null) maxVisits++
	}

	isWall = function() {
		return this.neighbors === null
	}

	isMaxVisit = function() {
		return this.maxVisits === this.visits
	}

	visit = function() {
		this.visits++
	}
	let x = _x
	let y = _y
	let visits = 0
	let maxVisits = -1
	let neighbors = {}
	return {
		getPosition: getPosition,
		addNeighbors: addNeighbors,
		isWall: isWall,
		isMaxVisit: isMaxVisit,
		visit: visit
	}
}


const ai = {
	path: [], // stack. Will be in "/ tileSize" positions
	tiles: [],
	currentDirection: 'left',
	aiWon: false,
	
	nextWalkableDirection: function(currentDirection) {

	},

	walk: function() {

	},
	
	getTile: function(x, y) {
		for (let i = 0; i < this.tiles.length; i++) {
			const tile = this.tiles[i]
			if(tile.x === x && tile.y === y) {
				return tile
			}
		}

		return null
	},

	setTile: function(x, y, isWall, neighbors) {
		let tile = this.getTile(x, y)
		if(tile) {
			return tile
		}

		let newTile = new Tile(x, y)
		if(!isWall) {
			// Walkable tile
			newTile.addNeighbors(neighbors)
		} else {
			// Wall
		}
		this.tiles.push(newTile)
		return newTile
	},

	recordPosition: function(area) {
		this.setTile(area.player.x, area.player.y, false, area).visit()
		this.setTile(area.above.x, area.above.y, area.above.isWall, {below: area.player})
		this.setTile(area.below.x, area.below.y, area.below.isWall, {above: area.player})
		this.setTile(area.left.x, area.left.y, area.left.isWall, {right: area.player})
		this.setTile(area.right.x, area.right.y, area.right.isWall, {left: area.player})

		//Add player position to paths
	},

	goBack: function() {
	},

	stop: function() {
		this.aiWon = true
	},

}

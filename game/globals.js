let player;
let ai
let groundLayer;
let wallLayer;
let map;
let cursors;
let star;
const wall = 'Wall'
const ground = 'Ground'

const moveTime = 200
const tileSize = 32;

let isMoving = false
function getPosition(pos) {
	return {
		x: Math.ceil(pos.x / tileSize),
		y: Math.ceil(pos.y / tileSize)
	}
}

function getPos(x, y) {
	return {
		x: x * tileSize,
		y: y * tileSize
	}
}

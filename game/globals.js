let player;
let groundLayer;
let wallLayer;
let map;
let cursors;
let star;
const directions = ['down', 'right', 'left', 'up']
const PhaserDirections = [Phaser.ANGLE_LEFT, Phaser.ANGLE_RIGHT, Phaser.ANGLE_UP, Phaser.ANGLE_DOWN]
let win = false;
const wall = 'Wall'
const ground = 'Ground'

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

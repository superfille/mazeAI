
function preload() {
    game.load.image('star', './game/assets/star.png', 32, 32);
	game.load.spritesheet('dude', './game/assets/dude.png', 32, 42);
	//game.load.tilemap('tilemap', 'assets/third.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('tilemap', './game/assets/fourth.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('desert', './game/assets/tmw_desert_spacing.png');
	game.load.image('walls', './game/assets/walls_1x2.png');
}
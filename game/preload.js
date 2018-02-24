
function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 42);
	game.load.tilemap('tilemap', 'assets/third.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.image('desert', 'assets/tmw_desert_spacing.png');
	game.load.image('walls', 'assets/walls_1x2.png');
}
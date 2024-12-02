import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load background and ball image assets
        this.load.setBaseURL('https://labs.phaser.io');
        this.load.image('background', 'assets/skies/space3.png');
        this.load.image('ball', 'assets/sprites/shinyball.png');
    }

    create() {
        // Add background
        const background = this.add.image(0, 0, 'background');
        background.setOrigin(0, 0);
        background.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

        // Create a ball sprite with a random starting position
        const randomX = Phaser.Math.Between(50, 350);
        const randomY = Phaser.Math.Between(50, 350);
        this.ball = this.physics.add.image(randomX, randomY, 'ball');
        
        // Set ball properties
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        
        // Set initial velocity with consistent speed
        this.initialSpeed = 700;
        const randomAngle = Phaser.Math.FloatBetween(0, Math.PI * 2);
        const velocityX = Math.cos(randomAngle) * this.initialSpeed;
        const velocityY = Math.sin(randomAngle) * this.initialSpeed;
        this.ball.setVelocity(velocityX, velocityY);

        // Define button positions
        this.buttonPositions = {
            Button1: { x: 117, y: 3.1999969482421875 },
            Button2: { x: 276, y: 4.1999969482421875 },
            Button8: { x: 12, y: 118.19999694824219 },
            Button7: { x: 8, y: 276.1999969482422 },
            Button3: { x: 382, y: 118.19999694824219 },
            Button4: { x: 386, y: 276.1999969482422 },
            Button6: { x: 114, y: 384.1999969482422 },
            Button5: { x: 277, y: 387.1999969482422 },
        };
    }

    bounceTowards(direction) {
        // Get target button position
        const targetPos = this.buttonPositions[direction];
        if (!targetPos) return;

        // Get current ball position
        const currentX = this.ball.x;
        const currentY = this.ball.y;

        // Calculate direction vector
        const dx = targetPos.x - currentX;
        const dy = targetPos.y - currentY;

        // Normalize the vector and apply speed
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = this.initialSpeed;

        const velocityX = (dx / distance) * speed;
        const velocityY = (dy / distance) * speed;

        // Apply velocity to the ball
        this.ball.setVelocity(velocityX, velocityY);
    }
}

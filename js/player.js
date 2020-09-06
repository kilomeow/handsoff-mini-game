export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        // Add sprite
        this.sprite = scene.playerGroup.create(x, y, "ship").setScale(0.3, 0.3).setOrigin(0.5, 0.5).setImmovable();
        // make ship body smaller
        this.sprite.setSize(32, 32, false);
        this.sprite.depth = 5;
        // asteroids like controls
        this.sprite.setDamping(true);
        this.sprite.setDrag(0.98);
        this.sprite.body.setMaxVelocity(300);

        // player lives
        this.sprite.lives = 3;

        // Add sprite weapon
        this.sprite.autoFire = false;
        this.sprite.bulletMax = 30;
        this.sprite.weapon = scene.weapons.add(this.sprite.bulletMax, 'bullets');
        this.sprite.weapon.bulletKillType = WeaponPlugin.consts.KILL_LIFESPAN;
        this.sprite.weapon.bulletLifespan = 500;
        this.sprite.weapon.bulletSpeed = 1250;
        this.sprite.weapon.fireRate = 90;

        // scale and make sure each bullet does not bounce off targets
        this.sprite.weapon.bullets.children.each(function (bullet) {
            bullet.body.setImmovable(true);
            bullet.setScale(0.2, 0.1);
        }, this);

        // follow sprite and track rotation
        this.sprite.weapon.trackSprite(this.sprite, 0, 0, true);

        //sprite rocket trail particles
        this.particles = scene.add.particles('particles');

        this.sprite.emitter = this.particles.createEmitter({
            frame: ['redBall', 'yellowBall'],
            speed: 50,
            scale: {
                start: 0.2,
                end: 0
            },
            lifespan: 350,
            on: false
        });
        // particles follow player
        this.sprite.emitter.startFollow(this.sprite);

        // sprite tween when hit
        this.sprite.hitTween = scene.tweens.add({
            targets: this.sprite,
            alpha: 0.2,
            duration: 150,
            yoyo: true,
            repeat: 10,
            //paused: true,
            ease: 'Power1',
        });

    }


    update() {

        const scene = this.scene;
        const sprite = this.sprite;
        const controls = scene.controls;

        if(sprite.active) {

            // keyboard controls
            if (scene.controls.keys.up.isDown) {
                sprite.body.velocity.y = -100;
            } else if (scene.controls.keys.down.isDown) {
                sprite.body.velocity.y = 100;
            }

            
            if (scene.controls.keys.left.isDown) {
                sprite.body.velocity.x = -100;
            } else if (scene.controls.keys.right.isDown) {
                sprite.body.velocity.x = 100;
            }
        }

    }

}

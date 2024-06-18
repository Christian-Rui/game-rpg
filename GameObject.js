class GameObject {
    constructor(config) {
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./images/characters/people/hero.png",
            numeroDeFrames: config.numeroDeFrames,
            colunaY: config.colunaY,
            distanciaX: config.distanciaX,
            distanciaY: config.distanciaY,
            width: config.width,
            height: config.height,
            animationFrameLimit: config.animationFrameLimit
        });

    }

    mount(map) {
        console.log("Montando");
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }


    update() {

    }
}
class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src= config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage,0,0);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage,0,0);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "/images/maps/corredor.png",
        upperSrc: "/images/maps/corredorCima.png",
        gameObjects: {
            hero2: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(4),
                src: "/images/characters/people/npc1.png",
             }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "/images/characters/people/img.png",
                numeroDeFrames: 8,
                width: 24,
                colunaY: {
                    "down": 0,
                    "up": 1,
                    "left": 2,
                    "right": 3
                },
                distanciaX: 4,
                animationFrameLimit: 4
            }) 
            
        }
    }, 
    Kitchen: {
        lowerSrc: "/images/maps/KitchenLower.png",
        upperSrc: "/images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 2
             }),  
            hero2: new GameObject({
                x: 10,
                y: 7,
                src: "/images/characters/people/npc1.png"
             })
        }
    }
}
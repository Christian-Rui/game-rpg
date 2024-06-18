class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src= config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y);
    }

    // drawUpperImage(ctx, cameraPerson) {
    //     ctx.drawImage(
    //         this.upperImage,
    //         utils.withGrid(10) - cameraPerson.x,
    //         utils.withGrid(6) - cameraPerson.y);
    // }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.values(this.gameObjects).forEach(o =>{

            //TODO: detemine ifthis object should actuaily mount

            o.mount(this);
        })
      }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y){
        delete this.walls[`${x},${y}`];
    }

    moveWall(wasX, wasY, direction){
        this.removeWall(wasX, wasY,);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y)
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
          return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        console.log( match)
      }
}



window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/maps/telaDeFundo_Oficial3.png",
        // upperSrc: "./images/maps/corredorCima.png",
        gameObjects: {
            hero2: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
             }),
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
                src: "./images/characters/people/img.png",
                numeroDeFrames: 8,
                width: 24,
                // heigth: 32,
                colunaY: {
                    "down": 0,
                    "up": 1,
                    "left": 2,
                    "right": 3
                },
                distanciaX: 4,
                animationFrameLimit: 4
            }) 
        },

        walls: {
            // "16,16": true
        
            [utils.asGridCoord(0, 4)]: true,
            [utils.asGridCoord(1, 4)]: true,
            [utils.asGridCoord(2, 4)]: true,
            [utils.asGridCoord(3, 4)]: true,
            [utils.asGridCoord(4, 4)]: true,
            [utils.asGridCoord(5, 4)]: true,
            [utils.asGridCoord(6, 4)]: true,
            [utils.asGridCoord(5, 5)]: true,
            // [utils.asGridCoord(7, 4)]: true, porta
            [utils.asGridCoord(8, 4)]: true,
            [utils.asGridCoord(9, 5)]: true,
            [utils.asGridCoord(9, 4)]: true,
            [utils.asGridCoord(10, 4)]: true,
            [utils.asGridCoord(11, 4)]: true,
            [utils.asGridCoord(12, 4)]: true,
            [utils.asGridCoord(13, 4)]: true,
            [utils.asGridCoord(14, 4)]: true,
            [utils.asGridCoord(15, 4)]: true,
            [utils.asGridCoord(16, 4)]: true,
            [utils.asGridCoord(17, 4)]: true,
            // [utils.asGridCoord(18, 4)]: true, porta
            // [utils.asGridCoord(19, 4)]: true, porta
            [utils.asGridCoord(20, 4)]: true,
            [utils.asGridCoord(5, 5)]: true,
            // [utils.asGridCoord(7, 4)]: true, porta
            [utils.asGridCoord(21, 5)]: true,
            [utils.asGridCoord(21, 6)]: true,
            [utils.asGridCoord(21, 7)]: true,
            [utils.asGridCoord(21, 8)]: true,
            [utils.asGridCoord(21, 9)]: true,
            [utils.asGridCoord(21, 10)]: true,
            [utils.asGridCoord(21, 11)]: true,
            [utils.asGridCoord(0, 12)]: true,
            [utils.asGridCoord(1, 12)]: true,
            [utils.asGridCoord(2, 12)]: true,
            [utils.asGridCoord(3, 12)]: true,
            [utils.asGridCoord(4, 12)]: true,
            [utils.asGridCoord(5, 12)]: true,
            [utils.asGridCoord(6, 12)]: true,
            [utils.asGridCoord(5, 12)]: true,
            [utils.asGridCoord(7, 12)]: true,
            [utils.asGridCoord(8, 12)]: true,
            [utils.asGridCoord(9, 12)]: true,
            [utils.asGridCoord(9, 12)]: true,
            [utils.asGridCoord(10, 12)]: true,
            [utils.asGridCoord(11, 12)]: true,
            [utils.asGridCoord(12, 12)]: true,
            [utils.asGridCoord(13, 12)]: true,
            [utils.asGridCoord(14, 12)]: true,
            [utils.asGridCoord(15, 12)]: true,
            [utils.asGridCoord(16, 12)]: true,
            [utils.asGridCoord(17, 12)]: true,
            [utils.asGridCoord(18, 12)]: true, 
            [utils.asGridCoord(19, 12)]: true, 
            [utils.asGridCoord(20, 12)]: true,
            [utils.asGridCoord(-1, 5)]: true,
            [utils.asGridCoord(-1, 6)]: true,
            [utils.asGridCoord(-1, 7)]: true,
            [utils.asGridCoord(-1, 8)]: true,
            [utils.asGridCoord(-1, 9)]: true,
            [utils.asGridCoord(-1, 10)]: true,
            [utils.asGridCoord(-1, 11)]: true,

            
        }
        
    }, 
    Kitchen: {
        lowerSrc: "./images/maps/KitchenLower.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new GameObject({
                x: 5,
                y: 2
             }),  
            hero2: new GameObject({
                x: 10,
                y: 7,
                src: "./images/characters/people/npc1.png"
             })
        }
    }
}
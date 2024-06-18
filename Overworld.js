class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }
   
    startGameLoop() {
        const step = () => {
            // Clear the canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Get the camera focus
            const cameraPerson = this.map.gameObjects.hero;

            // Update and draw lower layer of map
            this.map.drawLowerImage(this.ctx, cameraPerson);

            // Update and draw each game object
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
                object.sprite.draw(this.ctx, cameraPerson);
            });

            // Draw upper layer of map
            // this.map.drawUpperImage(this.ctx, cameraPerson);

            // Request next animation frame
            requestAnimationFrame(() => {
                step();
            });
        }
        step();
    }

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene();
        })
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        this.map.mountObjects();

        this.bindActionInput();

        this.directionInput = new DirectionInput();
        this.directionInput.init();
        // this.directionInput.direction;
        this.startGameLoop();  

    }
}
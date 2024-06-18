class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.speed = 1.5;
        this.total = 0;

        this.directionUpdate = {
            "down": ["y", 1],
            "up": ["y", -1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            if (this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                });
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            state.map.moveWall(this.x, this.y, this.direction)
            this.movingProgressRemaining = Math.round(16 / this.speed);
            this.total = 0;
        }
    }

    updatePosition() {
        if (this.movingProgressRemaining > 0) {
            const [property, change] = this.directionUpdate[this.direction];
            this.total += this.speed;
            if (this.movingProgressRemaining !== 1) {
                this[property] += change * this.speed;
            } else if (this.movingProgressRemaining === 1) {
                this[property] += change * (this.speed !== 16 ? (this.speed + (16 - this.total)) : this.speed);
            }
            this.movingProgressRemaining -= 1;

            if (this.movingProgressRemaining === 0) {
                this.intentPosition = null;
                utils.emitEvent("PersonWalkingComplete", {
                    whoId: this.id
                });
            }
        }
    }

    updateSprite(state) {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}

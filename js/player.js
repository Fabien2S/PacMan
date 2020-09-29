const PLAYER_SPRITE_SHEET_ROW = 4;
const PLAYER_SPRITE_SHEET_COLUMNS = 2;

class Player extends SpriteSheetObject {

    /**
     * The direction the player is facing
     * @type {Directions}
     */
    direction = Directions.LEFT;

    /**
     * The walk speed of the player, in pixels per second
     * @type {number}
     */
    walkSpeed = 64;

    constructor(x, y) {
        super("player", x, y, "img/player.png", PLAYER_SPRITE_SHEET_ROW, PLAYER_SPRITE_SHEET_COLUMNS);

        this.updateAnimations();
    }

    update(game, deltaTime) {
        super.update(game, deltaTime);

        let previousTile = PACMAN.worldToTile(this.position);

        let distanceTravelled = this.walkSpeed * deltaTime;
        if (PACMAN.canWalkTowards(this.position, this.direction)) {
            let nextTile = PACMAN.getRelativeTile(this.position, this.direction);
            this.moveTowards(nextTile, distanceTravelled);
        } else {
            let tilePos = PACMAN.worldToTile(this.position);
            let targetPos = PACMAN.tileToWorld(tilePos);
            this.moveTowards(targetPos, distanceTravelled);
        }

        this.position = new Vector2(
            MathHelper.mod(this.position.x, MAP_TILE_SIZE * MAP_WIDTH),
            MathHelper.mod(this.position.y, MAP_TILE_SIZE * MAP_HEIGHT),
        )

        let currentTile = PACMAN.worldToTile(this.position);
        this.checkCollision(currentTile);

        if(!previousTile.equals(currentTile))
            PACMAN.triggerPlayerTile(currentTile);
    }

    updateAnimations() {
        super.spriteFrameIndex = this.direction * 2;
        super.spriteFrameCount = 2;
        super.spriteFrameDuration = .1;
    }

    /**
     *
     * @param {Directions} direction
     */
    trySetDirection(direction) {
        if (PACMAN.canWalkTowards(this.position, direction)) {
            this.direction = direction;
            this.updateAnimations();
        }
    }

    checkCollision(tile) {
        for (let ghost of GHOSTS) {
            let ghostTile = PACMAN.worldToTile(ghost.position);
            if (!tile.equals(ghostTile))
                continue;

            switch (ghost.ghostState) {
                case GhostStates.CHASE:
                case GhostStates.SCATTER:
                    PACMAN.endGame(false);
                    break;
                case GhostStates.FRIGHTENED:
                    ghost.setState(GhostStates.EATEN);
                    break;
            }
        }
    }
}
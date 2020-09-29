const GhostTypes = Object.freeze({
    BLINKY: 0,
    PINKY: 1,
    INKY: 2,
    CLYDE: 3
});

const GhostStates = Object.freeze({
    SLEEPING: 0,
    CHASE: 1,
    SCATTER: 2,
    FRIGHTENED: 3,
    EATEN: 4
});

const GHOST_SPRITE_SHEET_ROW = 5;
const GHOST_SPRITE_SHEET_COLUMNS = 8;

class Ghost extends SpriteSheetObject {

    /**
     * The type of the ghost
     * @type {GhostTypes}
     */
    ghostType = GhostTypes.BLINKY;

    /**
     * The state of the ghost
     * @type {GhostStates}
     */
    ghostState = GhostStates.SLEEPING;

    /**
     * The home tile of the ghost
     * @type {Vector2}
     */
    homePosition = new Vector2();

    /**
     * The direction the ghost is facing
     * @type {Directions}
     */
    direction = Directions.LEFT;

    /**
     * The walk speed of the ghost, in pixels per second
     * @type {number}
     */
    walkSpeed = 64;

    /**
     * The Target tile for the pathfinding algorithm
     * @type {Vector2}
     */
    pathfinderTargetPosition = new Vector2();

    /**
     *
     * @type {boolean}
     */
    pathfinderShowDebug = false;

    /**
     * The next tile, used by the pathfinding algorithm
     * @type {Vector2}
     */
    _pathfinderNextPosition = new Vector2();

    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {GhostTypes} type
     * @param {Vector2} homeTile
     */
    constructor(x, y, type, homeTile) {
        super("ghost", x, y, "img/ghosts.png", GHOST_SPRITE_SHEET_ROW, GHOST_SPRITE_SHEET_COLUMNS);

        this.ghostType = type;
        this.homePosition = homeTile;

        this.pathfinderTargetPosition = homeTile;
        this._pathfinderNextPosition = PACMAN.getRelativeTile(this.position, this.direction);

        this.setState(GhostStates.SCATTER);
    }

    update(game, deltaTime) {
        super.update(game, deltaTime);

        let speed = PACMAN.isSpeedLimited(this.position) ? this.walkSpeed * .6 : this.walkSpeed;
        let distanceTravelled = speed * deltaTime;

        let hasReachedNextPosition = this.moveTowards(this._pathfinderNextPosition, distanceTravelled);
        if (hasReachedNextPosition || !PACMAN.canWalk(this._pathfinderNextPosition))
            this.updatePath();

        this.updateState();
        this.updateAnimations();

        this.position = new Vector2(
            MathHelper.mod(this.position.x, MAP_TILE_SIZE * MAP_WIDTH),
            MathHelper.mod(this.position.y, MAP_TILE_SIZE * MAP_HEIGHT),
        )
    }

    render(ctx, deltaTime) {
        super.render(ctx, deltaTime);
        if(this.pathfinderShowDebug)
            this.drawDebug(ctx);
    }

    drawDebug(ctx) {
        ctx.beginPath();

        let targetTile = this.pathfinderTargetPosition;
        ctx.arc(targetTile.x, targetTile.y, 2, 0, 2 * Math.PI);

        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(targetTile.x, targetTile.y);

        ctx.fillStyle = "purple";
        ctx.strokeStyle = "purple";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();

        ctx.arc(this._pathfinderNextPosition.x, this._pathfinderNextPosition.y, 2, 0, 2 * Math.PI);
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this._pathfinderNextPosition.x, this._pathfinderNextPosition.y);
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.fill();
        ctx.stroke();
    }

    updateState() {
        switch (this.ghostState) {
            case GhostStates.SLEEPING:
                this.walkSpeed = 0;
                this.pathfinderTargetPosition = this.position;
                break;
            case GhostStates.CHASE:
                this.walkSpeed = 64;
                this.pathfinderTargetPosition = this.computeChaseTarget();
                break;
            case GhostStates.SCATTER:
                this.walkSpeed = 64;
                this.pathfinderTargetPosition = this.homePosition;
                break;
            case GhostStates.FRIGHTENED:
                this.walkSpeed = 48;
                this.pathfinderTargetPosition = PACMAN.getRelativeTile(this.position, Math.floor(Math.random() * 4));

                break;
            case GhostStates.EATEN:
                this.walkSpeed = 128;
                this.pathfinderTargetPosition = new Vector2(14.5 * MAP_TILE_SIZE, 14 * MAP_TILE_SIZE);
                if (Vector2.distance(this.pathfinderTargetPosition, this.position) <= MAP_TILE_SIZE)
                    this.setState(GhostStates.CHASE);
                break;
        }
    }

    computeChaseTarget() {
        switch (this.ghostType) {
            case GhostTypes.BLINKY: {
                return PLAYER.position.clone();
            }
            case GhostTypes.PINKY: {
                let directionVector = PACMAN.directionVectorBugged(PLAYER.direction, 4 * MAP_TILE_SIZE);
                return PLAYER.position.add(directionVector);
            }
            case GhostTypes.INKY: {
                let directionVector = PACMAN.directionVectorBugged(PLAYER.direction, 4 * MAP_TILE_SIZE);
                return PLAYER.position.add(directionVector).subtract(BLINKY.position.clone()).add(PLAYER.position);
            }
            case GhostTypes.CLYDE: {
                let distanceToPlayer = Vector2.distance(this.position, PLAYER.position);
                if (distanceToPlayer >= 8 * MAP_TILE_SIZE)
                    return PLAYER.position.clone();
                else
                    return this.homePosition.clone();
            }
        }
    }

    updatePath() {
        let forbiddenDirection = MathHelper.reverseDirection(this.direction);
        let directions = [
            Directions.UP,
            Directions.LEFT,
            Directions.DOWN,
            Directions.RIGHT
        ]

        let shortestTile = this.position.clone();
        let shortestDirection = this.direction;
        let shortestDistance = Number.POSITIVE_INFINITY;

        for (let direction of directions) {
            if (direction === forbiddenDirection)
                continue;
            if (PACMAN.isDirectionForbidden(this.position, direction))
                continue;
            if (!PACMAN.canWalkTowards(this.position, direction))
                continue;

            let adjacentTile = PACMAN.getRelativeTile(this.position, direction);
            let distance = Vector2.distance(this.pathfinderTargetPosition, adjacentTile);
            if (shortestDistance <= distance)
                continue;

            shortestTile = adjacentTile;
            shortestDirection = direction;
            shortestDistance = distance;
        }

        this.direction = shortestDirection;
        this._pathfinderNextPosition = shortestTile;
    }

    updateAnimations() {
        super.spriteFrameDuration = .1;

        switch (this.ghostState) {
            case GhostStates.SLEEPING:
            case GhostStates.CHASE:
            case GhostStates.SCATTER:
                super.spriteFrameIndex = this.ghostType * 8 + this.direction * 2;
                super.spriteFrameCount = 2;
                break;
            case GhostStates.FRIGHTENED:
                super.spriteFrameIndex = 72;
                super.spriteFrameCount = 2;
                break;
            case GhostStates.EATEN:
                super.spriteFrameIndex = 76 + this.direction;
                super.spriteFrameCount = 1;
                break;
        }
    }

    /**
     *
     * @param {GhostStates} state
     */
    setState(state) {
        if (this.ghostState === state)
            return;

        this.ghostState = state;
        this.direction = MathHelper.reverseDirection(this.direction);
    }
}

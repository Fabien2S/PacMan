const MAP_TILE_SIZE = 8;
const MAP_WIDTH = 28;
const MAP_HEIGHT = 36;
const MAP_LAYOUT = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 7, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 7, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 65, 1, 1, 65, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 3, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 3, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 7, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 67, 3, 3, 67, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 7, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const TILE_FLAGS = {
    WALKABLE: 1,
    DOT: 2,
    ENERGIZER: 4,
    SPEED_LIMITER: 8,
    PREVENT_GOING_RIGHT: 16,
    PREVENT_GOING_LEFT: 32,
    PREVENT_GOING_UP: 64,
    PREVENT_GOING_DOWN: 128
}

class PacMan extends SpriteObject {

    /**
     *
     * @type {[]}
     */
    ghostStateRegistry = [
        GhostStates.SCATTER,
        GhostStates.CHASE,
        GhostStates.SCATTER,
        GhostStates.CHASE,
        GhostStates.SCATTER,
        GhostStates.CHASE,
        GhostStates.SCATTER,
        GhostStates.CHASE
    ];
    /**
     *
     * @type {number[]}
     */
    ghostStateDurations = [
        7, 20, 7, 20, 5, 20, 5, Number.POSITIVE_INFINITY
    ];

    /**
     * @type {number}
     */
    ghostStateTime = 0;

    /**
     * @type {number}
     */
    ghostStateIndex = 0;

    /**
     * The number of remaining dots in the map
     * @type {number}
     */
    _dotCount;

    constructor() {
        super("pacman", 0, 0, "img/map.png");

        this.map = MAP_LAYOUT.slice();

        this._dotCount = 0;
        for (let flag of this.map) {
            if ((flag & TILE_FLAGS.DOT) !== 0)
                this._dotCount++;
        }
    }

    update(game, deltaTime) {
        super.update(game, deltaTime);

        let duration = this.ghostStateDurations[this.ghostStateIndex];
        this.ghostStateTime += deltaTime;
        if(this.ghostStateTime >= duration) {
            this.ghostStateTime = 0;
            this.ghostStateIndex++;

            let ghostState = this.ghostStateRegistry[this.ghostStateIndex];
            for(let ghost of GHOSTS) {
                if(ghost.ghostState === GhostStates.CHASE || ghost.ghostState === GhostStates.SCATTER)
                    ghost.setState(ghostState);
            }
        }

        this.frightenedTime -= deltaTime;
        if (this.frightenedTime <= 0) {
            this.frightenedTime = Number.NaN;
            for (let ghost of GHOSTS) {
                if (ghost.ghostState === GhostStates.FRIGHTENED)
                    ghost.setState(GhostStates.CHASE);
            }
        }
    }

    render(ctx, deltaTime) {
        super.render(ctx, deltaTime);

        ctx.beginPath();
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y++) {

                let flags = this.map[y * MAP_WIDTH + x];
                let pos = this.tileToWorld(new Vector2(x, y));

                ctx.fillStyle = "#FFB7AE";
                ctx.moveTo(pos.x, pos.y);

                if ((flags & TILE_FLAGS.ENERGIZER) !== 0)
                    ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
                else if ((flags & TILE_FLAGS.DOT) !== 0)
                    ctx.arc(pos.x, pos.y, 1, 0, 2 * Math.PI);
            }
        }
        ctx.fill();
    }

    drawPathfinding(ctx) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            for (let y = 0; y < MAP_HEIGHT; y++) {
                let pos = this.tileToWorld(new Vector2(x, y));

                ctx.beginPath();
                if (this.canWalk(pos))
                    ctx.fillStyle = "green";
                else
                    ctx.fillStyle = "red";
                ctx.rect(pos.x - 2, pos.y - 2, 4, 4);
                ctx.fill();
            }
        }
    }

    endGame(won) {
        window.location.reload();
    }

    /**
     *
     * @param {Vector2} worldPosition
     * @return {boolean} true if we can walk on this tile
     */
    canWalk(worldPosition) {
        let tile = this.worldToTile(worldPosition);
        let flags = this.map[tile.y * MAP_WIDTH + tile.x];
        return (flags & TILE_FLAGS.WALKABLE) !== 0;
    }

    /**
     *
     * @param {Vector2} worldPosition
     * @param {Directions} direction
     * @return {boolean} true if we can walk on this tile
     */
    canWalkTowards(worldPosition, direction) {
        let tile = this.worldToTile(worldPosition);
        let offset = MathHelper.directionVector(direction);
        let flags = this.map[MathHelper.mod(tile.y + offset.y, MAP_HEIGHT) * MAP_WIDTH + MathHelper.mod(tile.x + offset.x, MAP_WIDTH)];
        return (flags & TILE_FLAGS.WALKABLE) !== 0;
    }

    /**
     *
     * @param {Vector2} worldPosition
     * @param {Directions} direction
     * @return {boolean}
     */
    isDirectionForbidden(worldPosition, direction) {
        let tile = this.worldToTile(worldPosition);
        let flags = this.map[tile.y * MAP_WIDTH + tile.x];
        return ((flags >> 4) & (1 << direction)) !== 0;
    }

    /**
     *
     * @param worldPosition
     * @return {boolean}
     */
    isSpeedLimited(worldPosition) {
        let tile = this.worldToTile(worldPosition);
        let flags = this.map[tile.y * MAP_WIDTH + tile.x];
        return (flags & TILE_FLAGS.SPEED_LIMITER) !== 0;
    }

    /**
     *
     * @param {Vector2} worldPosition
     * @param {Directions} direction
     * @returns {Vector2}
     */
    getRelativeTile(worldPosition, direction) {
        let tile = this.worldToTile(worldPosition);
        let offset = MathHelper.directionVector(direction);
        return this.tileToWorld(tile.add(offset));
    }

    /**
     *
     * @param {Directions} direction
     * @param {number} distance
     * @return {Vector2}
     */
    directionVectorBugged(direction, distance = 1) {
        switch (direction) {
            case Directions.RIGHT:
                return new Vector2(distance, 0);
            case Directions.LEFT:
                return new Vector2(-distance, 0);
            case Directions.UP:
                return new Vector2(-distance, -distance);
            case Directions.DOWN:
                return new Vector2(0, distance);
        }
    }

    /**
     *
     * @param {Vector2} position
     * @returns {Vector2}
     */
    worldToTile(position) {
        return new Vector2(
            Math.round((position.x - MAP_TILE_SIZE / 2) / MAP_TILE_SIZE),
            Math.round((position.y - MAP_TILE_SIZE / 2) / MAP_TILE_SIZE)
        );
    }

    /**
     *
     * @param {Vector2} tile
     * @returns {Vector2}
     */
    tileToWorld(tile) {
        return new Vector2(tile.x * MAP_TILE_SIZE + MAP_TILE_SIZE / 2, tile.y * MAP_TILE_SIZE + MAP_TILE_SIZE / 2);
    }

    /**
     *
     * @param {Vector2} tile
     */
    triggerPlayerTile(tile) {
        let flag = this.map[tile.y * MAP_WIDTH + tile.x];

        if ((flag & TILE_FLAGS.ENERGIZER) !== 0) {
            flag &= ~TILE_FLAGS.ENERGIZER;

            this.frightenedTime = 7;
            for (let ghost of GHOSTS)
                ghost.setState(GhostStates.FRIGHTENED);
        }

        if ((flag & TILE_FLAGS.DOT) !== 0) {
            flag &= ~TILE_FLAGS.DOT;
            this._dotCount--;
            if (this._dotCount === 0) {
                this.endGame(true);
                return;
            }
        }

        this.map[tile.y * MAP_WIDTH + tile.x] = flag;
    }
}
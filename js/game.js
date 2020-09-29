class GameObject {

    /**
     * The name of the object
     * @type {string}
     */
    name = "game_object";

    /**
     * The position of the object
     * @type {Vector2}
     */
    position = new Vector2();

    /**
     * The size of the object
     * @type {Vector2}
     */
    size = new Vector2(1, 1);

    /**
     * The state of the object
     * @type {boolean}
     */
    _ready = true;

    /**
     * Determines if the object has been marked for removal
     * @type {boolean}
     */
    _removed = false;

    /**
     * @param {String} name
     * @param {number} x
     * @param {number} y
     */
    constructor(name, x, y) {
        this.name = name;
        this.position = new Vector2(x, y);

        this._ready = true;
        this._removed = false;
    }

    /**
     * Mark the object to removal
     */
    remove() {
        this._removed = true;
    }

    /**
     *
     * @param {Game} game
     * @param {number} deltaTime
     */
    update(game, deltaTime) {
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} deltaTime
     */
    render(ctx, deltaTime) {
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    /**
     * Move the {GameObject} towards the given x and y coordinate
     * @param {Vector2} target
     * @param {number} maxSpeed
     * @returns {boolean} true if the target has been reached, false otherwise
     */
    moveTowards(target, maxSpeed) {
        let dX = target.x - this.position.x;
        let dY = target.y - this.position.y;
        let distanceSqr = (dX * dX + dY * dY);
        if (distanceSqr === 0 || maxSpeed >= 0 && distanceSqr <= maxSpeed * maxSpeed) {
            this.position = target.clone();
            return true;
        }

        let distance = Math.sqrt(distanceSqr);
        this.position = new Vector2(
            this.position.x + dX / distance * maxSpeed,
            this.position.y + dY / distance * maxSpeed
        )
        return false;
    }

}

class SpriteObject extends GameObject {

    /**
     * The sprite of the object
     * {Image}
     */
    sprite;

    /**
     *
     * @param {String} name
     * @param {number} x
     * @param {number} y
     * @param {String} texture
     */
    constructor(name, x, y, texture = null) {
        super(name, x, y);

        this._ready = false;
        this.sprite = new Image();
        this.sprite.onload = this.onImageLoaded.bind(this);
        this.sprite.src = texture != null ? texture : name;
    }

    onImageLoaded() {
        console.log(this.name, "is now ready");
        this.size = new Vector2(
            this.sprite.width,
            this.sprite.height
        );
        this._ready = true;
    }

    render(ctx, deltaTime) {
        if (this._ready)
            ctx.drawImage(this.sprite, this.position.x, this.position.y, this.sprite.width, this.sprite.height);
        else
            super.render(ctx, deltaTime);
    }


}

class SpriteSheetObject extends SpriteObject {

    /**
     * The number of rows in the sprite
     * @type {number}
     */
    spriteRows = 1;

    /**
     * The number of columns in the sprite
     * @type {number}
     */
    spriteColumns = 1;

    /**
     * The index at which is the first frame of the animation
     * @type {number}
     */
    spriteFrameIndex = 0;

    /**
     * The number of frame in the animation
     * @type {number}
     */
    spriteFrameCount = 1;

    /**
     * The duration of a frame in the animation
     * @type {number}
     */
    spriteFrameDuration = 1;

    /**
     * The number of frames in the whole sprite
     * @type {number}
     */
    spriteFrameTotalCount = 1;

    /**
     * The index of the frame in the animation
     * @type {number}
     */
    _animationIndex = 0;
    /**
     * The elapsed time since the last frame
     * @type {number}
     */
    _animationTime = 0;

    /**
     *
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {number} rows
     * @param {number} columns
     */
    constructor(name, x, y, texture, rows, columns) {
        super(name, x, y, texture);

        this.spriteRows = rows;
        this.spriteColumns = columns;

        this.spriteFrameIndex = 0;
        this.spriteFrameDuration = 1;
        this.spriteFrameCount = columns * rows;
        this.spriteFrameTotalCount = columns * rows;

        this._animationIndex = 0;
        this._animationTime = 0;
    }

    render(ctx, deltaTime) {
        if (this._ready) {

            this._animationTime += deltaTime;
            if (this._animationTime >= this.spriteFrameDuration) {
                this._animationTime = 0;

                this._animationIndex++;
                this._animationIndex %= this.spriteFrameCount;
            }

            let frame = (this.spriteFrameIndex + this._animationIndex) % this.spriteFrameTotalCount;
            let column = frame % this.spriteColumns;
            let row = Math.floor(frame / this.spriteColumns);

            this.size = new Vector2(
                this.sprite.width / this.spriteColumns,
                this.sprite.height / this.spriteRows
            );

            let x = column * this.size.x;
            let y = row * this.size.y;

            ctx.drawImage(this.sprite, x, y, this.size.x, this.size.y, this.position.x - this.size.x / 2, this.position.y - this.size.x / 2, this.size.x, this.size.y);

        } else
            super.render(ctx, deltaTime);
    }

}

class Game {

    /**
     *
     * @param width
     * @param height
     */
    constructor(width = 640, height = 480) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.imageSmoothingQuality = "Low";
        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.msImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;

        this.context = this.canvas.getContext("2d", {
            alpha: false
        });
        this.context.imageSmoothingEnabled = false;

        this.running = false;
        this._ready = false;

        this.lastTime = 0;
        this.deltaTime = 0;
        this.objects = [];
    }

    reset() {
        this.context.fillStyle = "#FFFFFF";

        this.context.font = "50px sans-serif";
        this.context.textBaseline = "middle";
        this.context.textAlign = "center";
    }

    /**
     *
     * @param {FrameRequestCallback} time
     */
    update(time) {
        this.deltaTime = (time - this.lastTime) / 1_000;
        this.lastTime = time;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this._ready) {

            for (let i = this.objects.length - 1; i >= 0; i--) {
                let object = this.objects[i];
                object.update(this, this.deltaTime);
                object.render(this.context, this.deltaTime);
                if (object._removed) {
                    console.log(object.name, "removed");
                    this.objects.splice(i, 1);
                }
            }

        } else {
            this.updateState();
        }

        if (this.running)
            requestAnimationFrame(this.update.bind(this));
    }

    updateState() {
        for (let object of this.objects) {
            if (!object._ready) {
                this._ready = false;
                return;
            }
        }

        this._ready = true;
    }

    run() {
        if (this.running)
            return;

        this.reset();
        this.updateState();
        this.running = true;

        requestAnimationFrame(this.update.bind(this));
    }

    /**
     *
     * @param {GameObject} object
     */
    addObject(object) {
        this._ready &= object._ready;
        this.objects.push(object);
    }

    /**
     *
     * @param {GameObject} object
     */
    removeObject(object) {
        let index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
    }

}

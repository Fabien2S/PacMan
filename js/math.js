const Directions = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3
}

const MathHelper = {

    /**
     *
     * @param {Directions} direction
     * @return {Vector2}
     */
    directionVector(direction) {
        switch (direction) {
            case Directions.RIGHT:
                return new Vector2(1, 0);
            case Directions.LEFT:
                return new Vector2(-1, 0);
            case Directions.UP:
                return new Vector2(0, -1);
            case Directions.DOWN:
                return new Vector2(0, 1);
        }
    },

    mod(subject, n) {
        return ((subject % n) + n) % n;
    },

    /**
     *
     * @param {Directions} direction
     * @return {Directions}
     */
    reverseDirection(direction) {
        switch (direction) {
            case Directions.RIGHT:
                return Directions.LEFT;
            case Directions.LEFT:
                return Directions.RIGHT;
            case Directions.UP:
                return Directions.DOWN;
            case Directions.DOWN:
                return Directions.UP;
        }
    }

}

class Vector2 {

    /**
     * The X component
     * @type {number}
     */
    x = 0;

    /**
     * The Y component
     * @type {number}
     */
    y = 0;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     *
     * @param {Vector2} other
     * @return {Vector2} new vector
     */
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    /**
     *
     * @param {Vector2} other
     * @return {Vector2} new vector
     */
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }

    /**
     *
     * @param {Vector2} other
     * @return {Vector2} new vector
     */
    multiply(other) {
        return new Vector2(this.x * other.x, this.y * other.y);
    }

    /**
     *
     * @param {Vector2} other
     */
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }

    dot() {
        return this.x * this.x + this.y * this.y;
    }

    length() {
        return Math.sqrt(this.dot());
    }

    /**
     * @return {Vector2}
     */
    clone() {
        return new Vector2(this.x, this.y);
    }

    /**
     *
     * @param {Vector2} a
     * @param {Vector2} b
     * @return {number}
     */
    static distance(a, b) {
        return new Vector2(a.x - b.x, a.y - b.y).length();
    }
}
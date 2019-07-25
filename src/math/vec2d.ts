/**
 * This class represents a 2d vector.
 *
 * @author William Reetz
 * @export
 * @class Vec2D
 */
export class Vec2D {

    /**
     * x-axis
     *
     * @type {number}
     * @memberof Vec2D
     */
    public x: number;

    /**
     * y-axis
     *
     * @type {number}
     * @memberof Vec2D
     */
    public y: number;

    /**
     * Creates an instance of Vec2D.
     * @param {number} x
     * @param {number} y
     * @memberof Vec2D
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Inverts the Vector.
     *
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public invert(): Vec2D {
        return new Vec2D(-this.x, -this.y);
    }

    /**
     * Mirrors the Vector on x-axis.
     *
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public mirrorX(): Vec2D {
        return new Vec2D(-this.x, this.y);
    }

    /**
     * Mirrors the Vector on y-axis.
     *
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public mirrorY(): Vec2D {
        return new Vec2D(this.x, -this.y);
    }

    /**
     * Adds the vector with another vector.
     *
     * @param {Vec2D} vec2d
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public add(vec2d: Vec2D): Vec2D {
        return new Vec2D(this.x + vec2d.x, this.y + vec2d.y);
    }

    /**
     * Subtracts the vector with another vector.
     *
     * @param {Vec2D} vec2d
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public sub(vec2d: Vec2D): Vec2D {
        return new Vec2D(this.x - vec2d.x, this.y - vec2d.y);
    }

    /**
     * Multiplies the vector with another vector.
     *
     * @param {Vec2D} vec2d
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public mul(vec2d: Vec2D): Vec2D {
        return new Vec2D(this.x * vec2d.x, this.y * vec2d.y);
    }

    /**
     * Divides the vector with another vector.
     *
     * @param {Vec2D} vec2d
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public div(vec2d: Vec2D): Vec2D {
        return new Vec2D(this.x / vec2d.x, this.y / vec2d.y);
    }

    /**
     * Scales the vector.
     *
     * @param {number} factor
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public scale(factor: number): Vec2D {
        return new Vec2D(this.x * factor, this.y * factor);
    }

    /**
     * Rotates the vector.
     *
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public rotate(angle: number): Vec2D {
        let rad = angle * (Math.PI / 180);
        let cos = Math.cos(rad);
        let sin = Math.sin(rad);
        let rx = this.x * cos - this.y * sin;
        let ry = this.x * sin + this.y * cos;
        return new Vec2D(Math.round(rx * 1000) / 1000, Math.round(ry * 1000) / 1000);
    }

    /**
     * Returns the length of the vector.
     *
     * @returns {number}
     * @memberof Vec2D
     */
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns the Angle of the vector. (0 - 360)
     *
     * @returns {number}
     * @memberof Vec2D
     */
    public getAngle(): number {
        return Math.atan2(this.y, this.x) * (180 / Math.PI);
    }

    /**
     * Calculates the angle between vectors.
     *
     * @param {Vec2D} vec2d
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public calcAngle(vec2d: Vec2D): Vec2D {
        return this.sub(vec2d).normalize();
    }

    /**
     * Returns the distans between two vectors.
     *
     * @param {Vec2D} vec2d
     * @returns {number}
     * @memberof Vec2D
     */
    public distance(vec2d: Vec2D): number {
        return (this.sub(vec2d)).length();
    }

    /**
     * Normalizes the vector.
     *
     * @returns {Vec2D}
     * @memberof Vec2D
     */
    public normalize(): Vec2D {
        let len = this.length();
        return new Vec2D(this.x / len, this.y / len);
    }

}
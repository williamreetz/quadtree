import { Box } from '../quadtree/box';
import { Vec2D } from '../math/vec2d';

/**
 * This class represents a ball.
 *
 * @author William Reetz
 * @exports
 * @class Ball
 * @implements {Box}
 */
export class Ball implements Box {

    public pos: Vec2D = new Vec2D(0, 0);
    public dim: Vec2D = new Vec2D(0, 0);
    public speed: Vec2D = new Vec2D(5, 5).rotate(Math.random() * 5);
    public color: string = '#ff0000';

    /**
     * Creates an instance of Ball.
     * 
     * @param {Vec2D} [pos]
     * @param {Vec2D} [dim]
     * @memberof Ball
     */
    constructor(pos?: Vec2D, dim?: Vec2D) {
        this.pos = pos || new Vec2D(0, 0);
        this.dim = dim || new Vec2D(5, 5);
    }

    /**
     * Moves the Ball.
     *
     * @memberof Ball
     */
    public move() {
        this.pos = this.pos.add(this.speed);
    }

    /**
     * Rebounces the ball on the x-axis.
     *
     * @memberof Ball
     */
    public boundsX() {
        this.speed = this.speed.mirrorX();
    }

    /**
     * Rebounces the ball on the y-axis.
     *
     * @memberof Ball
     */
    public boundsY() {
        this.speed = this.speed.mirrorY();
    }

}

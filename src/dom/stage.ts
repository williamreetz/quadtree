import { QuadTree } from '../quadtree/quadtree';
import { Node } from '../quadtree/node';
import { Box } from '../quadtree/box';
import { Ball } from '../item/ball';
import { Vec2D } from '../math/vec2d';
import { config } from './stage.config';

/**
 * This class represents a Stage
 * 
 * @author William Reetz
 * @date 2019-07-25
 * @class Stage
 */
export class Stage {

    private canvas: any;
    private context: CanvasRenderingContext2D;
    private ballContainer: Ball[] = [];
    private quadtree: QuadTree;
    private animationActive: boolean = false;
    private static instance: Stage;

    /**
     * Creates an instance of Stage.
     * 
     * @memberof Stage
     */
    private constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = config.width;
        this.canvas.height = config.height;
        this.context = this.canvas.getContext('2d');
        const dimensions = { pos: new Vec2D(0, 0), dim: new Vec2D(config.width, config.height) };
        this.quadtree = new QuadTree(dimensions, config.maxDepth, config.maxItems);
        this.start();
    }

    /**
     * Returns an instance of Stage
     *
     * @static
     * @returns
     * @memberof Stage
     */
    static getInstance(): Stage {
        if (!Stage.instance) {
            Stage.instance = new Stage();
        }
        return Stage.instance;
    }

    /**
     * Starts the animation.
     *
     * @memberof Stage
     */
    public start(): void {
        this.animationActive = true;
        this.loop();
    }

    /**
     * Stops the animation.
     *
     * @memberof Stage
     */
    public stop(): void {
        this.animationActive = false;
    }

    /**
     * Infinite loop.
     *
     * @private
     * @memberof Stage
     */
    private loop(): void {
        this.createBalls();
        let step = () => {

            this.animate();
            this.draw();

            if (this.animationActive) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }

    /**
     * Creates some instances of ball.
     *
     * @private
     * @memberof Stage
     */
    private createBalls(): void {
        this.ballContainer = [];
        for (let i = 0; i < config.ballCount; i++) {
            let x = Math.round(Math.random() * config.width);
            let y = Math.round(Math.random() * config.height);
            let ball: Ball = new Ball(new Vec2D(x, y))
            this.ballContainer.push(ball);
        }
    }

    /**
     * Animates the stage.
     *
     * @private
     * @memberof Stage
     */
    private animate(): void {
        this.animateBalls();
    }

    /**
     * Animates balls.
     *
     * @private
     * @memberof Stage
     */
    private animateBalls(): void {
        for (let ball of this.ballContainer) {
            this.quadtree.insert(ball);
            ball.move();
            if (ball.pos.x > config.width || ball.pos.x < 0) ball.boundsX();
            if (ball.pos.y > config.height || ball.pos.y < 0) ball.boundsY();
        }
    }

    /**
     * Draws the stage
     *
     * @private
     * @memberof Stage
     */
    private draw(): void {
        this.context.clearRect(0, 0, config.width, config.height);
        this.drawQuadTree(this.quadtree.getRoot());
        this.drawBalls();
        this.quadtree.clear();
    }

    /**
     * Draws the instances of Balls.
     *
     * @private
     * @memberof Stage
     */
    private drawBalls(): void {
        for (let ball of this.ballContainer) {
            this.context.fillStyle = ball.color;
            this.context.lineWidth = 2;
            this.context.strokeStyle = ball.color;
            this.context.beginPath();
            this.context.arc(ball.pos.x, ball.pos.y, ball.dim.x, 0, 2 * Math.PI);
            this.context.stroke();
        }
    }

    /**
     * Draws the quadtree.
     *
     * @private
     * @param {Node} node
     * @memberof Stage
     */
    private drawQuadTree(node: Node): void {
        let box: Box = node.getBox();
        this.context.fillStyle = `rgba(255,50,50,0.05)`;
        this.context.strokeStyle = '#ff0000';
        this.context.lineWidth = 0.25;
        this.context.fillRect(box.pos.x, box.pos.y, box.dim.x, box.dim.y);
        this.context.strokeRect(box.pos.x, box.pos.y, box.dim.x, box.dim.y);
        if (!node.isEmty()) {
            let subnodes: Node[] = node.getSubNodes();
            for (let subnode of subnodes) {
                this.drawQuadTree(subnode);
            }
        }
    }

}

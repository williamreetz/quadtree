import { Box } from './box';
import { Vec2D } from '../math/vec2d';

/**
 * This class represents a Node of a quadtree.
 *
 * @author William Reetz
 * @export
 * @class Node
 */
export class Node {

    private box: Box;
    private halfWidth: number;
    private halfHeight: number;
    private midpointX: number;
    private midpointY: number;

    private items: Box[] = [];
    private subNodes!: [Node, Node, Node, Node];
    private maxDepth: number;
    private depth: number;
    private maxItems: number;

    /**
     * Creates an instance of Node.
     * 
     * @param {Box} box
     * @param {number} maxDepth
     * @param {number} maxChildren
     * @memberof Node
     */
    constructor(box: Box, depth: number, maxDepth: number, maxChildren: number) {
        this.box = box;
        this.depth = depth;
        this.maxDepth = maxDepth;
        this.maxItems = maxChildren;

        this.halfWidth = this.box.dim.x / 2;
        this.halfHeight = this.box.dim.y / 2;
        this.midpointX = this.box.pos.x + this.halfWidth;
        this.midpointY = this.box.pos.y + this.halfHeight;
    }

    /**
     * Returns a tuple with all subnodes.
     *
     * @returns {[Node, Node, Node, Node]}
     * @memberof Node
     */
    public getSubNodes(): [Node, Node, Node, Node] {
        return this.subNodes;
    }

    /**
     * Get the index of the node:  
     * 0: topLeft  
     * 1: topRight  
     * 2: bottomLeft  
     * 3: bottomRight  
     *
     * @private
     * @param {Box} child
     * @returns {number}
     * @memberof Node
     */
    private getIndex(item: Box): number {
        const top = item.pos.y < this.midpointY;
        const left = item.pos.x < this.midpointX;
        return (top ? 0 : 2) + (left ? 0 : 1);
    }

    /**
     * Inserts a new item to the node or subnode.
     *
     * @param {Box} item
     * @memberof Node
     */
    public insert(item: Box): void {
        if (!this.isEmty()) {
            const index = this.getIndex(item);
            this.subNodes[index].insert(item);
        } else {
            this.items.push(item);
            if (this.depth < this.maxDepth && this.items.length > this.maxItems) {

                this.subdivide();
                for (let item of this.items) {
                    this.insert(item);
                }
                this.items = [];
            }
        }
    }

    /**
     * Returns all potential items with which a collision is possible.
     *
     * @param {Box} item
     * @returns {Box[]}
     * @memberof Node
     */
    public retrieve(item: Box): Box[] {
        if (!this.isEmty()) {
            const index = this.getIndex(item);
            return this.subNodes[index].retrieve(item);
        }
        return this.items;
    }

    /**
     * Checks if the node has been divided into subnodes.
     *
     * @returns {boolean}
     * @memberof Node
     */
    public isEmty(): boolean {
        return this.subNodes === undefined;
    }

    /**
     * Divides the node in four subnodes.
     *
     * @private
     * @memberof Node
     */
    private subdivide(): void {
        const topLeft: Box = {
            pos: new Vec2D(this.box.pos.x, this.box.pos.y),
            dim: new Vec2D(this.halfWidth, this.halfHeight)
        }
        const topRight: Box = {
            pos: new Vec2D(this.midpointX, this.box.pos.y),
            dim: new Vec2D(this.halfWidth, this.halfHeight)
        }
        const bottomLeft: Box = {
            pos: new Vec2D(this.box.pos.x, this.midpointY),
            dim: new Vec2D(this.halfWidth, this.halfHeight)
        }
        const bottomRight: Box = {
            pos: new Vec2D(this.midpointX, this.midpointY),
            dim: new Vec2D(this.halfWidth, this.halfHeight)
        }
        const nextDepth = this.depth + 1;

        this.subNodes = [
            new Node(topLeft, nextDepth, this.maxDepth, this.maxItems),
            new Node(topRight, nextDepth, this.maxDepth, this.maxItems),
            new Node(bottomLeft, nextDepth, this.maxDepth, this.maxItems),
            new Node(bottomRight, nextDepth, this.maxDepth, this.maxItems)
        ];
    }
    /**
     * Returns the bounding box of the node.
     *
     * @returns {Box}
     * @memberof Node
     */
    public getBox(): Box {
        return this.box
    }
    /**
     * Returns the depth of the node.
     *
     * @returns {number}
     * @memberof Node
     */
    public getDepth(): number {
        return this.depth;
    }
}

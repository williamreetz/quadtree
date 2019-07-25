import { Node } from './node';
import { Box } from './box';

/**
 * This class represents a quadtree.
 *
 * @author William Reetz
 * @export
 * @class QuadTree
 */
export class QuadTree {

    private root: Node;
    private maxDepth: number;
    private maxChildren: number;
    private box: Box;

    /**
     * Creates an instance of QuadTree.
     * @param {Box} box
     * @param {number} maxDepth
     * @param {number} maxChildren
     * @memberof QuadTree
     */
    constructor(
        dimensions: Box,
        maxDepth: number,
        maxChildren: number
    ) {
        this.root = new Node(dimensions, 0, maxDepth, maxChildren);
        this.maxDepth = maxDepth;
        this.maxChildren = maxChildren;
        this.box = dimensions;
    }

    /**
     * Inserts a new item to the quadtree.
     *
     * @param {Box} item
     * @memberof QuadTree
     */
    public insert(item: Box): void {
        this.root.insert(item);
    }

    /**
     * Returns all potential items with which a collision is possible.
     *
     * @param {Box} box
     * @returns {Box[]}
     * @memberof QuadTree
     */
    public retrieve(item: Box): Box[] {
        return this.root.retrieve(item);
    }

    /**
     * Clears the Quadtree.
     *
     * @memberof QuadTree
     */
    public clear(): void {
        this.root = new Node(this.box, 0, this.maxDepth, this.maxChildren);
    }

    /**
     * Returns the root node of the quadtree.
     *
     * @returns {Node}
     * @memberof QuadTree
     */
    public getRoot(): Node {
        return this.root;
    }

}

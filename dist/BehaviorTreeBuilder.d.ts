import BehaviorTreeStatus from "./BehaviorTreeStatus";
import BehaviorTreeNodeInterface from "./Node/BehaviorTreeNodeInterface";
import StateData from "./StateData";
export default class BehaviorTreeBuilder<T> {
    /**
     * Last node created
     */
    private curNode?;
    /**
     * Stack node nodes that we are build via the fluent API.
     *
     * @type {Stack<ParentBehaviorTreeNodeInterface>}
     */
    private parentNodeStack;
    /**
     * Create an action node.
     *
     * @param {string} name
     * @param {(state: StateData) => BehaviorTreeStatus} fn
     * @returns {BehaviorTreeBuilder}
     */
    do(name: string, fn: (state: StateData<T>) => Promise<BehaviorTreeStatus>): BehaviorTreeBuilder<T>;
    /**
     * Like an action node... but the function can return true/false and is mapped to success/failure.
     *
     * @param {string} name
     * @param {(state: StateData) => boolean} fn
     * @returns {BehaviorTreeBuilder}
     */
    condition(name: string, fn: (state: StateData<T>) => Promise<boolean>): BehaviorTreeBuilder<T>;
    /**
     * Create an inverter node that inverts the success/failure of its children.
     *
     * @param {string} name
     * @returns {BehaviorTreeBuilder}
     */
    inverter(name: string): BehaviorTreeBuilder<T>;
    /**
     * Create a sequence node.
     *
     * @param {string}  name
     * @param {boolean} keepState
     * @returns {BehaviorTreeBuilder}
     */
    sequence(name: string, keepState?: boolean): BehaviorTreeBuilder<T>;
    /**
     * Create a parallel node.
     *
     * @param {string} name
     * @param {number} requiredToFail
     * @param {number} requiredToSucceed
     * @returns {BehaviorTreeBuilder}
     */
    parallel(name: string, requiredToFail: number, requiredToSucceed: number): BehaviorTreeBuilder<T>;
    /**
     * Create a selector node.
     *
     * @param {string}  name
     * @param {boolean} keepState
     * @returns {BehaviorTreeBuilder}
     */
    selector(name: string, keepState?: boolean): BehaviorTreeBuilder<T>;
    /**
     * Splice a sub tree into the parent tree.
     *
     * @param {BehaviorTreeNodeInterface} subTree
     * @returns {BehaviorTreeBuilder}
     */
    splice(subTree: BehaviorTreeNodeInterface<T>): BehaviorTreeBuilder<T>;
    /**
     * Build the actual tree
     * @returns {BehaviorTreeNodeInterface}
     */
    build(): BehaviorTreeNodeInterface<T>;
    /**
     * Ends a sequence of children.
     *
     * @returns {BehaviorTreeBuilder}
     */
    end(): BehaviorTreeBuilder<T>;
    /**
     * Adds the parent node to the parentNodeStack
     *
     * @param {ParentBehaviorTreeNodeInterface} node
     * @returns {BehaviorTreeBuilder}
     */
    private addParentNode;
}

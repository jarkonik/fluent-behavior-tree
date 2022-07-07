import BehaviorTreeStatus from "../BehaviorTreeStatus";
import StateData from "../StateData";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface";
import ParentBehaviorTreeNodeInterface from "./ParentBehaviorTreeNodeInterface";
/**
 * Runs child's nodes in parallel.
 *
 * @property {string} name                 - The name of the node.
 * @property {number} requiredToFail    - Number of child failures required to terminate with failure.
 * @property {number} requiredToSucceed - Number of child successes required to terminate with success.
 */
export default class ParallelNode<T> implements ParentBehaviorTreeNodeInterface<T> {
    readonly name: string;
    readonly requiredToFail: number;
    readonly requiredToSucceed: number;
    /**
     * List of child nodes.
     *
     * @type {BehaviorTreeNodeInterface[]}
     */
    private children;
    constructor(name: string, requiredToFail: number, requiredToSucceed: number);
    reset(): void;
    tick(state: StateData<T>): Promise<BehaviorTreeStatus>;
    addChild(child: BehaviorTreeNodeInterface<T>): void;
    private tickChildren;
}

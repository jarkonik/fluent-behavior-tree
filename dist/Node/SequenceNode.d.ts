import BehaviorTreeStatus from "../BehaviorTreeStatus";
import StateData from "../StateData";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface";
import ParentBehaviorTreeNodeInterface from "./ParentBehaviorTreeNodeInterface";
/**
 * Runs child nodes in sequence, until one fails.
 *
 * @property {string} name - The name of the node.
 */
export default class SequenceNode<T> implements ParentBehaviorTreeNodeInterface<T> {
    readonly name: string;
    private readonly keepState;
    /**
     * List of child nodes.
     *
     * @type {BehaviorTreeNodeInterface[]}
     */
    private children;
    /**
     * Enumerator to keep state
     */
    private enumerator?;
    constructor(name: string, keepState?: boolean);
    init(): void;
    tick(state: StateData<T>): Promise<BehaviorTreeStatus>;
    addChild(child: BehaviorTreeNodeInterface<T>): void;
}

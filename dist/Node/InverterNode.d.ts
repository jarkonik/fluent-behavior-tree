import BehaviorTreeStatus from "../BehaviorTreeStatus";
import StateData from "../StateData";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface";
import ParentBehaviorTreeNodeInterface from "./ParentBehaviorTreeNodeInterface";
/**
 * Decorator node that inverts the success/failure of its child.
 *
 * @property {string} name - The name of the node
 */
export default class InverterNode<T> implements ParentBehaviorTreeNodeInterface<T> {
    readonly name: string;
    /**
     * The child to be inverted
     */
    private childNode?;
    constructor(name: string);
    reset(): void;
    tick(state: StateData<T>): Promise<BehaviorTreeStatus>;
    addChild(child: BehaviorTreeNodeInterface<T>): void;
}

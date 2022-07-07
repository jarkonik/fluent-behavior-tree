import BehaviorTreeStatus from "../BehaviorTreeStatus";
import StateData from "../StateData";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface";
/**
 * A behavior tree leaf node for running an action
 *
 * @property {string}                                   name - The name of the node
 * @property {(state: StateData) => BehaviorTreeStatus} fn   - Function to invoke for the action.
 */
export default class ActionNode<T> implements BehaviorTreeNodeInterface<T> {
    readonly name: string;
    readonly fn: (state: StateData<T>) => Promise<BehaviorTreeStatus>;
    constructor(name: string, fn: (state: StateData<T>) => Promise<BehaviorTreeStatus>);
    reset(): void;
    tick(state: StateData<T>): Promise<BehaviorTreeStatus>;
}

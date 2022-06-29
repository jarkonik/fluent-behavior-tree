import BehaviorTreeNodeInterface from "./Node/BehaviorTreeNodeInterface";
export default class NodeEnumerator<T> implements Iterable<BehaviorTreeNodeInterface<T>> {
    nodes: Array<BehaviorTreeNodeInterface<T>>;
    currentIndex: number;
    get current(): BehaviorTreeNodeInterface<T>;
    constructor(nodes: Array<BehaviorTreeNodeInterface<T>>);
    [Symbol.iterator](): Iterator<BehaviorTreeNodeInterface<T>>;
    next(): boolean;
    hasNext(): boolean;
    reset(): void;
}

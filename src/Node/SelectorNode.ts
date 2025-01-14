import BehaviorTreeStatus from "../BehaviorTreeStatus";
import NodeEnumerator from "../NodeEnumerator";
import StateData from "../StateData";
import BehaviorTreeNodeInterface from "./BehaviorTreeNodeInterface";
import ParentBehaviorTreeNodeInterface from "./ParentBehaviorTreeNodeInterface";

/**
 * Selects the first node that succeeds. Tries successive nodes until it finds one that doesn't fail.
 *
 * @property {string} name - The name of the node.
 */
export default class SelectorNode<T>
  implements ParentBehaviorTreeNodeInterface<T> {
  /**
   * List of child nodes.
   *
   * @type {BehaviorTreeNodeInterface[]}
   */
  private children: Array<BehaviorTreeNodeInterface<T>> = [];

  /**
   * Enumerator to keep state
   */
  private enumerator?: NodeEnumerator<T>;

  public constructor(
    public readonly name: string,
    private readonly keepState: boolean = false,
  ) {}

  public reset(): void {
    this.enumerator.reset();
  }

  public init(): void {
    this.enumerator = new NodeEnumerator(this.children);
  }

  public async tick(state: StateData<T>): Promise<BehaviorTreeStatus> {
    if (!this.enumerator || !this.keepState) {
      this.init();
    }

    if (!this.enumerator.current) {
      return BehaviorTreeStatus.Running;
    }

    do {
      const status = await this.enumerator.current.tick(state);
      if (status !== BehaviorTreeStatus.Failure) {
        if (status === BehaviorTreeStatus.Success) {
          this.enumerator.reset();
        }

        return status;
      }
    } while (this.enumerator.next());
    this.enumerator.reset();

    return BehaviorTreeStatus.Failure;
  }

  public addChild(child: BehaviorTreeNodeInterface<T>): void {
    this.children.push(child);
  }
}

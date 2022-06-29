"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_data_stack_1 = require("ts-data.stack");
const BehaviorTreeStatus_1 = require("./BehaviorTreeStatus");
const BehaviorTreeError_1 = require("./Error/BehaviorTreeError");
const Errors_1 = require("./Error/Errors");
const ActionNode_1 = require("./Node/ActionNode");
const InverterNode_1 = require("./Node/InverterNode");
const ParallelNode_1 = require("./Node/ParallelNode");
const SelectorNode_1 = require("./Node/SelectorNode");
const SequenceNode_1 = require("./Node/SequenceNode");
class BehaviorTreeBuilder {
    constructor() {
        /**
         * Stack node nodes that we are build via the fluent API.
         *
         * @type {Stack<ParentBehaviorTreeNodeInterface>}
         */
        this.parentNodeStack = new ts_data_stack_1.default();
    }
    /**
     * Create an action node.
     *
     * @param {string} name
     * @param {(state: StateData) => BehaviorTreeStatus} fn
     * @returns {BehaviorTreeBuilder}
     */
    do(name, fn) {
        if (this.parentNodeStack.isEmpty()) {
            throw new BehaviorTreeError_1.default(Errors_1.default.UNNESTED_ACTION_NODE);
        }
        const actionNode = new ActionNode_1.default(name, fn);
        this.parentNodeStack.peek().addChild(actionNode);
        return this;
    }
    /**
     * Like an action node... but the function can return true/false and is mapped to success/failure.
     *
     * @param {string} name
     * @param {(state: StateData) => boolean} fn
     * @returns {BehaviorTreeBuilder}
     */
    condition(name, fn) {
        return this.do(name, (t) => __awaiter(this, void 0, void 0, function* () { return (yield fn(t)) ? BehaviorTreeStatus_1.default.Success : BehaviorTreeStatus_1.default.Failure; }));
    }
    /**
     * Create an inverter node that inverts the success/failure of its children.
     *
     * @param {string} name
     * @returns {BehaviorTreeBuilder}
     */
    inverter(name) {
        return this.addParentNode(new InverterNode_1.default(name));
    }
    /**
     * Create a sequence node.
     *
     * @param {string}  name
     * @param {boolean} keepState
     * @returns {BehaviorTreeBuilder}
     */
    sequence(name, keepState = true) {
        return this.addParentNode(new SequenceNode_1.default(name, keepState));
    }
    /**
     * Create a parallel node.
     *
     * @param {string} name
     * @param {number} requiredToFail
     * @param {number} requiredToSucceed
     * @returns {BehaviorTreeBuilder}
     */
    parallel(name, requiredToFail, requiredToSucceed) {
        return this.addParentNode(new ParallelNode_1.default(name, requiredToFail, requiredToSucceed));
    }
    /**
     * Create a selector node.
     *
     * @param {string}  name
     * @param {boolean} keepState
     * @returns {BehaviorTreeBuilder}
     */
    selector(name, keepState = true) {
        return this.addParentNode(new SelectorNode_1.default(name, keepState));
    }
    /**
     * Splice a sub tree into the parent tree.
     *
     * @param {BehaviorTreeNodeInterface} subTree
     * @returns {BehaviorTreeBuilder}
     */
    splice(subTree) {
        if (this.parentNodeStack.isEmpty()) {
            throw new BehaviorTreeError_1.default(Errors_1.default.SPLICE_UNNESTED_TREE);
        }
        this.parentNodeStack.peek().addChild(subTree);
        return this;
    }
    /**
     * Build the actual tree
     * @returns {BehaviorTreeNodeInterface}
     */
    build() {
        if (!this.curNode) {
            throw new BehaviorTreeError_1.default(Errors_1.default.NO_NODES);
        }
        return this.curNode;
    }
    /**
     * Ends a sequence of children.
     *
     * @returns {BehaviorTreeBuilder}
     */
    end() {
        this.curNode = this.parentNodeStack.pop();
        return this;
    }
    /**
     * Adds the parent node to the parentNodeStack
     *
     * @param {ParentBehaviorTreeNodeInterface} node
     * @returns {BehaviorTreeBuilder}
     */
    addParentNode(node) {
        if (!this.parentNodeStack.isEmpty()) {
            this.parentNodeStack.peek().addChild(node);
        }
        this.parentNodeStack.push(node);
        return this;
    }
}
exports.default = BehaviorTreeBuilder;
//# sourceMappingURL=BehaviorTreeBuilder.js.map
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
const BehaviorTreeStatus_1 = require("../BehaviorTreeStatus");
const NodeEnumerator_1 = require("../NodeEnumerator");
/**
 * Runs child nodes in sequence, until one fails.
 *
 * @property {string} name - The name of the node.
 */
class SequenceNode {
    constructor(name, keepState = false) {
        this.name = name;
        this.keepState = keepState;
        /**
         * List of child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
        this.children = [];
    }
    reset() {
        this.enumerator.reset();
    }
    init() {
        this.enumerator = new NodeEnumerator_1.default(this.children);
    }
    tick(state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.enumerator || !this.keepState) {
                this.init();
            }
            if (!this.enumerator.current) {
                return BehaviorTreeStatus_1.default.Running;
            }
            do {
                const status = yield this.enumerator.current.tick(state);
                if (status !== BehaviorTreeStatus_1.default.Success) {
                    if (status === BehaviorTreeStatus_1.default.Failure) {
                        this.enumerator.reset();
                    }
                    return status;
                }
            } while (this.enumerator.next());
            this.enumerator.reset();
            return BehaviorTreeStatus_1.default.Success;
        });
    }
    addChild(child) {
        this.children.push(child);
    }
}
exports.default = SequenceNode;
//# sourceMappingURL=SequenceNode.js.map
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
/**
 * Runs child's nodes in parallel.
 *
 * @property {string} name                 - The name of the node.
 * @property {number} requiredToFail    - Number of child failures required to terminate with failure.
 * @property {number} requiredToSucceed - Number of child successes required to terminate with success.
 */
class ParallelNode {
    constructor(name, requiredToFail, requiredToSucceed) {
        this.name = name;
        this.requiredToFail = requiredToFail;
        this.requiredToSucceed = requiredToSucceed;
        /**
         * List of child nodes.
         *
         * @type {BehaviorTreeNodeInterface[]}
         */
        this.children = [];
    }
    tick(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const statuses = yield Promise.all(this.children.map((c) => this.tickChildren(state, c)));
            const succeeded = statuses.filter((x) => x === BehaviorTreeStatus_1.default.Success).length;
            const failed = statuses.filter((x) => x === BehaviorTreeStatus_1.default.Failure).length;
            if (this.requiredToSucceed > 0 && succeeded >= this.requiredToSucceed) {
                return BehaviorTreeStatus_1.default.Success;
            }
            if (this.requiredToFail > 0 && failed >= this.requiredToFail) {
                return BehaviorTreeStatus_1.default.Failure;
            }
            return BehaviorTreeStatus_1.default.Running;
        });
    }
    addChild(child) {
        this.children.push(child);
    }
    tickChildren(state, child) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield child.tick(state);
            }
            catch (e) {
                return BehaviorTreeStatus_1.default.Failure;
            }
        });
    }
}
exports.default = ParallelNode;
//# sourceMappingURL=ParallelNode.js.map
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
const BehaviorTreeError_1 = require("../Error/BehaviorTreeError");
const Errors_1 = require("../Error/Errors");
/**
 * A behavior tree leaf node for running an action
 *
 * @property {string}                                   name - The name of the node
 * @property {(state: StateData) => BehaviorTreeStatus} fn   - Function to invoke for the action.
 */
class ActionNode {
    constructor(name, fn) {
        this.name = name;
        this.fn = fn;
    }
    reset() { }
    tick(state) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.fn(state);
            if (!result) {
                throw new BehaviorTreeError_1.default(Errors_1.default.NO_RETURN_VALUE);
            }
            return result;
        });
    }
}
exports.default = ActionNode;
//# sourceMappingURL=ActionNode.js.map
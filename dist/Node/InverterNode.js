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
const BehaviorTreeError_1 = require("../Error/BehaviorTreeError");
const Errors_1 = require("../Error/Errors");
/**
 * Decorator node that inverts the success/failure of its child.
 *
 * @property {string} name - The name of the node
 */
class InverterNode {
    constructor(name) {
        this.name = name;
    }
    tick(state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.childNode) {
                throw new BehaviorTreeError_1.default(Errors_1.default.INVERTER_NO_CHILDREN);
            }
            const result = yield this.childNode.tick(state);
            if (result === BehaviorTreeStatus_1.default.Failure) {
                return BehaviorTreeStatus_1.default.Success;
            }
            else if (result === BehaviorTreeStatus_1.default.Success) {
                return BehaviorTreeStatus_1.default.Failure;
            }
            return result;
        });
    }
    addChild(child) {
        if (!!this.childNode) {
            throw new BehaviorTreeError_1.default(Errors_1.default.INVERTER_MULTIPLE_CHILDREN);
        }
        this.childNode = child;
    }
}
exports.default = InverterNode;
//# sourceMappingURL=InverterNode.js.map
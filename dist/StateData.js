"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents time and state. Used to pass time values to behavior tree nodes.
 *
 * @property {number} deltaTime - The current time of this state representation
 * @property {object} state     - Any state data you would like to pass to the nodes.
 */
class StateData {
    constructor(deltaTime = 0, state) {
        this.deltaTime = deltaTime;
        this.state = state;
    }
}
exports.default = StateData;
//# sourceMappingURL=StateData.js.map
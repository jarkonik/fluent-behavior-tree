/**
 * Represents time and state. Used to pass time values to behavior tree nodes.
 *
 * @property {number} deltaTime - The current time of this state representation
 * @property {object} state     - Any state data you would like to pass to the nodes.
 */
export default class StateData<T> {
    readonly deltaTime: number;
    readonly state: T;
    constructor(deltaTime: number, state: T);
}

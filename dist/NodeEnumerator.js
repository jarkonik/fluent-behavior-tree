"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NodeEnumerator {
    constructor(nodes) {
        this.nodes = nodes;
        this.currentIndex = 0;
        this.nodes = nodes;
    }
    get current() {
        return this.nodes[this.currentIndex];
    }
    [Symbol.iterator]() {
        return {
            next: () => {
                let result;
                if (this.currentIndex < this.nodes.length) {
                    result = { value: this.current, done: false };
                    this.next();
                }
                else {
                    result = { done: true };
                }
                return result;
            },
        };
    }
    next() {
        if (this.hasNext()) {
            this.currentIndex++;
            return true;
        }
        return false;
    }
    hasNext() {
        return !!this.nodes[this.currentIndex + 1];
    }
    reset() {
        this.currentIndex = 0;
    }
}
exports.default = NodeEnumerator;
//# sourceMappingURL=NodeEnumerator.js.map
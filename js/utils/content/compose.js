"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(plugins) {
    return (frontmatter, content) => {
        let curr = content;
        for (let f of plugins) {
            curr = f(frontmatter, curr);
        }
        return curr;
    };
}
exports.default = compose;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A fake unified compiler/stringifier that outputs nothing, is useful to run only parse and transform.
 */
function compileNothing() {
    this.Compiler = () => "";
}
exports.default = compileNothing;

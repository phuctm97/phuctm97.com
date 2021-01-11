"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A fake unified compiler that outputs nothing, is useful to run only parse and transform.
 */
function fakeCompiler() {
    this.Compiler = () => "";
}
exports.default = fakeCompiler;

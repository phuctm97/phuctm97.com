"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.notNil = void 0;
const notNil = (val) => !!val;
exports.notNil = notNil;
const isObject = (val) => typeof val === "object" && val !== null;
exports.isObject = isObject;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenStringArray = exports.isMapOfStringArray = exports.isStringArray = void 0;
const isStringArray = (obj) => {
    if (!Array.isArray(obj))
        return false;
    for (let item of obj) {
        if (typeof item !== "string")
            return false;
    }
    return true;
};
exports.isStringArray = isStringArray;
const isMapOfStringArray = (obj) => {
    if (typeof obj !== "object")
        return false;
    const vals = Object.values(obj);
    for (let val of vals) {
        if (!exports.isStringArray(val))
            return false;
    }
    return true;
};
exports.isMapOfStringArray = isMapOfStringArray;
const flattenStringArray = (obj) => {
    const vals = Object.values(obj);
    let result = [];
    for (let arr of vals) {
        result = result.concat(arr);
    }
    return result;
};
exports.flattenStringArray = flattenStringArray;

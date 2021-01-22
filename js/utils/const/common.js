"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_PRODUCTION = exports.HOMEPAGE = exports.PKG_JSON = void 0;
const url_1 = require("url");
const package_json_1 = __importDefault(require("../../package.json"));
exports.PKG_JSON = package_json_1.default;
exports.HOMEPAGE = new url_1.URL(package_json_1.default.homepage);
exports.IS_PRODUCTION = process.env.NODE_ENV === "production" &&
    process.env.VERCEL_ENV === "production";

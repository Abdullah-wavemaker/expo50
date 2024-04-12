"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = __importDefault(require("./profile"));
exports.default = {
    ...profile_1.default,
    generateWeb: false,
    copyResources: false,
    useLocalMetadata: false
};
//# sourceMappingURL=development.profile.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = __importDefault(require("./profile"));
exports.default = {
    ...profile_1.default,
    copyResources: true,
    useLocalMetadata: false,
    lazyloadPages: false,
    lazyloadPartials: false,
    lazyloadPrefabs: false
};
//# sourceMappingURL=expo-preview.profile.js.map
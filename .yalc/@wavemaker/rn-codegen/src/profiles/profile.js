"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProfile = void 0;
const lodash_1 = require("lodash");
;
/**
 * Default profile
 */
const DefaultProfile = {
    generateWeb: false,
    copyResources: true,
    lazyloadPages: true,
    lazyloadPartials: true,
    lazyloadPrefabs: true,
    linkNodeModules: false,
    useLocalMetadata: true,
    targetPlatform: 'native'
};
const profile = {
    ...DefaultProfile
};
const setProfile = (p) => (0, lodash_1.assignIn)(profile, DefaultProfile, p);
exports.setProfile = setProfile;
exports.default = profile;
//# sourceMappingURL=profile.js.map
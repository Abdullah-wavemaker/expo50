const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

module.exports = (async () => {
    try {
        const projectRoot = __dirname;
        const config = getDefaultConfig(projectRoot);
        config.watchFolders = [projectRoot];
        config.resolver.nodeModulesPaths = [
            path.resolve(projectRoot, 'node_modules')
        ];
        config.resolver.disableHierarchicalLookup = true;
        config.transformer = {
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: false
                }
            })
        }
        config.resolver = {
            assetExts: config.resolver.assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...config.resolver.sourceExts, 'svg']
        }
        return config;
    }
    catch (e) {
        console.log('error in metro config file');
    }
})();
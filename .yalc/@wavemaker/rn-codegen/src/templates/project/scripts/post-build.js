const fs = require('fs');

async function readAndReplaceFileContent(path, writeFn) {
    const content = fs.readFileSync(path, 'utf-8');
    return Promise.resolve().then(() => {    
        return writeFn && writeFn(content);
    }).then((modifiedContent) => {
        if (modifiedContent !== undefined && modifiedContent !== null) {
            fs.writeFileSync(path, modifiedContent);
            return modifiedContent;
        }
        return content;
    });
}

async function patchCarousel() {
    const path = `${__dirname}/../node_modules/react-native-snap-carousel/src`;
    const updateViewPropTypes = (content) => {
        if (content.indexOf('deprecated-react-native-prop-types') < 0) {
            return content.replace(/,\s*ViewPropTypes/, '')
                .replace('\'react-native\';', '\'react-native\';\nimport {ViewPropTypes} from \'deprecated-react-native-prop-types\';');
        }
        return content;
    };
    await readAndReplaceFileContent(`${path}/carousel/Carousel.js`, updateViewPropTypes);
    await readAndReplaceFileContent(`${path}/pagination/Pagination.js`, updateViewPropTypes);
    await readAndReplaceFileContent(`${path}/pagination/PaginationDot.js`, updateViewPropTypes);
    await readAndReplaceFileContent(`${path}/parallaximage/ParallaxImage.js`, updateViewPropTypes);
    console.log('Patched react-native-snap-carousel');
}

function patch() {
    patchCarousel();
}

patch();
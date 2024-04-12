import { isString } from 'lodash';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';

const resourceStore = {
  'resources/assets/icon.png': () =>
    require('../../assets/resources/assets/icon.png'),
  'resources/assets/splash.png': () =>
    require('../../assets/resources/assets/splash.png'),
  'resources/images/imagelists/03a6e082-7182-44d5-9015-40eb7565bb5b.png': () =>
    require('../../assets/resources/images/imagelists/03a6e082-7182-44d5-9015-40eb7565bb5b.png'),
  'resources/images/imagelists/default-image.png': () =>
    require('../../assets/resources/images/imagelists/default-image.png'),
  'resources/images/imagelists/icons8-star-24.png': () =>
    require('../../assets/resources/images/imagelists/icons8-star-24.png'),
  'resources/images/imagelists/ki.png': () =>
    require('../../assets/resources/images/imagelists/ki.png'),
  'resources/images/imagelists/loader.gif': () =>
    require('../../assets/resources/images/imagelists/loader.gif'),
  'resources/images/imagelists/logo-bright.svg': () =>
    require('../../assets/resources/images/imagelists/logo-bright.svg'),
  'resources/images/imagelists/mrbean2.jpeg': () =>
    require('../../assets/resources/images/imagelists/mrbean2.jpeg'),
  'resources/images/imagelists/mrbean3.jpeg': () =>
    require('../../assets/resources/images/imagelists/mrbean3.jpeg'),
  'resources/images/imagelists/spinner-small.gif': () =>
    require('../../assets/resources/images/imagelists/spinner-small.gif'),
  'resources/images/imagelists/star.png': () =>
    require('../../assets/resources/images/imagelists/star.png'),
  'resources/images/logos/Other/download.jpeg': () =>
    require('../../assets/resources/images/logos/Other/download.jpeg'),
  'resources/images/logos/Other/logo.png': () =>
    require('../../assets/resources/images/logos/Other/logo.png'),
  'resources/images/logos/Other/wavemaker_62x62.png': () =>
    require('../../assets/resources/images/logos/Other/wavemaker_62x62.png'),
};

export default {
  resolve: (path, baseUrl) => {
    if (!isString(path)) {
      return path;
    }
    if (baseUrl && !resourceStore[path] && !isFullPathUrl(path)) {
      return baseUrl + (path.startsWith('/') ? '' : '/') + path;
    }
    return (resourceStore[path] && resourceStore[path]()) || path;
  },
};

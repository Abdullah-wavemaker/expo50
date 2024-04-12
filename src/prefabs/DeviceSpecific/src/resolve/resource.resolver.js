import { isString } from 'lodash';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';

const resourceStore = {
  'resources/i18n/en.json': () =>
    require('../../assets/resources/i18n/en.json'),
  'resources/images/imagelists/default-image.png': () =>
    require('../../assets/resources/images/imagelists/default-image.png'),
  'resources/images/imagelists/prefab-icon.png': () =>
    require('../../assets/resources/images/imagelists/prefab-icon.png'),
  'resources/images/imagelists/spinner-small.gif': () =>
    require('../../assets/resources/images/imagelists/spinner-small.gif'),
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

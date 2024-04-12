import { isString } from 'lodash';
import { isFullPathUrl } from '@wavemaker/app-rn-runtime/core/utils';

const resourceStore = {};

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

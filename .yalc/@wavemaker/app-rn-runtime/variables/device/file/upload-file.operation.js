import axios from 'axios';
import { Platform } from 'react-native';
import { endsWith } from 'lodash-es';
import * as DocumentPicker from 'expo-document-picker';
import { FileExtensionTypesMap } from '@wavemaker/app-rn-runtime/core/file-extension-types';
const namedParameters = {
  copyToCacheDirectory: false,
  multiple: false,
  type: '*/*'
};
export class UploadFileOperation {
  chooseFile() {
    return DocumentPicker.getDocumentAsync(namedParameters).then(response => {
      return Platform.OS === 'web' ? response.file : response.uri;
    });
  }
  invoke(params) {
    params.serverUrl = endsWith(params.serverUrl, '/') ? params.serverUrl : params.serverUrl + '/';
    let serverUrl = params.serverUrl + 'services/file/uploadFile';
    if (params.remoteFolder) {
      serverUrl = serverUrl + '?relativePath=' + params.remoteFolder;
    }
    return Promise.resolve().then(() => {
      if (!params.localFile && params.browse) {
        return this.chooseFile();
      } else {
        return params.localFile;
      }
    }).then(filePath => {
      if (!filePath) {
        return;
      }
      const fileName = filePath.split('/').pop() || '';
      const arr = fileName.split('.');
      const fileExtension = '.' + arr[arr.length - 1];
      let fileObj = {
        uri: filePath,
        type: FileExtensionTypesMap[fileExtension],
        name: fileName
      };
      let formData = new FormData();
      formData.append('files', fileObj);
      return axios({
        url: serverUrl,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(response => {
        return response.data[0];
      }, error => error);
    });
  }
}
//# sourceMappingURL=upload-file.operation.js.map
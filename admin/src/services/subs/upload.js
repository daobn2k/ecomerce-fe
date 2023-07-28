import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  upload: '/uploadfile',
};

class uploadApi {
  uploadFile(params) {
    const url = urls.upload;
    return Api.request({ method: methods.post, url, params });
  }
}

export default uploadApi;

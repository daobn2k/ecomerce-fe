import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  resources: '/resources',
  districts: '/resources/districts',
};

class resourcesApi {
  resources() {
    const url = urls.resources;
    return Api.request({ method: methods.get, url });
  }
  districts(params) {
    const url = urls.districts;
    return Api.request({ method: methods.get, url, params });
  }
}

export default resourcesApi;

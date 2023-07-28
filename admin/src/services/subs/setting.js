import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  settingCategories: '/settings/categories',
  settingServices: '/settings/services',
  settings: '/settings',
};

class settingApi {
  addCategories(params) {
    const url = urls.settingCategories;
    return Api.request({ method: methods.post, url, params });
  }
  editCategories(id, params) {
    const url = `${urls.settingCategories}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  deleteCategories(id) {
    const url = `${urls.settingCategories}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  addServices(params) {
    const url = urls.settingServices;
    return Api.request({ method: methods.post, url, params });
  }
  editServices(id, params) {
    const url = `${urls.settingServices}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  deleteServices(id) {
    const url = `${urls.settingServices}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  editSettings(params) {
    const url = urls.settings;
    return Api.request({ method: methods.put, url, params });
  }
}

export default settingApi;

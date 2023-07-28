import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  getUser: '/categories',
  userDetail: '/categories',
  userAccount: '/categories',
  userAll: '/categories/all',
  remove: '/categories',
  changePoint: '/categories',
};

class categoriesApi {
  get(params) {
    const url = urls.getUser;
    return Api.request({ method: methods.get, url, params });
  }
  detail(id) {
    const url = `${urls.userAccount}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit({ id, params }) {
    const url = `${urls.userAccount}/${id}`;
    return Api.request({ method: methods.patch, url, params });
  }
  remove(id) {
    const url = `${urls.remove}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}

export default categoriesApi;

import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  getUser: '/users',
  userDetail: '/users/profile',
  userAccount: '/users',
  userAll: '/users/all',
  remove: '/users',
  changePoint: '/users/update-points',
};

class userApi {
  getUser(params) {
    const url = urls.getUser;
    return Api.request({ method: methods.get, url, params });
  }
  getUserAll(params) {
    const url = urls.userAll;
    return Api.request({ method: methods.get, url, params });
  }
  getUserDetail(id) {
    const url = `${urls.userAccount}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  editUser({ id, params }) {
    const url = `${urls.userAccount}/${id}`;
    return Api.request({ method: methods.patch, url, params });
  }
  deleteUser(params) {
    const url = urls.getUser;
    return Api.request({ method: methods.delete, url });
  }
  remove(id) {
    const url = `${urls.remove}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  changePoint(params) {
    const url = urls.changePoint;
    return Api.request({ method: methods.post, url, params });
  }
  addUser(params) {
    const url = urls.getUser;
    return Api.request({ method: methods.post, url, params });
  }
}

export default userApi;

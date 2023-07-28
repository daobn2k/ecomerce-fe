import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  login: '/user/login',
  logout: '/user/logout',
  register: '/user/register',
  refreshToken:'/user/new-token',
};

class authApi {
  login(params) {
    const url = urls.login;
    return Api.request({ method: methods.post, url, params });
  }
  register(params) {
    const url = urls.register;
    return Api.request({ method: methods.post, url, params });
  }
  logout(params) {
    const url = urls.logout;
    return Api.request({ method: methods.post, url, params });
  }
  refreshToken(params){
    const url = urls.refreshToken;
    return Api.request({ method: methods.post, url, params });

  }
}



export default authApi

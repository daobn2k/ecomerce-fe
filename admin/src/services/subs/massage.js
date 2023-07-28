import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  massages: '/massages',
};

class massageApi {
  getMassage(params) {
    const url = `${urls.massages}/massages-for-admin`;
    return Api.request({ method: methods.get, url, params });
  }
  detail(id) {
    const url = `${urls.massages}/detail/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit({ id, params }) {
    const url = `${urls.massages}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  approve(id, params) {
    const url = `${urls.massages}/${id}/approve`;
    return Api.request({ method: methods.put, url, params });
  }
  deApprove(id, params) {
    const url = `${urls.massages}/${id}/deapprove`;
    return Api.request({ method: methods.put, url, params });
  }
  remove({ id }) {
    const url = `${urls.massages}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}

export default massageApi;

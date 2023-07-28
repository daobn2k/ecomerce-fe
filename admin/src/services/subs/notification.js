import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  notification: '/notification',
};

class notificationApi {
  getNotification(params) {
    const url = urls.notification;
    return Api.request({ method: methods.get, url, params });
  }
}

export default notificationApi;

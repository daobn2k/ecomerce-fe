import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  voucher: '/voucher',
};

class voucherApi {
  get(params) {
    const url = urls.voucher;
    return Api.request({ method: methods.get, url, params });
  }
  detail(id) {
    const url = `${urls.voucher}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit({ id, params }) {
    const url = `${urls.voucher}/${id}`;
    return Api.request({ method: methods.patch, url, params });
  }
  remove(id) {
    const url = `${urls.voucher}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  add(params) {
    const url = urls.voucher;
    return Api.request({ method: methods.post, url, params });
  }
}

export default voucherApi;

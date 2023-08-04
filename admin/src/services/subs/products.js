import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  products: '/Products',
};

class productsApi {
  get(params) {
    const url = urls.products;
    return Api.request({ method: methods.get, url, params });
  }
  detail(id) {
    const url = `${urls.products}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit({ id, params }) {
    const url = `${urls.products}/${id}`;
    return Api.request({ method: methods.patch, url, params });
  }
  remove(id) {
    const url = `${urls.products}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  add(params) {
    const url = urls.products;
    return Api.request({ method: methods.post, url, params });
  }
}

export default productsApi;

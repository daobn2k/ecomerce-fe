import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  transactions: '/transactions/admin',
};

class transactionsApi {
  transactions(params) {
    const url = urls.transactions;
    return Api.request({ method: methods.get, url, params });
  }
}

export default transactionsApi;

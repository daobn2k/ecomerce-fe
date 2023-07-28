import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  reviews: '/reviews/cms/list',
  reviewsChangeStatus: '/reviews/change-status',
  reviewsDetail: '/reviews/detail',
  remove: '/reviews/detail',
};

class reviewApi {
  getReviews(params) {
    const url = urls.reviews;
    return Api.request({ method: methods.get, url, params });
  }
  changeStatus(id, params) {
    const url = `${urls.reviewsChangeStatus}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  remove({ id }) {
    const url = `${urls.remove}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
  getDetailReviews(id) {
    const url = `${urls.reviewsDetail}/${id}`;
    return Api.request({ method: methods.get, url });
  }
}

export default reviewApi;

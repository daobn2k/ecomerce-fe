import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  xvideos: '/xvideos',
  postXVideo: '/xvideos/new-post',
  reaction: '/xvideos/reaction',
  slug: '/xvideos/slug',
  approve: '/xvideos/approve-post',
  edit: '/xvideos/new-post',
};

class xVideoApi {
  getXVideo(params) {
    const url = urls.xvideos;
    return Api.request({ method: methods.get, url, params });
  }
  getDetailXVideo(id) {
    const url = `${urls.xvideos}/${id}`;
    return Api.request({ method: methods.get, url });
  }

  getDetailXVideoBySlug(id) {
    const url = `${urls.slug}/${id}`;

    return Api.request({ method: methods.get, url });
  }
  createPostXVideo(params) {
    const url = urls.postXVideo;
    return Api.request({ method: methods.post, url, params });
  }
  actionXVideo(params) {
    const url = urls.reaction;
    return Api.request({ method: methods.post, url, params });
  }
  approve(id, params) {
    const url = `${urls.approve}/${id}`;
    return Api.request({ method: methods.post, url, params });
  }
  edit(id, params) {
    const url = `${urls.edit}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  remove({ id }) {
    const url = `${urls.xvideos}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}

export default xVideoApi;

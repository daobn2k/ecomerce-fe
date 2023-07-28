import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  xalbums: '/xalbums',
  xAlbumsApprove: '/xalbums/approve-album',
};

class xAlbumApi {
  get(params) {
    const url = urls.xalbums;
    return Api.request({ method: methods.get, url, params });
  }
  getDetail(id) {
    const url = `${urls.xalbums}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit(id, params) {
    const url = `${urls.xalbums}/new-album/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  approve(id, params) {
    const url = `${urls.xAlbumsApprove}/${id}`;
    return Api.request({ method: methods.post, url, params });
  }
  remove(id) {
    const url = `${urls.xalbums}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}

export default xAlbumApi;

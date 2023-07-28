import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  xstories: '/xstories',
  xStoriesApprove: '/xstories/approve-story',
  editXStories: '/xstories/new-story',
};

class xStoryApi {
  get(params) {
    const url = urls.xstories;
    return Api.request({ method: methods.get, url, params });
  }
  getDetail(id) {
    const url = `${urls.xstories}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  edit(id, params) {
    const url = `${urls.editXStories}/${id}`;
    return Api.request({ method: methods.put, url, params });
  }
  approve(id, params) {
    const url = `${urls.xStoriesApprove}/${id}`;
    return Api.request({ method: methods.post, url, params });
  }
  remove({ id }) {
    const url = `${urls.xstories}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}

export default xStoryApi;

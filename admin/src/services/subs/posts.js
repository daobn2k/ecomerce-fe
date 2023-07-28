import Api from 'services/ApiManager';
import { methods } from 'services/method.services';

const urls = {
  posts: '/posts',
  postsDistrict: '/posts/location-districts',
  postsAdmin: '/posts/posts-for-admin',
  myPosts: '/posts/my-posts',
  massage: '/massage',
};

class postsApi {
  getPosts(params) {
    const url = urls.postsAdmin;
    return Api.request({ method: methods.get, url, params });
  }
  getDetail({ id }) {
    const url = `${urls.posts}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  getMyPosts({ id }) {
    const url = `${urls.myPosts}/${id}`;
    return Api.request({ method: methods.get, url });
  }
  getDistrict(params) {
    const url = urls.postsDistrict;
    return Api.request({ method: methods.get, url, params });
  }
  changeStatusPosts({ id, params }) {
    const url = `${urls.posts}/${id}/change-status`;
    return Api.request({ method: methods.put, url, params });
  }
  createPosts(params) {
    const url = urls.posts;
    return Api.request({ method: methods.post, url, params });
  }
  editPosts({ id, params }) {
    const url = `${urls.posts}/${id}`;
    return Api.request({ method: methods.put, url, params: { ...params } });
  }
  approve(id, params) {
    const url = `${urls.posts}/${id}/approve`;
    return Api.request({ method: methods.put, url, params });
  }
  deApprove(id, params) {
    const url = `${urls.posts}/${id}/deapprove`;
    return Api.request({ method: methods.put, url, params });
  }
  remove({ id }) {
    const url = `${urls.posts}/${id}`;
    return Api.request({ method: methods.delete, url });
  }
}
export default postsApi;

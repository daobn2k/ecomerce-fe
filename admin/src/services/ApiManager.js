/**
 * helper.js - for storing reusable logic.
 */
import { notification } from 'antd';
import Axios from 'axios';
import { service } from 'constants/service.constants.js';
import { clearStorage, getToken, getUserProfile, setToken, setUserProfile } from 'utils/storage.ultils';
import { code } from './code.services';
import { errorCode } from './errorCode.services';
import { methods } from './method.services';
import authApi from './subs/auth';

const TIMEOUT = 60 * 1000; // 30 seconds

const axiosInit = Axios.create({
  baseURL: service.DOMAIN,
  timeout: TIMEOUT,
});

const { CancelToken } = Axios;

class ApiClient {
  // Map lưu lại những request cần cancel trước khi thực hiện request mới
  mapRequestCancel = new Map();

  static instance;

  constructor(_instance) {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }
    ApiClient.instance = _instance;
  }

  /**
   *
   * @param url Đường dẫn API muốn cancel
   */
  cancelCallApi(url) {
    if (this.mapRequestCancel.has(url)) {
      const canceler = this.mapRequestCancel.get(url);
      canceler && canceler();
      this.mapRequestCancel.delete(url);
    }
  }

  /**
   * Main method used to fetch data from service
   * @param method
   * @param url
   * @param params
   * @param isShowLoading
   * @param ignoreURLBase
   *        true nếu đường link không cộng BASE_URL ở đầu, false ngược lại
   * @param ignoreHandleCommonError
   *        true nếu muốn request bỏ qua logic xử lý các mã lỗi chung như 401, 504, ...
   * @returns
   */

  async request({ method, url, params, isShowLoading = true, ignoreURLBase = false, ignoreHandleCommonError = true }) {
    // isShowLoading && showLoading();

    const requestInterceptor = Axios.interceptors.request.use(
      async (config) => {
        const configTemp = config;
        configTemp.cancelToken = new CancelToken((cancel) => {
          this.mapRequestCancel.set(url, cancel);
        });
        const token = getToken();
        if (token && token.length > 0) {
          if (!configTemp?.headers) {
            throw new Error("Expected 'config' and 'config.headers' not to be undefined");
          }
          configTemp.headers.Authorization = `Bearer ${token}`;
        }
        return configTemp;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = Axios.interceptors.response.use(
      (response) => {
        // hideLoading();
        if (response?.status) {
          if (response?.status === code.SUCCESS || code.CREATE_SUCCESS) {
            return response;
          }
          return Promise.reject(response?.status);
        }
        return Promise.reject();
      },
      (error) => {
        if (error.response?.status === code.UNAUTHORIZED) {
          // store.dispatch(logout());
          // toastError('Hết phiên đăng nhập, vui lòng đăng nhập lại!');
        }
        return Promise.reject(error);
      }
    );

    const urlRequest = ignoreURLBase ? url : service.DOMAIN + url;

    let request;
    if (method === methods.post) {
      request = Axios.post(urlRequest, params);
    } else if (method === methods.put) {
      request = Axios.put(urlRequest, params);
    } else if (method === methods.delete) {
      request = Axios.delete(urlRequest, params);
    } else {
      request = Axios.get(urlRequest, { params });
    }
    return Promise.race([
      request,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('Không có phản hồi từ máy chủ, xin vui lòng thử lại!'));
        }, TIMEOUT);
      }),
    ])
      .then((res) => {
        // hideLoading();
        const response = {
          data: {},
        };
        response.status = res?.status;
        response.data = res?.data;

        return response;
      })
      .catch((error) => {
        notification.error({
          message: error.response?.data?.error?.errorMessage ?? 'Không có phản hồi từ máy chủ, xin vui lòng thử lại!',
        });
        const response = {
          data: {},
        };
        response.status = error.response?.status;
        response.message = error.response?.data?.error?.errorMessage;
        response.error = error.response?.data?.error;
        if (error.response?.data?.error?.errorCode === errorCode.UNAUTHORIZED) {
          const { refreshToken } = getUserProfile();

          if (refreshToken) {
            handleRefreshToken(refreshToken);
          }
          return (response.message = 'Token hết hạn vui lòng chờ trong giây lát');
        }

        return response;
      })
      .finally(() => {
        Axios.interceptors.request.eject(requestInterceptor);
        Axios.interceptors.response.eject(responseInterceptor);
      });
  }
}

const Api = new ApiClient(axiosInit);
export default Api;

export const handleRefreshToken = async (refreshToken) => {
  const user = getUserProfile();
  const res = await new authApi().refreshToken({ refreshToken });
  if (res?.status && res?.data?.success) {
    const { accessToken, refreshToken } = res?.data?.data;
    setToken(accessToken);
    setUserProfile({ ...user, refreshToken });
    window.location.reload();
  } else {
    clearStorage();
    window.location.reload();
  }
};

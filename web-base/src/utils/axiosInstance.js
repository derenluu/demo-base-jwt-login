/* eslint-disable space-before-blocks */
/* eslint-disable quotes */
/* eslint-disable semi */

//~ Licensed by: TrungQuanDev: https://youtube.com/@trungquandev

import axios from 'axios';
import { toast } from 'react-toastify';

//todo: Create object Axios Instance for custom
let AxiosInstance = axios.create();

//todo: Configure timeout of a request
AxiosInstance.defaults.timeout = 1000 * 60 * 5; //? 5 gây

//todo: Allows Axios to automatically attach and send Cookies in each request to the server
//todo: Serves us to use JWT Tokens (accessToken and refreshToken) according to the httpOnly Cookie mechanism
AxiosInstance.defaults.withCredentials = true;

//? Config Interceptors
//todo: Add request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    //? Do something before request is sent
    //todo: Get accessToken from LocalStorage and pin to headers
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      //? Need to add Bearer: because the standard should comply with OAuth 2.0 in determining the type of token being used
      //? Bearer: defines the type of token for authentication and authorization, refer to token types such as: Basic Token, Digest Token, OAuth Token, ...
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    //? Do something with request error
    return Promise.reject(error);
  }
);

//todo: Add response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    //? Any status code that lie within the range of 2xx cause this function to trigger
    //? Do something with response data
    return response;
  },
  (error) => {
    //? Any status codes that falls outside the range of 2xx cause this function to trigger
    //? Do something with response error

    //todo: Xử lý tập trung tại 1 chỗ thay vì chỗ nào dùng Axios cũng try-catch
    if (error.response?.status !== 410) {
      //? Ngoại trừ status code 401 (GONE) phục vụ tự động refresh token
      toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;

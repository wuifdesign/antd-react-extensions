/* eslint-disable */
import axios, { AxiosRequestConfig } from 'axios';

const axiosMock: any = {
  CancelToken: axios.CancelToken,
  isCancel: jest.fn((reason) => !reason.response.status),
  request: jest.fn((config: AxiosRequestConfig) => {
    if (config.url === '/success') {
      return Promise.resolve({ success: true, data: 'testData' });
    }
    if (config.url === '/cancel') {
      return Promise.reject({
        response: {
          status: undefined,
          data: undefined,
        },
      });
    }
    return Promise.reject({
      response: {
        status: 404,
        data: {},
      },
    });
  }),
  create: jest.fn(() => axiosMock),
};

export default axiosMock;

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Canceler, Method } from 'axios';

export const API_RESPONSE_TYPE_ERROR = 'error';
export const API_RESPONSE_TYPE_CANCEL = 'cancel';

const { CancelToken } = axios;

export type ApiWrapperReturn<T> = {
  promise: Promise<T>
  cancel: Canceler
}

export type ApiParams = {
  [key: string]: string | number | undefined
}

export type ApiData = {
  [key: string]: any
}

export type ApiError = {
  type: typeof API_RESPONSE_TYPE_ERROR | typeof API_RESPONSE_TYPE_CANCEL
  status: number
  reason: any
}

export const apiPromiseExposer =
  <T, J = any>(apiResponse: ApiWrapperReturn<T>, promise: (promise: Promise<T>) => Promise<J>) => ({
    cancel: apiResponse.cancel,
    promise: promise(apiResponse.promise),
  });

class ApiWrapper {
  protected readonly axiosInstance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    this.axiosInstance = axios.create({ timeout: 10000, headers: { Accept: 'application/json' }, ...config });
  }

  protected handleSuccess(response: AxiosResponse) {
    if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
      if (response.data.success) {
        return response.data.result;
      }
      throw response.data.errorCode;
    }
    return response.data;
  }

  protected handleError(reason: AxiosError): ApiError {
    const error = {
      type: axios.isCancel(reason) ? API_RESPONSE_TYPE_CANCEL : API_RESPONSE_TYPE_ERROR,
      status: reason.response?.status,
      reason: reason.response?.data,
    };
    throw error;
  }

  protected request<T extends any = any>(method: Method, url: string, config?: AxiosRequestConfig)
    : ApiWrapperReturn<T> {
    const source = CancelToken.source();
    return {
      promise: this.axiosInstance.request({
        method,
        url,
        cancelToken: source.token,
        ...config,
      }).then(this.handleSuccess).catch(this.handleError),
      cancel: source.cancel,
    };
  }

  head<T extends any = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>('head', url, config);
  }

  get<T extends any = any>(url: string, params?: ApiParams, config?: AxiosRequestConfig) {
    return this.request<T>('get', url, { params, ...config });
  }

  post<T extends any = any>(url: string, data?: ApiData, config?: AxiosRequestConfig) {
    return this.request<T>('post', url, { data, ...config });
  }

  postAsFormData<T extends any = any>(url: string, data: ApiData = {}, config?: AxiosRequestConfig) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    return this.request<T>('post', url, { data: formData, ...config });
  }

  put<T extends any = any>(url: string, data?: ApiData, config?: AxiosRequestConfig) {
    return this.request<T>('put', url, { data, ...config });
  }

  patch<T extends any = any>(url: string, data?: ApiData, config?: AxiosRequestConfig) {
    return this.request<T>('patch', url, { data, ...config });
  }

  delete<T extends any = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>('delete', url, config);
  }
}

export default ApiWrapper;

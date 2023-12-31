/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { HttpCodeConfig } from "./CodeConfig";
import { ResponseModel } from "./types/index";

import { token } from "@/stores/auth";

const openError = (title: string, content: string) => {
  notification.error({
    message: title,
    description: content,
  });
};

class HttpRequest {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_URL,
      timeout: 2 * 60 * 1000,
    });

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        /**
         * set your config
         */
        if (import.meta.env.VITE_APP_TOKEN_KEY && token) {
          config.headers[import.meta.env.VITE_APP_TOKEN_KEY] = token;
        }
        return config;
      },
      (error: AxiosError) => {
        console.log("Request Error: ", error);
        openError("Request Error", error.message);
        return Promise.reject(error);
      },
      {
        synchronous: false,
        runWhen: () => {
          // do something

          // if return true, axios will execution interceptor method
          return true;
        },
      },
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse<ResponseModel>): AxiosResponse["data"] => {
        const { data } = response;
        const { code } = data;
        if (code) {
          if (code != HttpCodeConfig.success) {
            switch (code) {
              case HttpCodeConfig.notFound:
                // the method to handle this code
                break;
              case HttpCodeConfig.noPermission:
                // the method to handle this code
                break;
              default:
                break;
            }
            return Promise.reject(data.message);
          } else {
            return data;
          }
        } else {
          openError("Request Error", "Error! code missing!");
          return Promise.reject("Error! code missing!");
        }
      },
      (error: any) => {
        openError("Request Error", error.message);
        return Promise.reject(error);
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    /**
     * TODO: execute other methods according to config
     */
    return new Promise((resolve, reject) => {
      try {
        this.service
          .request<ResponseModel<T>>(config)
          .then((res: AxiosResponse["data"]) => {
            resolve(res as ResponseModel<T>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: "GET", ...config });
  }
  post<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: "POST", ...config });
  }
  put<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: "PUT", ...config });
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.request({ method: "DELETE", ...config });
  }
  //   upload<T = string>(fileItem: UploadFileItemModel, config?: UploadRequestConfig): Promise<ResponseModel<T>> | null {
  //     if (!import.meta.env.VITE_UPLOAD_URL) return null;

  //     const fd = new FormData();
  //     fd.append(fileItem.name, fileItem.value);
  //     let configCopy: UploadRequestConfig;
  //     if (!config) {
  //       configCopy = {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       };
  //     } else {
  //       config.headers!['Content-Type'] = 'multipart/form-data';
  //       configCopy = config;
  //     }
  //     return this.request({ url: import.meta.env.VITE_UPLOAD_URL, data: fd, ...configCopy });
  //   }
}

const httpRequest = new HttpRequest();
export default httpRequest;

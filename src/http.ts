import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosResponse,
  } from "axios";
  
  
  enum StatusCode {
    BadRequest = "400",
    Unauthorized = "401",
    Forbidden = "403",
    TooManyRequests = "429",
    InternalServerError = "500",
  }
  
  const headers: Readonly<Record<string, string | boolean>> = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    // "Access-Control-Allow-Credentials": true,
    "X-Requested-With": "XMLHttpRequest",
  };

  
  class Http {
    private instance: AxiosInstance | null = null;
  
    private get http(): AxiosInstance {
      return  this.instance ?? this.initHttp();
    }
  
    private configuration: Readonly<Record<string, string | boolean>> | null =
      null;
  
    constructor(
      configs: {
        headers?:any,
        baseURL?:any
      } = {},
      noAuthHeader: boolean = false
    ) {
      if (configs) this.configuration = configs;
    }
  
    initHttp() {
  
      const basicConfigurations = {
        baseURL: "http://localhost:3000/products" || this.configuration?.baseURL,
        headers: this.configuration?.headers ? this.configuration.headers as unknown as AxiosRequestHeaders : headers,
        withCredentials: true,
      };
  
      const http = axios.create({
        ...basicConfigurations,
      });
  
      this.instance = http;
      return http;
    }
  
    request<T = any, R = AxiosResponse<T>>(
      config: AxiosRequestConfig
    ): Promise<R> {
      return this.http.request(config);
    }
  
    get<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.get<T, R>(url, config);
    }
  
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: T,
      config?: AxiosRequestConfig
    ): Promise<R> {
      return this.http.post<T, R>(url, data, config);
    }

    // Handle errors here
    private handleError(error: any) {
        let { status } = error;
        status = status?.toString()
        switch (status) {
          case StatusCode.InternalServerError: {
            // Handle InternalServerError
            break;
          }
          case StatusCode.BadRequest: {
            // Handle BadRequest
            //Toast.error(error.response.message)
            break;
          }
          case StatusCode.Forbidden: {
            break;
          }
          case StatusCode.Unauthorized: {
            break;
          }
          case StatusCode.TooManyRequests: {
            // Handle TooManyRequests
            break;
          }
        }
  
      return Promise.reject(error);
    }
  }
  
  export const http = new Http();
  
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Configuration } from "../../configuration";

export interface BaseHttpClientParams {
  baseURL: string;
  headers: Record<string, string>;
}

export interface BaseAxiosParams {
  url: string;
  config?: AxiosRequestConfig;
}

export interface BasePostParams extends BaseAxiosParams {
  data: any;
}

export class HttpClient {
  protected readonly axiosInstance: AxiosInstance;

  constructor() {
    const config = Configuration.getInstance();
    // Initialize Axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: config.getHost(),
      headers: {
        "Content-Type": "application/json",
        "x-application-key": config.getSecretKey(), // Fetch secret key from global config
      },
    });

    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Add custom logic before sending request (e.g., authentication, logging)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Handle response errors here (e.g., logging, rethrowing, or transforming)
        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  public async get<T>({ url, config }: BaseAxiosParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Generic POST method
  public async post<T>({ url, data, config }: BasePostParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Generic PUT method
  public async put<T>({ url, data, config }: BasePostParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Generic DELETE method
  public async delete<T>({ url, config }: BaseAxiosParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Common error handling method
  protected handleError(error: any): never {
    if (error.response) {
      // Server returned a response with an error status code
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `API Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      // Request was made, but no response received
      console.error("Request error:", error.request);
      throw new Error("No response received from API");
    } else {
      // Error occurred during setup of request
      console.error("General error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}

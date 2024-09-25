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
  protected axiosInstance: AxiosInstance | undefined;

  constructor() {
    this.initializeAxiosInstance();
  }

  // Method to (re)initialize the axios instance with the current configuration
  private initializeAxiosInstance() {
    const config = Configuration.getInstance();

    if (!config.getHost() || !config.getSecretKey()) {
      console.warn("Configuration is not properly initialized.");
      return; // Avoid initializing axios if config is missing
    }

    // Initialize Axios instance with valid configuration
    this.axiosInstance = axios.create({
      baseURL: config.getHost(),
      headers: {
        "Content-Type": "application/json",
        "x-application-key": config.getSecretKey(),
      },
    });

    // Request Interceptor
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // Add custom logic before sending request (e.g., authentication, logging)
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => Promise.reject(error)
    );
  }

  // Reinitialize Axios instance when configuration changes (optional)
  public reinitialize() {
    this.initializeAxiosInstance();
  }

  // Generic GET method
  public async get<T>({ url, config }: BaseAxiosParams): Promise<T> {
    if (!this.axiosInstance) {
      throw new Error(
        "Axios instance is not initialized. Please check your configuration."
      );
    }

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
    if (!this.axiosInstance) {
      throw new Error(
        "Axios instance is not initialized. Please check your configuration."
      );
    }

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

  // Other methods (put, delete) remain the same with the axios instance check
  public async put<T>({ url, data, config }: BasePostParams): Promise<T> {
    if (!this.axiosInstance) {
      throw new Error(
        "Axios instance is not initialized. Please check your configuration."
      );
    }

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

  public async delete<T>({ url, config }: BaseAxiosParams): Promise<T> {
    if (!this.axiosInstance) {
      throw new Error(
        "Axios instance is not initialized. Please check your configuration."
      );
    }

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

  // Common error handling method remains unchanged
  protected handleError(error: any): never {
    if (error.response) {
      console.error(
        "Response error:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `API Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error("Request error:", error.request);
      throw new Error("No response received from API");
    } else {
      console.error("General error:", error.message);
      throw new Error(`Error: ${error.message}`);
    }
  }
}

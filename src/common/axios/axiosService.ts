import axios, { AxiosResponse } from 'axios';
import * as dotenv from 'dotenv';
import { axiosRequest } from '../../types/axios';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Create an Axios instance
const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    const headers: any = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
    };

    // Assign headers to config
    config.headers = {
      ...config.headers,
      ...headers,
    };

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Handle the response data here if needed
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  },
);

// Usage of the Axios instance
async function  makeRequest(request: axiosRequest, headers?: any) {
  try {
    
    const response = await axiosInstance({
      method: request.method,
      url: request.endpoint,
      data: request.data,
      params: request.params,
      headers: {
        ...headers,
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      status: error?.response?.status,
      message: error?.response.data?.message,
      validation: error?.response.data?.validation,
    };
  }
}

export default makeRequest;

//OTHER SERVICES URL

export const SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:4001';


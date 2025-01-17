import { axiosRequest } from "../types/axios";

export const buildRequestParams = async (method: string, endpoint: string, data?: any, query?: any) => {
    const headers: any = {};
    const params: axiosRequest = {
      method,
      endpoint,
      data,
      headers,
      query,
    };

    return params;
  }
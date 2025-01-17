import { Request, Response } from "express";
import { axiosRequest } from "../types/axios";
import makeRequest, { SERVICE_URL } from "../common/axios/axiosService";

export const service = async (req: Request, res: Response) => {
    try {
      console.log('entered service ....');
  
      // method, endpoint, data, query
      const params: axiosRequest = {
        method: 'GET',
        endpoint: `${SERVICE_URL}/api/service/check-service`,
        data: '',
      };
      const response = await makeRequest(params);

      res.status(response.status).json({
        data: response.data,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
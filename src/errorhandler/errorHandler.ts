import { Request, Response, NextFunction } from 'express';

export const handleError = (error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error.response) {
    res
      .status(error.response.status)
      .json({ code: error.response.status, message: [error.response.data.message], data: {} });
  } else {
    res.status(500).json({ code: 500, message: [error.message], data: {} });
  }
};
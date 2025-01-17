import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
// import { statusCode } from '../utils/constant/status_code';
import { ApiResponse } from '../utils/hooks/util';

export const errorValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Error catch
    return ApiResponse(res, {
      status: 400,
      message: '',
      validation: errors.array(),
      totalCount: null,
      data: null,
    });
  }
  next();
};

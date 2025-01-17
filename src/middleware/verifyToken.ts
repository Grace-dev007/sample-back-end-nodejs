import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/hooks/util';

// Middleware to verify token
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return ApiResponse(res, {
      status: 401,
      message: '',
      validation: null,
      data: null,
    });
  }

  next();
}

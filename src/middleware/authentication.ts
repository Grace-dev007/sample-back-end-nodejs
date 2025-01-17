import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/hooks/util';

// Middleware to verify token
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: any = req.headers.authorization;
    const guest = process.env.GUEST_TOKEN;
    const token = authHeader.split(' ')[1];
    if (!authHeader || authHeader.trim() === '') {
      return ApiResponse(res, {
        status: 401,
        message: '',
        validation: null,
        data: null,
      });
    }  else {
      const token = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
      req.headers['user_id'] = decoded.sub.id;
      req.headers['user_role'] = decoded.sub.user_role;
      req.headers['fullname'] = decoded.sub.fullname;
      req.headers['email'] = decoded.sub.email;

      next();
    }
  } catch (error) {
    return ApiResponse(res, {
      status: 500,
      message: '',
      validation: null,
      data: null,
    });
  }
};

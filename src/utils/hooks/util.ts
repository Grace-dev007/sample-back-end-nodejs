import jwt from 'jsonwebtoken';
import moment from 'moment';
import { Request, Response, NextFunction } from 'express';

// Function to generate JWT token
export const generateToken = async (user: any) => {
  const payload = {
    sub: user,
    role: user.role, // Add role to the payload
    iat: moment().unix(),
    exp: moment().add(process.env.EXPIRY_TIME, 'hours').unix(),
  };
  return jwt.sign(payload, process.env.JWT_SECRET || '');
};

// Middleware to authenticate token
export const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'Unauthorized: Invalid token' });
  if (!authHeader.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized: Invalid authorization header' });

  const token = authHeader.substring(7);

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized: Invalid token' });
    } else {
      req.headers['user_id'] = decoded.sub.id;
      req.headers['role'] = decoded.role; // Add role to the request headers

      next();
    }
  });
};

// Middleware to authorize based on roles
export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role: any = req.headers['role'];

    if (!allowedRoles.includes(role)) {
      return res.status(403).send({ message: 'Forbidden: Roles access denied' });
    }
    next();
  };
};

export const ApiResponse = async (
  res: any,
  response: { status: number; message: string; validation?: any; totalCount?: any; data?: any },
) => {
  // console.log('response: ', response);
  return res.status(response.status).json(response);
};





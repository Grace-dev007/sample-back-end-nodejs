"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.authorizeRole = exports.authentication = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
// Function to generate JWT token
const generateToken = async (user) => {
    const payload = {
        sub: user,
        role: user.role, // Add role to the payload
        iat: (0, moment_1.default)().unix(),
        exp: (0, moment_1.default)().add(process.env.EXPIRY_TIME, 'hours').unix(),
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || '');
};
exports.generateToken = generateToken;
// Middleware to authenticate token
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ message: 'Unauthorized: Invalid token' });
    if (!authHeader.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized: Invalid authorization header' });
    const token = authHeader.substring(7);
    // Verify token
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized: Invalid token' });
        }
        else {
            req.headers['user_id'] = decoded.sub.id;
            req.headers['role'] = decoded.role; // Add role to the request headers
            next();
        }
    });
};
exports.authentication = authentication;
// Middleware to authorize based on roles
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const role = req.headers['role'];
        if (!allowedRoles.includes(role)) {
            return res.status(403).send({ message: 'Forbidden: Roles access denied' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
const ApiResponse = async (res, response) => {
    // console.log('response: ', response);
    return res.status(response.status).json(response);
};
exports.ApiResponse = ApiResponse;

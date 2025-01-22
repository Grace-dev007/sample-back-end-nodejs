"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("../utils/hooks/util");
// Middleware to verify token
const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const guest = process.env.GUEST_TOKEN;
        const token = authHeader.split(' ')[1];
        if (!authHeader || authHeader.trim() === '') {
            return (0, util_1.ApiResponse)(res, {
                status: 401,
                message: '',
                validation: null,
                data: null,
            });
        }
        else {
            const token = authHeader.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            req.headers['user_id'] = decoded.sub.id;
            req.headers['user_role'] = decoded.sub.user_role;
            req.headers['fullname'] = decoded.sub.fullname;
            req.headers['email'] = decoded.sub.email;
            next();
        }
    }
    catch (error) {
        return (0, util_1.ApiResponse)(res, {
            status: 500,
            message: '',
            validation: null,
            data: null,
        });
    }
};
exports.authentication = authentication;

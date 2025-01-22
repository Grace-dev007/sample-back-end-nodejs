"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const util_1 = require("../utils/hooks/util");
// Middleware to verify token
async function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return (0, util_1.ApiResponse)(res, {
            status: 401,
            message: '',
            validation: null,
            data: null,
        });
    }
    next();
}

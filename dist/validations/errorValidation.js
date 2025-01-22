"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidation = void 0;
const express_validator_1 = require("express-validator");
// import { statusCode } from '../utils/constant/status_code';
const util_1 = require("../utils/hooks/util");
const errorValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Error catch
        return (0, util_1.ApiResponse)(res, {
            status: 400,
            message: '',
            validation: errors.array(),
            totalCount: null,
            data: null,
        });
    }
    next();
};
exports.errorValidation = errorValidation;

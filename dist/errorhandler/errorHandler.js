"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, req, res, next) => {
    if (error.response) {
        res
            .status(error.response.status)
            .json({ code: error.response.status, message: [error.response.data.message], data: {} });
    }
    else {
        res.status(500).json({ code: 500, message: [error.message], data: {} });
    }
};
exports.handleError = handleError;

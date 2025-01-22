"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRequestParams = void 0;
const buildRequestParams = async (method, endpoint, data, query) => {
    const headers = {};
    const params = {
        method,
        endpoint,
        data,
        headers,
        query,
    };
    return params;
};
exports.buildRequestParams = buildRequestParams;

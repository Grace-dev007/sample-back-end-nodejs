"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICE_URL = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, '../../../.env') });
// Create an Axios instance
const axiosInstance = axios_1.default.create();
// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
    };
    // Assign headers to config
    config.headers = {
        ...config.headers,
        ...headers,
    };
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});
// Response interceptor
axiosInstance.interceptors.response.use((response) => {
    // Handle the response data here if needed
    return response;
}, (error) => {
    // Handle response error
    return Promise.reject(error);
});
// Usage of the Axios instance
async function makeRequest(request, headers) {
    var _a, _b, _c;
    try {
        const response = await axiosInstance({
            method: request.method,
            url: request.endpoint,
            data: request.data,
            params: request.params,
            headers: {
                ...headers,
            },
        });
        return response.data;
    }
    catch (error) {
        throw {
            status: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status,
            message: (_b = error === null || error === void 0 ? void 0 : error.response.data) === null || _b === void 0 ? void 0 : _b.message,
            validation: (_c = error === null || error === void 0 ? void 0 : error.response.data) === null || _c === void 0 ? void 0 : _c.validation,
        };
    }
}
exports.default = makeRequest;
//OTHER SERVICES URL
exports.SERVICE_URL = process.env.SERVICE_URL || 'http://localhost:4001';

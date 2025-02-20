"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_router_1 = __importDefault(require("./test.router"));
const service_router_1 = __importDefault(require("./service.router"));
const user_router_1 = __importDefault(require("./user.router"));
const appRoutes = () => {
    const router = express_1.default.Router();
    router.use('/test', test_router_1.default);
    router.use('/service', service_router_1.default);
    router.use('/user', user_router_1.default);
    return router;
};
exports.default = appRoutes;

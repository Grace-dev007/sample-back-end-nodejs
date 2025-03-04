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
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./utils/mongoose/db"));
const logger_1 = __importDefault(require("./helpers/logger"));
const errorHandler_1 = require("./errorhandler/errorHandler");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
//Swagger
const swagger_json_1 = __importDefault(require("./OAS/swagger.json"));
// Env Config
dotenv.config({ path: path_1.default.join(__dirname, '../.env') });
const port = parseInt(process.env.PORT || '4000', 10);
const app = (0, express_1.default)();
const corsUrl = process.env.CORS_URL;
app.use((0, cors_1.default)({
    // allowedHeaders: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    origin: ['http://localhost:3000', corsUrl]
}));
// Use Helmet!
// app.use(helmet());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ limit: '50mb' }));
app.use((req, res, next) => {
    next();
});
app.use('/webhook', (0, index_1.default)());
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use('/api/api-docs', swagger_ui_express_1.default.serve);
app.get('/api/api-docs', swagger_ui_express_1.default.setup(swagger_json_1.default));
// DB Connect
(0, db_1.default)();
app.get('/api/health', (req, res) => {
    res.sendStatus(200);
});
app.get('/header/check', (req, res) => {
    const title = req.query.title;
    logger_1.default.info('Header-check', { title: title, headers: req.headers });
    res.sendStatus(200);
});
app.get('/error/logs', (req, res) => {
    fs_1.default.readFile(path_1.default.resolve(__dirname, '../error.log'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});
app.get('/logs', (req, res) => {
    fs_1.default.readFile(path_1.default.resolve(__dirname, '../combined.log'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    });
});
app.use('/api/v1', (0, index_1.default)());
app.use('/api', (0, index_1.default)());
app.use(errorHandler_1.handleError);
app.listen(port, () => console.log(`Listing port is ${port} - pid : ${process.pid}`));
app.get('/datecheck', (req, res) => {
    const time = '20:39:00';
    const kolkataTime = moment_timezone_1.default.tz(time, 'HH:mm:ss', 'Asia/Kolkata');
    const utcTime = kolkataTime.utc();
    const utctime = utcTime.format('HH:mm:ss');
    console.log('datevalue: ', utctime); // should print the time in UTC
    res.status(200).json({ data: utctime });
});

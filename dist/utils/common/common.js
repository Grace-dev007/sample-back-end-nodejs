"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3Parallel = exports.UTCtolocalTime = exports.afterUTCTime = exports.currentUTCTime = exports.localtoUTCTime = exports.writeJSONFile = exports.readJSONFile = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../.env') });
const readJSONFile = (filePath) => {
    try {
        const data = fs_1.default.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Error reading or parsing the file:', error);
        return null;
    }
};
exports.readJSONFile = readJSONFile;
const writeJSONFile = async (filePath, data) => {
    try {
        await fs_1.default.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Error writing file:', error);
        return null;
    }
};
exports.writeJSONFile = writeJSONFile;
const localtoUTCTime = (time) => {
    const kolkataTime = moment_timezone_1.default.tz(time, 'HH:mm:ss', 'Asia/Kolkata');
    const utcTime = kolkataTime.utc();
    const utctime = utcTime.format('HH:mm:ss');
    return utctime;
};
exports.localtoUTCTime = localtoUTCTime;
const currentUTCTime = () => {
    return (0, moment_timezone_1.default)().utc().toDate();
};
exports.currentUTCTime = currentUTCTime;
const afterUTCTime = (plan) => {
    return (0, moment_timezone_1.default)().utc().add(1, plan).toDate();
};
exports.afterUTCTime = afterUTCTime;
const UTCtolocalTime = (utctime) => {
    const utcTime = moment_timezone_1.default.utc(utctime, 'HH:mm:ss');
    const time = utcTime.tz('Asia/Kolkata');
    return time.format('HH:mm:ss');
};
exports.UTCtolocalTime = UTCtolocalTime;
const getS3Parallel = async (fileKey) => {
    try {
        const s3 = new client_s3_1.S3Client({
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID || '',
                secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
            },
            useAccelerateEndpoint: false,
        });
        const getObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey,
        };
        const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand(getObjectParams), { expiresIn: 432000 });
        return signedUrl;
    }
    catch (error) {
        throw new Error('Failed to generate signed URL');
    }
};
exports.getS3Parallel = getS3Parallel;

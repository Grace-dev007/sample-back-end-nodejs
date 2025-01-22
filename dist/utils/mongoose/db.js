"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../.env') });
const connectDB = async () => {
    try {
        const dbName = process.env.DB_NAME;
        const MONGODB_URI = process.env.MONGODB_URI;
        await mongoose_1.default.connect(MONGODB_URI, { dbName });
        // console.log('master_category: ', master_category);
        console.log('db connected...');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
exports.default = connectDB;

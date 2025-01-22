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
exports.verifySms = exports.sendSms = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv.config({ path: path_1.default.join(__dirname, '../../../.env') });
const sendSms = async (Otpnumber) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = (0, twilio_1.default)(accountSid, authToken);
    const serviceSid = process.env.TWILIO_SERVICE_ID;
    try {
        const verification = await client.verify.v2
            .services(serviceSid)
            .verifications.create({ to: Otpnumber, channel: 'sms' });
        return verification;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.sendSms = sendSms;
const verifySms = async (number, code) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = (0, twilio_1.default)(accountSid, authToken);
    const serviceSid = process.env.TWILIO_SERVICE_ID;
    try {
        const verification_check = client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to: number, code });
        return verification_check;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.verifySms = verifySms;

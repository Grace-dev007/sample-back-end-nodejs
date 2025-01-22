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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionType = void 0;
const mongoose_1 = __importStar(require("mongoose"));
//import { ITransaction, stripeCredentials, TransactionType } from '../../types/transcations';
var TransactionType;
(function (TransactionType) {
    TransactionType["PLANSUBSCRIPTION"] = "plan_subscription";
    TransactionType["WALLETCREDIT"] = "wallet_credit";
    TransactionType["WALLETDEBIT"] = "wallet_debit";
    TransactionType["ADDLINK"] = "add_link";
    TransactionType["PROVIDERSUBSCRIPTION"] = "provider_subscription";
})(TransactionType || (exports.TransactionType = TransactionType = {}));
const stripeSchema = new mongoose_1.Schema({
    customer_id: { type: String, default: null },
});
const transactionSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    stripe_credentials: {
        type: stripeSchema,
        default: {},
    },
    type: {
        type: String,
        enum: Object.values(TransactionType), // Enforces the enum for type
        required: true,
        default: TransactionType.PLANSUBSCRIPTION,
    },
    plan_name: {
        type: String,
        default: null,
    },
    price_id: {
        type: String,
        default: null,
    },
    stripe_subscription_id: {
        type: String,
        default: null,
    },
    recurring_interval: {
        type: String,
        enum: ['day', 'week', 'month', 'year', null],
        default: null,
    },
    amount: {
        type: Number,
        required: true,
    },
    payment_intent_id: {
        type: String,
        default: null,
    },
    client_secret: {
        type: String,
        default: null,
    },
    payment_method: {
        type: String,
        default: null,
    },
    latest_charge: {
        type: String,
        default: null,
    },
    deposit_fee: {
        type: Number,
    },
    total_amount: {
        type: Number
    },
    net_amount: {
        type: Number
    },
    account_id: {
        type: String,
        default: null,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    bank_id: {
        type: String,
        default: null,
    },
    transaction_id: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    stripe_json: {
        type: String,
        default: null,
    },
    plan_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    expiredAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
// Add an index for user_id and type
transactionSchema.index({ user_id: 1, type: 1 });
transactionSchema.methods.softDelete = async function () {
    this.deleted_at = new Date();
    await this.save();
};
exports.Transaction = mongoose_1.default.model('Transaction', transactionSchema);

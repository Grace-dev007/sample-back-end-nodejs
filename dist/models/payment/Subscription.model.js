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
exports.SubscriptionPlan = exports.SubscriptionPeriod = void 0;
const mongoose_1 = __importStar(require("mongoose"));
var SubscriptionPeriod;
(function (SubscriptionPeriod) {
    SubscriptionPeriod["Monthly"] = "monthly";
    SubscriptionPeriod["Yearly"] = "yearly";
})(SubscriptionPeriod || (exports.SubscriptionPeriod = SubscriptionPeriod = {}));
const subscriptionPlanSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    plan_name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    billing_period: {
        type: String,
        enum: Object.values(SubscriptionPeriod),
    },
    isPopular: {
        type: Boolean,
        default: false,
    },
    features: {
        type: [String],
    },
    deleted_at: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});
subscriptionPlanSchema.methods.softDelete = async function () {
    this.deleted_at = new Date();
    await this.save();
};
exports.SubscriptionPlan = mongoose_1.default.model('subscriptionplan', subscriptionPlanSchema);

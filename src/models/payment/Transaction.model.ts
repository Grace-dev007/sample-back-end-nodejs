import mongoose, { Document, Schema } from 'mongoose';
//import { ITransaction, stripeCredentials, TransactionType } from '../../types/transcations';

export enum TransactionType {
  PLANSUBSCRIPTION = 'plan_subscription',
  WALLETCREDIT = 'wallet_credit',
  WALLETDEBIT = 'wallet_debit',
  ADDLINK = 'add_link',
  PROVIDERSUBSCRIPTION = 'provider_subscription',
}

export interface stripeCredentials {
  customer_id: string | null;
}

export interface ITransaction extends Document {
  user_id: mongoose.Types.ObjectId;
  type: TransactionType;
  plan_name: string | null;
  price_id: string | null;
  stripe_subscription_id: string | null;
  recurring_interval: 'day' | 'week' | 'month' | 'year' | null;
  amount: number;
  deposit_fee:number;
  total_amount:number;
  net_amount:number;
  payment_intent_id:string|null;
  client_secret:string|null;
  currency: string | null;
  payment_method: string | null;
  latest_charge: string | null;
  account_id: string | null;
  bank_id: string | null;
  transaction_id?: string | null;
  description: string | null;
  stripe_json: string | null;
  stripe_credentials: stripeCredentials;
  plan_id: mongoose.Types.ObjectId;
  expiredAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string | null;
}

const stripeSchema = new Schema<stripeCredentials>({
  customer_id: { type: String, default: null },
});

const transactionSchema = new Schema<ITransaction>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
    total_amount:{
      type:Number
    },
    net_amount:{
      type:Number
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
      type: Schema.Types.ObjectId,
    },
    expiredAt: {
      type: Date,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Add an index for user_id and type
transactionSchema.index({ user_id: 1, type: 1 });

transactionSchema.methods.softDelete = async function (): Promise<void> {
  this.deleted_at = new Date();
  await this.save();
};

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

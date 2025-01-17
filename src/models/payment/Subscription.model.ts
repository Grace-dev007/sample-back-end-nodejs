import mongoose, { Document, Schema } from 'mongoose';

export enum SubscriptionPeriod {
  Monthly = 'monthly',
  Yearly = 'yearly',
}
export interface ISubscriptionPlan extends Document {
  user_id: mongoose.Types.ObjectId;
  plan_name: string;
  description: string;
  price: number;
  billing_period: string;
  isPopular?: boolean;
  features: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deleted_at?: Date;
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

subscriptionPlanSchema.methods.softDelete = async function (): Promise<void> {
  this.deleted_at = new Date();
  await this.save();
};

export const SubscriptionPlan = mongoose.model<ISubscriptionPlan>('subscriptionplan', subscriptionPlanSchema);

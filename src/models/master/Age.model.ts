import mongoose, { Schema, model, Document } from 'mongoose';

export enum AgeStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export interface IAge extends Document {
  name: string;
  status: AgeStatus;
  deletedAt?: Date;
}

const ageSchema = new Schema<IAge>(
  {
    name: { type: String, lowercase: true },
    status: { type: String, enum: Object.values(AgeStatus), default: AgeStatus.Active },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

export const Age = model<IAge>('ages', ageSchema);

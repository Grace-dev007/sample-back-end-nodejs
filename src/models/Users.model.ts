import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';

export interface IUser {
    type: string;
    name: string;
    email: string;
    contact_number: number;
    company_name: string;
    password: string;
    confirm_password: string;
    deletedAt: Date | null;
}

const userSchema = new Schema<IUser>({
    type: { type: String },
    name: { type: String },
    email: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    deletedAt: { type: Date, default: null }
});

export const Users = model<IUser>('users', userSchema);

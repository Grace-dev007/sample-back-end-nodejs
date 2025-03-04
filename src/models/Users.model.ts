import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum UserRole {
    EMPLOYER = 'employer',
    JOB_SEEKER = 'jobseeker'
}

export interface IUser {
    role: UserRole;
    name: string;
    email: string;
    contact_number: number;
    company_name: string;
    password: string;
    confirm_password: string;
    deletedAt: Date | null;
}


const userSchema = new Schema<IUser>({
    role: { type: String, enum: Object.values(UserRole), required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contact_number: { type: Number, required: true },
    company_name: { type: String },
    password: { type: String, required: true },
    confirm_password: { type: String, required: true },
    deletedAt: { type: Date, default: null }
});



userSchema.pre('save', async function (next) {
    const user = this;

    // Check if password is modified or if it's a new user
    if (user.isModified('password')) {
        // Hash the password with a salt round of 10
        user.password = await bcrypt.hash(user.password, 10);
    }

    // Ensure confirm_password is not stored in the DB
    user.confirm_password = '';

    next();
});




userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};


export const Users = model<IUser>('users', userSchema);

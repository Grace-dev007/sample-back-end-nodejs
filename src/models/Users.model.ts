import mongoose, { Schema, model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    role: string;
    name: string;
    email: string;
    contact_number: number;
    company_name: string;
    password: string;
    confirm_password: string;
    deletedAt: Date | null;
}

const userSchema = new Schema<IUser>({
    role: { type: String },
    name: { type: String },
    email: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    deletedAt: { type: Date, default: null }
});


// Pre-save hook to hash the password before saving to DB
userSchema.pre('save', async function (next) {
    const user = this;

    // Check if password is modified or if it's a new user
    if (user.isModified('password')) {
        // Hash the password with a salt round of 10
        user.password = await bcrypt.hash(user.password, 10);
    }

    // Don't store confirm_password in the DB
    user.confirm_password = '';

    next();
});

// Method to compare entered password with the hashed password
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

export const Users = model<IUser>('users', userSchema);

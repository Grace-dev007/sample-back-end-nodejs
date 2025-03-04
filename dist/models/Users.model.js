"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    role: { type: String },
    name: { type: String },
    email: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    password: { type: String },
    // confirm_password: { type: String },
    deletedAt: { type: Date, default: null }
});
// Pre-save hook to hash the password before saving to DB
userSchema.pre('save', async function (next) {
    const user = this;
    // Check if password is modified or if it's a new user
    if (user.isModified('password')) {
        // Hash the password with a salt round of 10
        user.password = await bcryptjs_1.default.hash(user.password, 10);
    }
    // Don't store confirm_password in the DB
    // user.confirm_password = '';
    next();
});
// Method to compare entered password with the hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.Users = (0, mongoose_1.model)('users', userSchema);

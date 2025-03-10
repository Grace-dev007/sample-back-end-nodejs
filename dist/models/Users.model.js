"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.UserRole = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var UserRole;
(function (UserRole) {
    UserRole["EMPLOYER"] = "employer";
    UserRole["JOB_SEEKER"] = "jobseeker";
})(UserRole || (exports.UserRole = UserRole = {}));
const userSchema = new mongoose_1.Schema({
    role: { type: String, enum: Object.values(UserRole), },
    name: { type: String },
    email: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    password: { type: String },
    confirm_password: { type: String },
    deletedAt: { type: Date, default: null }
});
userSchema.pre('save', async function (next) {
    const user = this;
    // Check if password is modified or if it's a new user
    if (user.isModified('password')) {
        // Hash the password with a salt round of 10
        user.password = await bcryptjs_1.default.hash(user.password, 10);
    }
    // Ensure confirm_password is not stored in the DB
    user.confirm_password = '';
    next();
});
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.Users = (0, mongoose_1.model)('users', userSchema);

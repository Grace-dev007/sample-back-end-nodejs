"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.upDate = exports.getUserById = exports.login = exports.register = void 0;
const user_service_1 = require("../service/user.service");
const util_1 = require("../utils/hooks/util");
const user_service_2 = require("../service/user.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = async (req, res) => {
    try {
        console.log("entry register------------->");
        const userData = req.body;
        console.log('userData: ', userData);
        const user = await (0, user_service_1.createUser)(userData);
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Registered successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const user = await (0, user_service_1.getLoginUser)(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const hash = {
            id: user._id,
            role: user.role,
            name: user.name,
            email: user.email
        };
        // Generate JWT token
        const token = await (0, util_1.generateToken)(hash);
        // Send token as response
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Login successful',
            validation: null,
            totalCount: null,
            data: { user, token }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Get userId from request parameters
        const user = await (0, user_service_2.findUserById)(userId); // Call service function
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Registered successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.getUserById = getUserById;
const upDate = async (req, res) => {
    try {
        const userId = req.params.id;
        const { password, ...updateFields } = req.body;
        // Hash password if it's being updated
        if (password) {
            updateFields.password = await bcryptjs_1.default.hash(password, 10);
        }
        const user = await (0, user_service_1.updateUser)(userId, updateFields);
        (0, util_1.ApiResponse)(res, {
            status: 200,
            message: 'Updated successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.upDate = upDate;
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.softDeleteUser)(id);
        (0, util_1.ApiResponse)(res, {
            status: 200,
            message: 'Deleted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.deleteUserById = deleteUserById;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById_Cols = exports.findUserById = exports.getLoginUser = exports.createOrUpdateUser = exports.createUser = void 0;
const Users_model_1 = require("../models/Users.model");
const createUser = async (userData) => {
    const newUser = new Users_model_1.Users(userData);
    const savedUser = await newUser.save();
    return savedUser;
};
exports.createUser = createUser;
const createOrUpdateUser = async (userData) => {
    try {
        return await Users_model_1.Users.findOneAndUpdate({ email: userData.email }, // Search for the user by email
        userData, // Data to update or insert
        { new: true, upsert: true });
    }
    catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};
exports.createOrUpdateUser = createOrUpdateUser;
const getLoginUser = async (email) => {
    const result = Users_model_1.Users.findOne({
        $or: [{ email: { $regex: new RegExp(`^${email}$`, 'i') } }],
        deletedAt: null,
    });
    return result;
};
exports.getLoginUser = getLoginUser;
const findUserById = async (userId) => {
    console.log('userId: ', userId);
    return Users_model_1.Users.findById(userId);
};
exports.findUserById = findUserById;
const findUserById_Cols = async (userId) => {
    return Users_model_1.Users.findById(userId);
};
exports.findUserById_Cols = findUserById_Cols;

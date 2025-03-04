"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.softDeleteUser = exports.findUsers = exports.findUserById_Cols = exports.findUserById = exports.getLoginUser = exports.createOrUpdateUser = exports.createUser = void 0;
const Users_model_1 = require("../models/Users.model");
const createUser = async (userData) => {
    const newUser = await Users_model_1.Users.create(userData);
    return newUser;
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
const findUsers = async (req, res) => {
    const users = await Users_model_1.Users.find();
    res.status(200).json({ success: true, data: users });
};
exports.findUsers = findUsers;
const softDeleteUser = async (userId) => {
    return await Users_model_1.Users.findByIdAndUpdate(userId, { deletedAt: new Date() }); // Soft delete by setting timestamp
};
exports.softDeleteUser = softDeleteUser;
const updateUser = async (userId, userData) => {
    // Perform the update
    return await Users_model_1.Users.findOneAndUpdate({ _id: userId }, // Search for the user by userId
    { $set: userData }, // Update only provided fields
    { new: true, runValidators: true } // Return the updated document, enforce validation
    );
};
exports.updateUser = updateUser;

import { Users, IUser } from '../models/Users.model';
import mongoose from 'mongoose';
import axios from 'axios';

export const createUser = async (userData: IUser) => {
    const newUser = new Users(userData);
    const savedUser = await newUser.save();
    return savedUser;
};

export const createOrUpdateUser = async (userData: any) => {
    try {
        return await Users.findOneAndUpdate(
            { email: userData.email }, // Search for the user by email
            userData, // Data to update or insert
            { new: true, upsert: true }, // Options: return the new document, upsert if it doesn't exist
        );
    } catch (error: any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

export const getLoginUser = async (email: string) => {
    const result = Users.findOne({
        $or: [{ email: { $regex: new RegExp(`^${email}$`, 'i') } }],
        deletedAt: null,
    });
    return result;
};

export const findUserById = async (userId: string) => {
    console.log('userId: ', userId);
    return Users.findById(userId);
};

export const findUserById_Cols = async (userId: string) => {
    return Users.findById(userId);
};


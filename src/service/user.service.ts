import { Users, IUser } from '../models/Users.model';
import mongoose from 'mongoose';
import axios from 'axios';
import { Request, Response } from 'express';
import { log } from 'node:console';

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

export const findUsers = async (req: Request, res: Response) => {
    const users = await Users.find();
    res.status(200).json({ success: true, data: users });
};

export const softDeleteUser = async (userId: string) => {
    return await Users.findByIdAndUpdate( userId, { deletedAt: new Date() } );// Soft delete by setting timestamp
};

export const updateUser = async (userData: any) => {
    
        return await Users.findOneAndUpdate(
            { email: userData.email }, // Search for the user by email
            userData, // Data to update or insert
            { new: true, upsert: true }, // Options: return the new document, upsert if it doesn't exist
        );
    } 



import { Request, Response } from "express";
import { createUser, getLoginUser, softDeleteUser, updateUser } from "../service/user.service";
import { ApiResponse, generateToken } from "../utils/hooks/util";
import { findUserById } from "../service/user.service";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req: Request, res: Response) => {
    try {
        console.log("entry register------------->");
        const userData = req.body;
        console.log('userData: ', userData);

        const user = await createUser(userData)
        ApiResponse(res, {
            status: 201,
            message: 'Registered successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
    
        const user = await getLoginUser(email);
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const hash = {
            id: user._id,
            role: user.role,
            name: user.name,
            email: user.email
        }

        // Generate JWT token
        const token = await generateToken(hash);

        // Send token as response
        ApiResponse(res, {
            status: 201,
            message: 'Login successful',
            validation: null,
            totalCount: null,
            data: {user, token}
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const  userId  = req.params.id; // Get userId from request parameters
        const user = await findUserById(userId); // Call service function
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        ApiResponse(res, {
            status: 201,
            message: 'Registered successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });}
};

export const upDate = async (req: Request, res: Response) => {
        try {
        const userId = req.params.id;
        const { password, ...updateFields} = req.body; 
       
          // Hash password if it's being updated
    if (password) {
        updateFields.password = await bcrypt.hash(password, 10);
      }
        const user = await updateUser(userId, updateFields)
        ApiResponse(res, {
            status: 200,
            message: 'Updated successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await softDeleteUser(id);
        ApiResponse(res, {
            status: 200,
            message: 'Deleted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}



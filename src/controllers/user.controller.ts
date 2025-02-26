import { Request, Response } from "express";
import { createUser, getLoginUser } from "../service/user.service";
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
            role: user.role,
            name: user.name,
            email: user.email
        }

        // Generate JWT token
        const token = generateToken(hash);

        // Send token as response
        ApiResponse(res, {
            status: 201,
            message: 'Login successful',
            validation: null,
            totalCount: null,
            data: {user, token: token}
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}




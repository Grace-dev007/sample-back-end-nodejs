import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import { ApiResponse } from "../utils/hooks/util";
import { DocumentInstance } from "twilio/lib/rest/preview/sync/service/document";

export const register = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

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


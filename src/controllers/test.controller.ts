import { Request, Response } from "express";

export const apiTest = async (req: Request, res: Response) => {
    try {

        console.log("enter");

        const testData = req.body;

        return res.status(201).json({ message: "success", data: testData })

    } catch (error: any) {
        console.log("error", error);

    }

}



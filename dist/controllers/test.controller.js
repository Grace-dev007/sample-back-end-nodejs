"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiTest = void 0;
const apiTest = async (req, res) => {
    try {
        console.log("enter");
        const testData = req.body;
        return res.status(201).json({ message: "success", data: testData });
    }
    catch (error) {
        console.log("error", error);
    }
};
exports.apiTest = apiTest;

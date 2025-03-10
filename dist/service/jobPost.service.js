"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplies = exports.updateJobPost = exports.softDeleteJobPost = exports.findAllJobPosts = exports.findJobPostById = exports.createOrUpdateJobPost = exports.jobPost = void 0;
const JobPost_model_1 = require("../models/JobPost.model");
const jobPost = async (userData) => {
    const newUser = await JobPost_model_1.JobPost.create(userData);
    return newUser;
};
exports.jobPost = jobPost;
const createOrUpdateJobPost = async (userData) => {
    try {
        return await JobPost_model_1.JobPost.findOneAndUpdate({ email: userData.email }, // Search for the user by email
        userData, // Data to update or insert
        { new: true, upsert: true } // Options: return the new document, upsert if it doesn't exist
        );
    }
    catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};
exports.createOrUpdateJobPost = createOrUpdateJobPost;
const findJobPostById = async (userId) => {
    console.log("userId: ", userId);
    return JobPost_model_1.JobPost.findById(userId);
};
exports.findJobPostById = findJobPostById;
// export const findJobPostById_Cols = async (userId: string) => {
//     return JobPost.findById(userId);
// };
const findAllJobPosts = async (query) => {
    let condition = {};
    if (query.from && query.to) {
        const fromDate = new Date(query.from);
        fromDate.setUTCHours(0, 0, 0, 0); // Start of the day
        const toDate = new Date(query.to);
        toDate.setUTCHours(23, 59, 59, 999); // End of the day
        condition.createdAt = {
            $gte: fromDate,
            $lte: toDate,
        };
    }
    if (query.title) {
        condition.job_title = { $regex: query.title, $options: "i" };
    }
    console.log("Fetching all job posts...");
    return await JobPost_model_1.JobPost.find(condition);
};
exports.findAllJobPosts = findAllJobPosts;
const softDeleteJobPost = async (userId) => {
    return await JobPost_model_1.JobPost.findByIdAndUpdate(userId, { deletedAt: new Date() }); // Soft delete by setting timestamp
};
exports.softDeleteJobPost = softDeleteJobPost;
const updateJobPost = async (userId, userData) => {
    console.log("userData: ", userData);
    // Perform the update
    return await JobPost_model_1.JobPost.findOneAndUpdate({ _id: userId }, // Search for the user by userId
    userData, // Update only provided fields
    { new: true, runValidators: true } // Return the updated document, enforce validation
    );
};
exports.updateJobPost = updateJobPost;
const jobApplies = async (userId, id) => {
    return await JobPost_model_1.JobPost.findOneAndUpdate({ _id: id, job_applies: { $ne: userId } }, // Ensure userId is not already in job_applies
    { $push: { job_applies: userId } }, // Add userId to job_applies array
    { new: true, runValidators: true } // Return updated document, enforce validation
    );
};
exports.jobApplies = jobApplies;

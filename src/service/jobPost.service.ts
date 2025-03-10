import { IJobPost, JobPost } from "../models/JobPost.model";
import { Request, Response } from "express";

export const jobPost = async (userData: IJobPost) => {
  const newUser = await JobPost.create(userData);
  return newUser;
};

export const createOrUpdateJobPost = async (userData: any) => {
  try {
    return await JobPost.findOneAndUpdate(
      { email: userData.email }, // Search for the user by email
      userData, // Data to update or insert
      { new: true, upsert: true } // Options: return the new document, upsert if it doesn't exist
    );
  } catch (error: any) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export const findJobPostById = async (userId: string) => {
  console.log("userId: ", userId);
  return JobPost.findById(userId);
};

// export const findJobPostById_Cols = async (userId: string) => {
//     return JobPost.findById(userId);
// };

export const findAllJobPosts = async (query: any) => {
  let condition: any = {};

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
  return await JobPost.find(condition);
};

export const softDeleteJobPost = async (userId: string) => {
  return await JobPost.findByIdAndUpdate(userId, { deletedAt: new Date() }); // Soft delete by setting timestamp
};

export const updateJobPost = async (userId: string, userData: IJobPost) => {
  console.log("userData: ", userData);
  // Perform the update
  return await JobPost.findOneAndUpdate(
    { _id: userId }, // Search for the user by userId
    userData, // Update only provided fields
    { new: true, runValidators: true } // Return the updated document, enforce validation
  );
};

export const jobApplies = async (userId: any, id: any) => {
  return await JobPost.findOneAndUpdate(
    { _id: id, job_applies: { $ne: userId } }, // Ensure userId is not already in job_applies
    { $push: { job_applies: userId } }, // Add userId to job_applies array
    { new: true, runValidators: true } // Return updated document, enforce validation
  );
};

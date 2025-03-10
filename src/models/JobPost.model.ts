import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

export interface IJobPost {
  name: string;
  email_address: string;
  contact_number: number;
  company_name: string;
  no_of_candidate: number;
  job_title: string;
  requirement_details: String;
  job_applies: [];
  deletedAt: Date | null;
}

const jobPostSchema = new Schema<IJobPost>(
  {
    name: { type: String },
    email_address: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    no_of_candidate: { type: Number },
    job_title: { type: String },
    requirement_details: { type: String },
    job_applies: [],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

export const JobPost = model<IJobPost>("jobpost", jobPostSchema);

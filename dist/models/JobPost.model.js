"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPost = void 0;
const mongoose_1 = require("mongoose");
const jobPostSchema = new mongoose_1.Schema({
    name: { type: String },
    email_address: { type: String },
    contact_number: { type: Number },
    company_name: { type: String },
    no_of_candidate: { type: Number },
    job_title: { type: String },
    requirement_details: { type: String },
    job_applies: [],
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
});
exports.JobPost = (0, mongoose_1.model)("jobpost", jobPostSchema);

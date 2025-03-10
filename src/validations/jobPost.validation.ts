import { body } from "express-validator";
import { jobPost } from "../service/jobPost.service";
import { JobPost } from "../models/JobPost.model";

export const createJobPostValidation = [
    body("name")
        .notEmpty()
        .withMessage('Name is required'),

    body('email_address')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    body('contact_number')
        .notEmpty()
        .withMessage('Contact Number is required'),

    body('company_name')
        .notEmpty()
        .withMessage('Company Name is required'),

    body('no_of_candidate')
        .notEmpty()
        .withMessage('Number of Candidates is required')
        .isNumeric().withMessage('Number of Candidates must be a number'),

    body('job_title')
        .notEmpty()
        .withMessage('Job Title is required'),

    body('requirement_details')
        .notEmpty()
        .withMessage('Requirement Details are required'),
];

// export const updateJobPostValidation = [
//     body("name")
//         .optional(),

//     body('email_address')
//         .optional()
//         .isEmail().withMessage('Invalid email format'),

//     body('contact_number')
//         .optional()
//         .isNumeric().withMessage('Contact Number must be a valid number'),

//     body('company_name')
//         .optional(),

//     body('no_of_candidate')
//         .optional(),

//     body('job_title')
//         .optional(),

//     body('requirement_details')
//         .optional(),
// ];

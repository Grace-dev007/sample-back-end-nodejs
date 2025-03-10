"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobPostValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createJobPostValidation = [
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage('Name is required'),
    (0, express_validator_1.body)('email_address')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('contact_number')
        .notEmpty()
        .withMessage('Contact Number is required'),
    (0, express_validator_1.body)('company_name')
        .notEmpty()
        .withMessage('Company Name is required'),
    (0, express_validator_1.body)('no_of_candidate')
        .notEmpty()
        .withMessage('Number of Candidates is required')
        .isNumeric().withMessage('Number of Candidates must be a number'),
    (0, express_validator_1.body)('job_title')
        .notEmpty()
        .withMessage('Job Title is required'),
    (0, express_validator_1.body)('requirement_details')
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

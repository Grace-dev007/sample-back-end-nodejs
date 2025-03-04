import { body } from "express-validator";
import { Users } from "../models/Users.model";
import { Request } from "express";
import { UserRole } from "../models/Users.model"; // Import UserRole enum


export const createValidation = [
    body("role")
        .notEmpty()
        .withMessage("Role is required"),

    body("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name must be at most 30 characters'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
            const existingUser = await Users.findOne({ email: value });
            if (existingUser) {
                throw new Error('Email is already registered');
            }
        }),

    body('company_name')
        .custom((value, { req }) => {
            if (req.body.role === UserRole.EMPLOYER && !value) {
                throw new Error('Company name is required for employers');
            }
            return true;
        }),

    body('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    body('confirm_password')
        .notEmpty()
        .withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm password must match password');
            }
            return true;
        })
];

/**
 * Update Validation Rules
 */
export const updateValidation = [
    body("role")
        .notEmpty()
        .withMessage("Role is required"),

    body("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name must be at most 30 characters'),

    body('email')
        .custom(async (value, { req }) => {
            const request = req as Request;
            const existingUser = await Users.findOne({ email: value });

            if (existingUser && existingUser._id.toString() !== request.params.id) {
                throw new Error('Email is already registered');
            }
        }),

    body('company_name')
        .custom((value, { req }) => {
            if (req.body.role === UserRole.EMPLOYER && !value) {
                throw new Error('Company name is required for employers');
            }
            return true;
        }),

    body('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),

    body('password')
        .optional(),

    body('confirm_password')
        .optional()
        .custom((value, { req }) => {
            if (req.body.password && value !== req.body.password) {
                throw new Error('Confirm password must match password');
            }
            return true;
        })
];

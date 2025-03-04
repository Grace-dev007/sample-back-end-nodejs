"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidation = exports.createValidation = void 0;
const express_validator_1 = require("express-validator");
const Users_model_1 = require("../models/Users.model");
const Users_model_2 = require("../models/Users.model"); // Import UserRole enum
exports.createValidation = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("Role is required"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name must be at most 30 characters'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(async (value) => {
        const existingUser = await Users_model_1.Users.findOne({ email: value });
        if (existingUser) {
            throw new Error('Email is already registered');
        }
    }),
    (0, express_validator_1.body)('company_name')
        .custom((value, { req }) => {
        if (req.body.role === Users_model_2.UserRole.EMPLOYER && !value) {
            throw new Error('Company name is required for employers');
        }
        return true;
    }),
    (0, express_validator_1.body)('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required'),
    (0, express_validator_1.body)('confirm_password')
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
exports.updateValidation = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("Role is required"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name must be at most 30 characters'),
    (0, express_validator_1.body)('email')
        .custom(async (value, { req }) => {
        const request = req;
        const existingUser = await Users_model_1.Users.findOne({ email: value });
        if (existingUser && existingUser._id.toString() !== request.params.id) {
            throw new Error('Email is already registered');
        }
    }),
    (0, express_validator_1.body)('company_name')
        .custom((value, { req }) => {
        if (req.body.role === Users_model_2.UserRole.EMPLOYER && !value) {
            throw new Error('Company name is required for employers');
        }
        return true;
    }),
    (0, express_validator_1.body)('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),
    (0, express_validator_1.body)('password')
        .optional(),
    (0, express_validator_1.body)('confirm_password')
        .optional()
        .custom((value, { req }) => {
        if (req.body.password && value !== req.body.password) {
            throw new Error('Confirm password must match password');
        }
        return true;
    })
];

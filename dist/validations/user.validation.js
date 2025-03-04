"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidation = exports.createValidation = void 0;
const express_validator_1 = require("express-validator");
const Users_model_1 = require("../models/Users.model");
exports.createValidation = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("Role is required"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name atleast in 30 characters'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail().withMessage('Invalid email (^@.$) format')
        .custom(async (value) => {
        const existingUser = await Users_model_1.Users.findOne({ email: value });
        if (existingUser) {
            throw new Error('Email is already registered');
        }
    }),
    (0, express_validator_1.body)('company_name')
        .notEmpty()
        .withMessage('Company name is must'),
    (0, express_validator_1.body)('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is must'),
    (0, express_validator_1.body)('confirm_password')
        .notEmpty()
        .withMessage('Confirm Password is must and match the password')
];
exports.updateValidation = [
    (0, express_validator_1.body)("role")
        .notEmpty()
        .withMessage("Role is required"),
    (0, express_validator_1.body)("name")
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 30 }).withMessage('Name atleast in 30 characters'),
    (0, express_validator_1.body)('email')
        .custom(async (value, { req }) => {
        const request = req;
        const existingUser = await Users_model_1.Users.findOne({ email: value });
        if (existingUser && existingUser._id.toString() !== request.params.id) {
            throw new Error('Email is already registered');
        }
    }),
    (0, express_validator_1.body)('company_name')
        .notEmpty()
        .withMessage('Company name is must'),
    (0, express_validator_1.body)('contact_number')
        .notEmpty()
        .withMessage('Phone Number is required'),
    (0, express_validator_1.body)('password')
        .optional(),
    (0, express_validator_1.body)('confirm_password')
        .optional()
];

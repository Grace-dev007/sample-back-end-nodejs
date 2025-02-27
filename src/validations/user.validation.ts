import { body } from "express-validator";
import { Users } from "../models/Users.model";
import { Request } from "express";

export const createValidation = [

    body("role")
    .notEmpty()
    .withMessage("Role is required"),

    body("name")
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name atleast in 30 characters'),

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail().withMessage('Invalid email (^@.$) format')
    .custom(async (value) => {
        const existingUser = await Users.findOne( { email: value } );
        if (existingUser) {
            throw new Error('Email is already registered');
        }
    }),

    body('company_name')
    .notEmpty()
    .withMessage('Company name is must'),

    body('contact_number')
    .notEmpty()
    .withMessage('Phone Number is required'),

    body('password')
    .notEmpty()
    .withMessage('Password is must'),

    body('confirm_password')
    .notEmpty()
    .withMessage('Confirm Password is must and match the password')

]

export const updateValidation = [

    body("role")
    .notEmpty()
    .withMessage("Role is required"),

    body("name")
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 30 }).withMessage('Name atleast in 30 characters'),

    body('email')
    .custom(async (value, { req }) => {
      const request = req as Request;
      const existingUser = await Users.findOne({ email: value });
  
      if (existingUser && existingUser._id.toString() !== request.params.id) {
        throw new Error('Email is already registered');
      }
    }),

    body('company_name')
    .notEmpty()
    .withMessage('Company name is must'),

    body('contact_number')
    .notEmpty()
    .withMessage('Phone Number is required'),

    body('password')
    .optional(),
   

    body('confirm_password')
    .optional()
   
]


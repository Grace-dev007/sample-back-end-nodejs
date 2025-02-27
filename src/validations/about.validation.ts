import { Request, Response, NextFunction } from 'express';
import { body, validationResult, param } from 'express-validator';

import moment from 'moment-timezone';
import sharp from 'sharp';


export const validateUpdateUserProfile = [
  // Fullname should be a string and optional with max length of 50 characters
  body('fullname')
    .notEmpty()
    .withMessage('Fullname is require')
    .isString()
    .withMessage('Fullname must be a string')
    .isLength({ max: 50 })
    .withMessage('Fullname must not exceed 50 characters'),

  // Designation should be a valid MongoDB ObjectId
  body('designation')
    .notEmpty()
    .withMessage('Designation is require')
    .isMongoId()
    .withMessage('Designation must be a valid ObjectId'),

  // Appointment Mode should be an array and should include valid values
  body('appointment_mode')
    .notEmpty()
    .withMessage('Appointment mode is required')
    .isArray()
    .withMessage('Appointment mode must be an array')
    .custom((value) => {
      const allowedModes = ['in-person', 'virtual-consultation'];

      // Check if every item in the array is a valid mode
      const isValid = value.every((mode: string) => allowedModes.includes(mode));
      if (!isValid) {
        throw new Error('Appointment mode contains invalid values');
      }

      // Check if at least one valid mode is provided
      if (value.length === 0) {
        throw new Error('At least one appointment mode must be selected');
      }

      return true;
    }),

  // Personal Statement should be a string and optional
  body('personal_statement').optional().isString().withMessage('Personal statement must be a string')
  .isLength({ max: 255 })
  .withMessage('personal statement  must be maximum 255 characters long'),
];



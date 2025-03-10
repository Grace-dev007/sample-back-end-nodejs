"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobPost_controller_1 = require("../controllers/jobPost.controller");
const jobPost_validation_1 = require("../validations/jobPost.validation");
const errorValidation_1 = require("../validations/errorValidation");
const util_1 = require("../utils/hooks/util");
const router = express_1.default.Router();
router.post('/create', jobPost_validation_1.createJobPostValidation, errorValidation_1.errorValidation, jobPost_controller_1.jobPosts);
router.get('/list-all', jobPost_controller_1.getAllJobPosts);
router.get('/list/:id', jobPost_controller_1.getjobPostById);
router.put('/update/:id', jobPost_controller_1.jobPostUpdate);
router.delete('/delete/:id', jobPost_controller_1.deleteJobPostById);
router.put('/job-apply/:id', util_1.authentication, jobPost_controller_1.jobApply);
exports.default = router;

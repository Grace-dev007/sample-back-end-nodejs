"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApply = exports.deleteJobPostById = exports.jobPostUpdate = exports.getAllJobPosts = exports.getjobPostById = exports.jobPosts = void 0;
const util_1 = require("../utils/hooks/util");
const jobPost_service_1 = require("../service/jobPost.service");
const jobPosts = async (req, res) => {
    try {
        const userData = req.body;
        const user = await (0, jobPost_service_1.jobPost)(userData);
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Job Posted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.jobPosts = jobPosts;
const getjobPostById = async (req, res) => {
    try {
        const userId = req.params.id; // Get userId from request parameters
        const user = await (0, jobPost_service_1.findJobPostById)(userId); // Call service function
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        (0, util_1.ApiResponse)(res, {
            status: 200,
            message: 'Get successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.getjobPostById = getjobPostById;
const getAllJobPosts = async (req, res) => {
    try {
        const query = req.query;
        const jobPosts = await (0, jobPost_service_1.findAllJobPosts)(query); // Call service function to get all job posts
        if (!jobPosts || jobPosts.length === 0) {
            return res.status(404).json({ success: false, message: "No job posts found" });
        }
        (0, util_1.ApiResponse)(res, {
            status: 200,
            message: 'Job posts retrieved successfully',
            validation: null,
            totalCount: jobPosts.length,
            data: jobPosts,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.getAllJobPosts = getAllJobPosts;
const jobPostUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;
        // Hash password if it's being updated
        // if (password) {
        //     updateFields.password = await bcrypt.hash(password, 10);
        //   }
        const user = await (0, jobPost_service_1.updateJobPost)(userId, updateFields);
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Updated successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.jobPostUpdate = jobPostUpdate;
const deleteJobPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, jobPost_service_1.softDeleteJobPost)(id);
        (0, util_1.ApiResponse)(res, {
            status: 200,
            message: 'Deleted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.deleteJobPostById = deleteJobPostById;
const jobApply = async (req, res) => {
    try {
        const userId = req.headers.user_id;
        const { id } = req.params;
        const user = await (0, jobPost_service_1.jobApplies)(userId, id);
        if (!user) {
            return (0, util_1.ApiResponse)(res, {
                status: 409,
                message: 'Already Applied',
                validation: null,
                totalCount: null,
                data: user,
            });
        }
        (0, util_1.ApiResponse)(res, {
            status: 201,
            message: 'Applied successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    }
    catch (error) {
        (0, util_1.ApiResponse)(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};
exports.jobApply = jobApply;

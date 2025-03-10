import { Request, Response } from "express";
import { ApiResponse } from "../utils/hooks/util";
import { jobPost, softDeleteJobPost, updateJobPost,findJobPostById, findAllJobPosts, jobApplies } from "../service/jobPost.service"




export const jobPosts = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const user = await jobPost(userData)
        ApiResponse(res, {
            status: 201,
            message: 'Job Posted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });

    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}

export const getjobPostById = async (req: Request, res: Response) => {
    try {
        const  userId  = req.params.id; // Get userId from request parameters
        const user = await findJobPostById(userId); // Call service function
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        ApiResponse(res, {
            status: 200,
            message: 'Get successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });}
};

export const getAllJobPosts = async (req: Request, res: Response) => {
    try {
        const query = req.query
        const jobPosts = await findAllJobPosts(query); // Call service function to get all job posts
        if (!jobPosts || jobPosts.length === 0) {
            return res.status(404).json({ success: false, message: "No job posts found" });
        }
        ApiResponse(res, {
            status: 200,
            message: 'Job posts retrieved successfully',
            validation: null,
            totalCount: jobPosts.length,
            data: jobPosts,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
};


export const jobPostUpdate = async (req: Request, res: Response) => {
        try {
        const userId = req.params.id;
        const updateFields = req.body; 
       
          // Hash password if it's being updated
    // if (password) {
    //     updateFields.password = await bcrypt.hash(password, 10);
    //   }

        const user = await updateJobPost(userId, updateFields)
        ApiResponse(res, {
            status: 201,
            message: 'Updated successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}

export const deleteJobPostById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await softDeleteJobPost(id);
        ApiResponse(res, {
            status: 200,
            message: 'Deleted successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}

export const jobApply = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.user_id;
        const { id } = req.params;
        const user = await jobApplies(userId, id)
        if(!user){
           return ApiResponse(res, {
                status: 409,
                message: 'Already Applied',
                validation: null,
                totalCount: null,
                data: user,
            });
        }
        ApiResponse(res, {
            status: 201,
            message: 'Applied successfully',
            validation: null,
            totalCount: null,
            data: user,
        });
    } catch (error: any) {
        ApiResponse(res, {
            status: 500,
            message: error.message,
            validation: null,
            totalCount: null,
            data: null,
        });
    }
}
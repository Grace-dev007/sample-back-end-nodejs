import express from "express";
import { deleteJobPostById, getAllJobPosts, getjobPostById, jobApply, jobPosts, jobPostUpdate, } from "../controllers/jobPost.controller";
import { createJobPostValidation } from "../validations/jobPost.validation";
import { errorValidation } from "../validations/errorValidation";
import { authentication } from "../utils/hooks/util";


const router = express.Router()

router.post('/create', createJobPostValidation, errorValidation, jobPosts);
router.get('/list-all', getAllJobPosts)
router.get('/list/:id', getjobPostById)
router.put('/update/:id', jobPostUpdate)
router.delete('/delete/:id', deleteJobPostById)
router.put('/job-apply/:id', authentication, jobApply)


export default router;
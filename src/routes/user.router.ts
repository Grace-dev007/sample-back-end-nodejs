import express from "express";
import { register, login, getUserById, upDate, deleteUserById } from "../controllers/user.controller";
import { findUsers } from "../service/user.service";
import { createValidation, updateValidation } from "../validations/user.validation";
import { errorValidation } from "../validations/errorValidation";


const router = express.Router()

router.post('/register', createValidation, errorValidation, register);
router.post('/login', login);
router.get('/users', findUsers)
router.get('/users/:id', getUserById)
router.put('/update/:id', updateValidation, errorValidation, upDate)
router.delete('/delete/:id', deleteUserById)

export default router;
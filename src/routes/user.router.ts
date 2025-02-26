import express from "express";
import { register, login, getUserById, upDate, deleteUserById } from "../controllers/user.controller";
import { findUsers } from "../service/user.service";


const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get('/users', findUsers)
router.get('/users/:id', getUserById)
router.put('/update/:email', upDate)
router.delete('/delete/:id', deleteUserById)

export default router;
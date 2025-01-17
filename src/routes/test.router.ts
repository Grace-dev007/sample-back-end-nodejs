import express from "express";
import { apiTest } from "../controllers/test.controller";

const router = express.Router();

router.get('/create', apiTest)

export default router;
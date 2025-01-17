import express from "express";
import { service } from "../controllers/service.controller";

const router = express.Router();

router.get('/check-service', service)

export default router;
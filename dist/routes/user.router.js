"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_service_1 = require("../service/user.service");
const user_validation_1 = require("../validations/user.validation");
const errorValidation_1 = require("../validations/errorValidation");
const router = express_1.default.Router();
router.post('/register', user_validation_1.createValidation, errorValidation_1.errorValidation, user_controller_1.register);
router.post('/login', user_controller_1.login);
router.get('/users', user_service_1.findUsers);
router.get('/users/:id', user_controller_1.getUserById);
router.put('/update/:id', user_validation_1.updateValidation, errorValidation_1.errorValidation, user_controller_1.upDate);
router.delete('/delete/:id', user_controller_1.deleteUserById);
exports.default = router;

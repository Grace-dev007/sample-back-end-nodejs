"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Age = exports.AgeStatus = void 0;
const mongoose_1 = require("mongoose");
var AgeStatus;
(function (AgeStatus) {
    AgeStatus["Active"] = "active";
    AgeStatus["Inactive"] = "inactive";
})(AgeStatus || (exports.AgeStatus = AgeStatus = {}));
const ageSchema = new mongoose_1.Schema({
    name: { type: String, lowercase: true },
    status: { type: String, enum: Object.values(AgeStatus), default: AgeStatus.Active },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
});
exports.Age = (0, mongoose_1.model)('ages', ageSchema);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.QueryValidator = joi_1.default.object({
    title: joi_1.default.string().optional(),
    genre: joi_1.default.string().optional(),
    rating: joi_1.default.number().min(0).max(10).optional(),
    page: joi_1.default.number().min(1).optional(),
    limit: joi_1.default.number().min(1).optional(),
});

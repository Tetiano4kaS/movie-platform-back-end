"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const genreEnum_1 = require("../models/enum/genreEnum");
class MovieValidator {
}
exports.MovieValidator = MovieValidator;
_a = MovieValidator;
MovieValidator.title = joi_1.default.string().min(3).max(100).trim().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
});
MovieValidator.description = joi_1.default.string()
    .max(500)
    .trim()
    .optional()
    .messages({
    "string.base": "Description must be a string",
    "string.max": "Description cannot exceed 500 characters",
});
MovieValidator.actors = joi_1.default.array()
    .items(joi_1.default.string().min(3).max(50).trim())
    .min(1)
    .messages({
    "array.base": "Actors must be an array of strings",
    "array.min": "At least one actor is required",
    "string.min": "Actor name must be at least 3 characters long",
    "string.max": "Actor name cannot exceed 50 characters",
});
MovieValidator.director = joi_1.default.string()
    .min(3)
    .max(50)
    .trim()
    .optional()
    .messages({
    "string.base": "Director must be a string",
    "string.min": "Director name must be at least 3 characters long",
    "string.max": "Director name cannot exceed 50 characters",
});
MovieValidator.genre = joi_1.default.array()
    .items(joi_1.default.string().valid(...Object.values(genreEnum_1.Genre)))
    .min(1)
    .messages({
    "array.base": "Genre must be an array of strings",
    "array.min": "At least one genre is required",
    "any.only": "Genre must be one of the predefined values",
});
MovieValidator.rating = joi_1.default.number().min(0).max(10).optional().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 0",
    "number.max": "Rating cannot exceed 10",
});
MovieValidator.releaseDate = joi_1.default.date().optional().messages({
    "date.base": "Release date must be a valid date",
});
MovieValidator.image = joi_1.default.string().uri().trim().allow(null).optional().messages({
    "string.base": "Image must be a string",
    "string.uri": "Image must be a valid URI",
});
MovieValidator.isFavorite = joi_1.default.boolean().optional().messages({
    "boolean.base": "isFavorite must be a boolean value",
});
MovieValidator.create = joi_1.default.object({
    title: _a.title.required(),
    description: _a.description,
    actors: _a.actors.required(),
    director: _a.director,
    genre: _a.genre.required(),
    rating: _a.rating,
    releaseDate: _a.releaseDate,
    image: _a.image,
    isFavorite: _a.isFavorite,
});
MovieValidator.update = joi_1.default.object({
    title: _a.title,
    description: _a.description,
    actors: _a.actors,
    director: _a.director,
    genre: _a.genre,
    rating: _a.rating,
    releaseDate: _a.releaseDate,
    image: _a.image,
    isFavorite: _a.isFavorite,
});

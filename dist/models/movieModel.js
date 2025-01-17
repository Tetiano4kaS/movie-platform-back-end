"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const genreEnum_1 = require("./enum/genreEnum");
const movieSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    actors: { type: [String], default: [] },
    director: { type: String },
    genre: { type: [String], enum: Object.values(genreEnum_1.Genre), required: true },
    rating: { type: Number, min: 0, max: 10 },
    releaseDate: { type: Date },
    image: { type: String },
    isFavorite: { type: Boolean, default: false },
});
exports.Movie = (0, mongoose_1.model)("movie", movieSchema);

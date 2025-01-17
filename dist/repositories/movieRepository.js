"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRepository = void 0;
const movieModel_1 = require("../models/movieModel");
class MovieRepository {
    async findAll() {
        return await movieModel_1.Movie.find();
    }
    async findOne(id) {
        return await movieModel_1.Movie.findById(id);
    }
    async create(movie) {
        return await movieModel_1.Movie.create(movie);
    }
    async update(id, movie) {
        return await movieModel_1.Movie.findByIdAndUpdate(id, movie, { new: true });
    }
    async delete(id) {
        await movieModel_1.Movie.findByIdAndDelete(id);
    }
    async findWithFilters(query, page, limit) {
        return await movieModel_1.Movie.find(query)
            .limit(limit)
            .skip((page - 1) * limit);
    }
    async countDocuments(query) {
        return await movieModel_1.Movie.countDocuments(query);
    }
}
exports.movieRepository = new MovieRepository();

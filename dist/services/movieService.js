"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieService = void 0;
const movieRepository_1 = require("../repositories/movieRepository");
class MovieService {
    async findAll() {
        return await movieRepository_1.movieRepository.findAll();
    }
    async getById(id) {
        return await movieRepository_1.movieRepository.findOne(id);
    }
    async create(movie) {
        return await movieRepository_1.movieRepository.create(movie);
    }
    async update(id, movie) {
        return await movieRepository_1.movieRepository.update(id, movie);
    }
    async delete(id) {
        await movieRepository_1.movieRepository.delete(id);
    }
    async findWithFilters(query, page, limit) {
        return await movieRepository_1.movieRepository.findWithFilters(query, page, limit);
    }
    async countDocuments(query) {
        return await movieRepository_1.movieRepository.countDocuments(query);
    }
}
exports.movieService = new MovieService();

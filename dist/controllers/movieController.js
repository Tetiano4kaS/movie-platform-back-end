"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieController = void 0;
const movieService_1 = require("../services/movieService");
class MovieController {
    async getMovies(req, res, next) {
        try {
            const { title, genre, rating, page = 1, limit = 10 } = req.query;
            const query = {};
            if (title)
                query.title = { $regex: title, $options: "i" };
            if (genre)
                query.genre = genre;
            if (rating)
                query.rating = { $gte: Number(rating) };
            const movies = await movieService_1.movieService.findWithFilters(query, Number(page), Number(limit));
            const total = await movieService_1.movieService.countDocuments(query);
            res.status(200).json({
                data: movies,
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit)),
                totalMovies: total,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const movieId = req.params.id;
            const result = await movieService_1.movieService.getById(movieId);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async createMovie(req, res, next) {
        try {
            const movie = req.body;
            const result = await movieService_1.movieService.create(movie);
            res.status(201).json({ data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            const { id } = req.params;
            const updateMovieInfo = req.body;
            const result = await movieService_1.movieService.update(id, updateMovieInfo);
            res.status(200).json({ data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await movieService_1.movieService.delete(id);
            res.status(200).json({ message: "Movie deleted successfully." });
        }
        catch (e) {
            next(e);
        }
    }
    async toggleFavorite(req, res, next) {
        try {
            const { id } = req.params;
            const movie = await movieService_1.movieService.getById(id);
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            const updateMovie = await movieService_1.movieService.update(id, { isFavorite: !movie.isFavorite });
            res.status(200).json({ data: updateMovie });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.movieController = new MovieController();

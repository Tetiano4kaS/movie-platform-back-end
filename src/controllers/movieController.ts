import { NextFunction, Request, Response } from "express";

import { movieService } from "../services/movieService";

class MovieController {
  public async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, genre, rating, page = 1, limit = 10 } = req.query;

      const query: any = {};
      if (title) query.title = { $regex: title, $options: "i" };
      if (genre) query.genre = genre;
      if (rating) query.rating = { $gte: Number(rating) };

      const movies = await movieService.findWithFilters(
        query,
        Number(page),
        Number(limit),
      );
      const total = await movieService.countDocuments(query);

      res.status(200).json({
        data: movies,
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalMovies: total,
      });
    } catch (error) {
      next(error);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = req.params.id;
      const result = await movieService.getById(movieId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const movie = req.body;
      const result = await movieService.create(movie);
      res.status(201).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateMovieInfo = req.body;
      const result = await movieService.update(id, updateMovieInfo);
      res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  }
  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await movieService.delete(id);
      res.status(200).json({ message: "Movie deleted successfully." });
    } catch (e) {
      next(e);
    }
  }
  public async toggleFavorite(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const movie = await movieService.getById(id);
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }
      const updateMovie = await movieService.update(id, {
        isFavorite: !movie.isFavorite,
      });
      res.status(200).json({ data: updateMovie });
    } catch (e) {
      next(e);
    }
  }
}
export const movieController = new MovieController();

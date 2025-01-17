import express from "express";

import { movieController } from "../controllers/movieController";
import { movieMiddleware } from "../middleware/movie.middleware";
import { MovieValidator } from "../validation/movieValidation";
import {QueryValidator} from "../validation/queryValidation";

const router = express.Router();

router.get("/", movieMiddleware.isQueryValid(QueryValidator), movieController.getMovies);
router.get("/:id", movieMiddleware.findByIdOrThrow, movieController.getById);
router.post(
  "/",
  movieMiddleware.isBodyValid(MovieValidator.create),
  movieController.createMovie,
);
router.put(
  "/:id",
  movieMiddleware.findByIdOrThrow,
  movieMiddleware.isBodyValid(MovieValidator.update),
  movieController.updateById,
);
router.delete(
  "/:id",
  movieMiddleware.findByIdOrThrow,
  movieController.deleteById,
);
router.patch("/:id/favorite", movieMiddleware.findByIdOrThrow, movieController.toggleFavorite);

export default router;

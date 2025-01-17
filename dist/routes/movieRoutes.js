"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const movie_middleware_1 = require("../middleware/movie.middleware");
const movieValidation_1 = require("../validation/movieValidation");
const queryValidation_1 = require("../validation/queryValidation");
const router = express_1.default.Router();
router.get("/", movie_middleware_1.movieMiddleware.isQueryValid(queryValidation_1.QueryValidator), movieController_1.movieController.getMovies);
router.get("/:id", movie_middleware_1.movieMiddleware.findByIdOrThrow, movieController_1.movieController.getById);
router.post("/", movie_middleware_1.movieMiddleware.isBodyValid(movieValidation_1.MovieValidator.create), movieController_1.movieController.createMovie);
router.put("/:id", movie_middleware_1.movieMiddleware.findByIdOrThrow, movie_middleware_1.movieMiddleware.isBodyValid(movieValidation_1.MovieValidator.update), movieController_1.movieController.updateById);
router.delete("/:id", movie_middleware_1.movieMiddleware.findByIdOrThrow, movieController_1.movieController.deleteById);
router.patch("/:id/favorite", movie_middleware_1.movieMiddleware.findByIdOrThrow, movieController_1.movieController.toggleFavorite);
exports.default = router;

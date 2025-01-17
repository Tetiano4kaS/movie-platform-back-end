import Joi from "joi";

import { Genre } from "../models/enum/genreEnum";

export class MovieValidator {
  private static title = Joi.string().min(3).max(100).trim().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters long",
    "string.max": "Title cannot exceed 100 characters",
  });

  private static description = Joi.string()
    .max(500)
    .trim()
    .optional()
    .messages({
      "string.base": "Description must be a string",
      "string.max": "Description cannot exceed 500 characters",
    });

  private static actors = Joi.array()
    .items(Joi.string().min(3).max(50).trim())
    .min(1)
    .messages({
      "array.base": "Actors must be an array of strings",
      "array.min": "At least one actor is required",
      "string.min": "Actor name must be at least 3 characters long",
      "string.max": "Actor name cannot exceed 50 characters",
    });

  private static director = Joi.string()
    .min(3)
    .max(50)
    .trim()
    .optional()
    .messages({
      "string.base": "Director must be a string",
      "string.min": "Director name must be at least 3 characters long",
      "string.max": "Director name cannot exceed 50 characters",
    });

  private static genre = Joi.array()
    .items(Joi.string().valid(...Object.values(Genre)))
    .min(1)
    .messages({
      "array.base": "Genre must be an array of strings",
      "array.min": "At least one genre is required",
      "any.only": "Genre must be one of the predefined values",
    });

  private static rating = Joi.number().min(0).max(10).optional().messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 0",
    "number.max": "Rating cannot exceed 10",
  });

  private static releaseDate = Joi.date().optional().messages({
    "date.base": "Release date must be a valid date",
  });

  private static image = Joi.string().uri().trim().allow(null).optional().messages({
    "string.base": "Image must be a string",
    "string.uri": "Image must be a valid URI",
  });

  private static isFavorite = Joi.boolean().optional().messages({
    "boolean.base": "isFavorite must be a boolean value",
  });

  public static create = Joi.object({
    title: this.title.required(),
    description: this.description,
    actors: this.actors.required(),
    director: this.director,
    genre: this.genre.required(),
    rating: this.rating,
    releaseDate: this.releaseDate,
    image: this.image,
    isFavorite: this.isFavorite,
  });

  public static update = Joi.object({
    title: this.title,
    description: this.description,
    actors: this.actors,
    director: this.director,
    genre: this.genre,
    rating: this.rating,
    releaseDate: this.releaseDate,
    image: this.image,
    isFavorite: this.isFavorite,
  });
}

import { model, Schema } from "mongoose";

import { IMovie } from "../interfaces/movieModel.interface";
import { Genre } from "./enum/genreEnum";

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String },
  actors: { type: [String], default: [] },
  director: { type: String },
  genre: { type: [String], enum: Object.values(Genre), required: true },
  rating: { type: Number, min: 0, max: 10 },
  releaseDate: { type: Date },
  image: { type: String },
  isFavorite: { type: Boolean, default: false },
});

export const Movie = model<IMovie>("movie", movieSchema);

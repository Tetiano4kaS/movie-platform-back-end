import { Genre } from "../models/enum/genreEnum";

export interface IMovie {
  id?: string;
  title: string;
  description?: string;
  actors: string[];
  director?: string;
  genre: Genre[];
  rating?: number;
  releaseDate?: Date;
  image?: string | null;
  isFavorite: boolean;
}

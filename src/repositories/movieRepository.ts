import { IMovie } from "../interfaces/movieModel.interface";
import { Movie } from "../models/movieModel";

class MovieRepository {
  public async findAll(): Promise<IMovie[]> {
    return await Movie.find();
  }
  public async findOne(id: string): Promise<IMovie | null> {
    return await Movie.findById(id);
  }
  public async create(movie: Partial<IMovie>): Promise<IMovie> {
    return await Movie.create(movie);
  }
  public async update(
    id: string,
    movie: Partial<IMovie>,
  ): Promise<IMovie | null> {
    return await Movie.findByIdAndUpdate(id, movie, { new: true });
  }
  public async delete(id: string): Promise<void> {
    await Movie.findByIdAndDelete(id);
  }
  public async findWithFilters(
      query: any,
      page: number,
      limit: number,
  ): Promise<IMovie[]> {
    return await Movie.find(query)
        .limit(limit)
        .skip((page - 1) * limit);
  }

  public async countDocuments(query: any): Promise<number> {
    return await Movie.countDocuments(query);
  }
}

export const movieRepository = new MovieRepository();

import { IMovie } from "../interfaces/movieModel.interface";
import { movieRepository } from "../repositories/movieRepository";

class MovieService {
  public async findAll(): Promise<IMovie[]> {
    return await movieRepository.findAll();
  }
  public async getById(id: string): Promise<IMovie | null> {
    return await movieRepository.findOne(id);
  }
  public async create(movie: Partial<IMovie>): Promise<IMovie> {
    return await movieRepository.create(movie);
  }
  public async update(
    id: string,
    movie: Partial<IMovie>,
  ): Promise<IMovie | null> {
    return await movieRepository.update(id, movie);
  }
  public async delete(id: string): Promise<void> {
    await movieRepository.delete(id);
  }
  public async findWithFilters(query: any, page: number, limit: number) {
    return await movieRepository.findWithFilters(query, page, limit);
  }

  public async countDocuments(query: any) {
    return await movieRepository.countDocuments(query);
  }
}

export const movieService = new MovieService();

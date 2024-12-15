import { MovieDTO, StreamingOutput } from '../../../@types/index';
import { Injectable } from '@nestjs/common';
import { FireExternalRequest } from '../../http/fire-request';
import { movieDetailsParser } from '../outputs';

type Input = {
  movieName: string;
};

@Injectable()
export class TMDBProvider {
  constructor(private fireRequestProvider: FireExternalRequest) {}

  async getMovieDetails({ movieName }: Input): Promise<MovieDTO | null> {
    const searchPath = '/search/movie';

    const queryParams = {
      query: movieName,
    };
    const search = await this.fireRequestProvider.fire({
      path: searchPath,
      queryParams,
    });
    if (!search.results || search.results.length === 0) return null;
    const [movie] = search.results;

    const details = await this.fireRequestProvider.fire({
      path: `movie/${movie.id}`,
      queryParams: { language: 'pt-BR' },
    });

    const credits = await this.fireRequestProvider.fire({
      path: `/movie/${movie.id}/credits`,
      queryParams: { language: 'pt-BR' },
    });

    const parsed = movieDetailsParser({ ...details, ...credits });
    const availableStreamings = await this.getAvailableStreamings(details.id);

    return { ...parsed, streamings: availableStreamings };
  }

  async getAvailableStreamings(movieId: number): Promise<StreamingOutput[]> {
    try {
      const path = `/movie/${movieId}/watch/providers`;
      const response = await this.fireRequestProvider.fire({
        path,
        queryParams: { language: 'pt-BR' },
      });

      if (!response.results || !response.results['BR']) return [];
      return response.results.BR.flatrate as StreamingOutput[];
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
